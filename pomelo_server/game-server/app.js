var pomelo = require('pomelo');
var routeUtil = require('./app/util/routeUtil');
/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'pomelo_server');

app.configure('production|development', 'gate', function(){
	app.set('connectorConfig',
		{
			connector : pomelo.connectors.hybridconnector,
			useProtobuf : true
		});
});

// app configuration
app.configure('production|development', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true
    });

  app.route('main-A', routeUtil.main);

  
});

// Configure database
app.configure('production|development', 'main|connector', function () {
  app.loadConfig('mysql', app.getBase() + '/config/mysql.json');
	var dbclient = require('./app/dao/mysql/mysql').init(app);
  app.set('dbclient', dbclient);
  var sClient = require('./app/dao/mysql/sequlize_pool').init(app);
  app.set('sClient', sClient);
	// app.load(pomelo.sync, {path:__dirname + '/app/dao/mapping', dbclient: dbclient});

  // app.use(sync, {
	// 	sync: {
	// 		path: __dirname + '/app/dao/mapping',
	// 		dbclient: dbclient
	// 	}
	// });
});

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
