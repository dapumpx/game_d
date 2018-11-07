var guaJiDao = require('../../../dao/guaJiDao');
var userDao = require('../../../dao/userDao');
var async = require('async');

module.exports = function (app) {
    return new Handler(app);
};

var Handler = function (app) {
    this.app = app;
};

Handler.prototype.view = function (msg, session, next) {
    guaJiDao.view(msg.user_id, function(err, result){
        next(null, {
            code: 1,
            info: result
        });
    });
}

Handler.prototype.checkExp = function(msg, session, next)
{
    async.waterfall([
        function(callback) {
            guaJiDao.checkExp(msg.user_id, callback);
        },
        function(totalExp, callback) {
            userDao.addExp(msg.user_id, totalExp, callback);
        },
        function(callback) {
            // arg1 now equals 'three'
            guaJiDao.clearTime(msg.user_id, function(){
                next(null, {
                    code: 1
                });
            });
        }
    ], function (err, result) {
        // result now equals 'done'
    });
}