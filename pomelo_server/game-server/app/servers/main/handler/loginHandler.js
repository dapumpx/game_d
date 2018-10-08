module.exports = function (app) {
	return new Handler(app);
};

var Handler = function (app) {
	this.app = app;
};
// var dataApi = require('../../../util/dataApi');

Handler.prototype.login = function (msg, session, next) {
    next(null, {
        status: 1
    });
};