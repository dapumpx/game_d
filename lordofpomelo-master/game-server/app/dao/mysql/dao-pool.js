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
			
			var client = mysql.createConnection({
				host: mysqlConfig.host,
				user: mysqlConfig.user,
				password: mysqlConfig.password,
				database: mysqlConfig.database
			});
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
