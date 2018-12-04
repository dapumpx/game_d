var express = require('express');
var fs = require('fs');
var app = express();
var methodOverride = require('method-override');
var bodyParser = require('body-parser')
var errorhandler = require('errorhandler');
var https = require('https');

var privateKey = fs.readFileSync('sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

app.use(methodOverride());
app.use(bodyParser.urlencoded({
	extended: true
  }));
app.use(bodyParser.json());
// app.use(app.router);
app.set('view engine', 'jade');
app.set('views', __dirname + '/public');
app.set('view options', {layout: false});
app.set('basepath',__dirname + '/public');

switch(app.settings.env)
{
	case 'development':
		app.use(express.static(__dirname + '/public'));
		app.use(errorhandler({ dumpExceptions: true, showStack: true }));
		break;

	case 'production':
		var oneYear = 31557600000;
		app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
		app.use(errorhandler());
		break;
}

console.log("Web server has started.\nPlease log on http://127.0.0.1:3001/index.html");
app.listen(3001);
https.createServer(credentials, app).listen(443);
