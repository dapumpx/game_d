var _poolModule = require('generic-pool');
var mysql = require('mysql');
/*
 * Create mysql connection pool.
 */
var createMysqlPool = function(app) {
	var mysqlConfig = app.get('mysql');
	return _poolModule.createPool({
		name: 'mysql',
		create: function() {
			console.log(1111);
			console.log(mysqlConfig)
			var client = mysql.createConnection({
				host: mysqlConfig.host,
				user: mysqlConfig.user,
				password: mysqlConfig.password,
				database: mysqlConfig.database
			});
			// console.log(callback);
			// callback(null, client);
			return client;
		},
		destroy: function(client) {
			client.end();
		},
		max: 10,
		idleTimeoutMillis : 30000,
		log : false
	});
};

exports.createMysqlPool = createMysqlPool;
