module.exports = function (app) {
    return new Handler(app);
};

var labaDao = require('../../../dao/labaDao');
var userDao = require('../../../dao/userDao');

var Handler = function (app) {
    this.app = app;
};

Handler.prototype.la = function (msg, session, next) {
    userDao.laOnce(msg.userId,function(error, user){
        if(error)
        {
            next(null, {
                code: error
            });
        }
        else
        {
            let result = [];
            for (let i = 0; i < 15; i++) {
                result.push(labaDao.once());
            }

            next(null, {
                code: 1,
                info: result
            });
        }
    });
    
}

Handler.prototype.addGold = function (msg, session, next) {
    userDao.addGold(msg.userId, msg.gold, function (err, result) {
        if (err) {

        } else if (result == 1) {
            next(null, {
                code: 1
            });
        }
    });

}