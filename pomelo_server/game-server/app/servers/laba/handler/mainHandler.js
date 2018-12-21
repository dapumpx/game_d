module.exports = function (app) {
    return new Handler(app);
};

var labaDao = require('../../../dao/labaDao');
var userDao = require('../../../dao/userDao');

var Handler = function (app) {
    this.app = app;
};

Handler.prototype.la = function (msg, session, next) {
    userDao.laOnce(msg.userId, function (error, user) {
        if (error) {
            next(null, {
                code: error
            });
        } else {
            let result = labaDao.once();

            next(null, {
                code: 1,
                info: result,
                user: user
            });
        }
    });

}

Handler.prototype.addGold = function (msg, session, next) {
    userDao.addGold(msg.userId, msg.gold, function (err, result) {
        if (err) {

        } else {
            next(null, {
                code: 1,
                user: result
            });
        }
    });

}