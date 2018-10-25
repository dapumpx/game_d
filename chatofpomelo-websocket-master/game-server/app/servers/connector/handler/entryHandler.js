module.exports = function (app) {
	return new Handler(app);
};

var Handler = function (app) {
	this.app = app;
};

var handler = Handler.prototype;

/**
 * New client entry chat server.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next stemp callback
 * @return {Void}
 */
handler.enter = function (msg, session, next) {
	var self = this;
	var rid = msg.rid;
	var uid = msg.username + '*' + rid
	var sessionService = self.app.get('sessionService');

	//duplicate log in
	if (!!sessionService.getByUid(uid)) {
		next(null, {
			code: 500,
			error: true
		});
		return;
	}

	session.bind(uid);
	session.set('rid', rid);
	session.push('rid', function (err) {
		if (err) {
			console.error('set rid for session service failed! error is : %j', err.stack);
		}
	});
	session.on('closed', onUserLeave.bind(null, self.app));

	//put user into channel
	self.app.rpc.chat.chatRemote.add(session, uid, self.app.get('serverId'), rid, true, function (users) {
		next(null, {
			users: users
		});
	});
};

handler.github_login = function (msg, session, next) {
	var self = this;
	var passport = require('passport'),
		OAuth2Strategy = require('passport-oauth2');

	passport.use(new OAuth2Strategy({
			authorizationURL: 'https://github.com/login/oauth/authorize',
			tokenURL: 'https://github.com/login/oauth/access_token',
			clientID: '5bee103401280df1e451',
			clientSecret: '6efe5d2a8ba5fe7dea605992fae8509f892e32e1',
			callbackURL: "http://localhost:3001/auth/example/callback"
		},
		function (accessToken, refreshToken, profile, cb) {
			console.log(123)
		}
	));
}

/**
 * User log out handler
 *
 * @param {Object} app current application
 * @param {Object} session current session object
 *
 */
var onUserLeave = function (app, session) {
	if (!session || !session.uid) {
		return;
	}
	app.rpc.chat.chatRemote.kick(session, session.uid, app.get('serverId'), session.get('rid'), null);
};