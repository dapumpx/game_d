var uuidv4 = require('uuid/v4');
var pomelo = require('pomelo');

module.exports = function (app) {
    return new Handler(app);
};

var Handler = function (app) {
    this.app = app;
};
// var dataApi = require('../../../util/dataApi');

Handler.prototype.login = function (msg, session, next) {

    if (!msg.user_name) {
        next(null, {
            code: 900002
        });
        return;
    }
    var sql = 'select * from `user` where `user_name` = ?';
    var args = [msg.user_name];

    pomelo.app.get('dbclient').query(sql, args, function (err, res) {
        if (res.length == 0) {
            var sqlInsert = "INSERT INTO `game_d`.`user` (`id`, `user_name`, `name`, `password`) VALUES (?, ?, ?, ?)";
            var newUuid = uuidv4();
            var argsInsert = [newUuid, msg.user_name, "random", msg.password];
            pomelo.app.get('dbclient').query(sqlInsert, argsInsert, function (err, res) {
                next(null, {
                    user_info: {
                        id: newUuid,
                        user_name: msg.user_name,
                        name: "random"
                    },
                    status: 1
                });
            });
        } else {
            if (msg.password == res[0].password) {
                next(null, {
                    user_info: res[0],
                    status: 1,
                    type: 'ok'
                });
            } else {
                next(null, {
                    code: 900001
                });
            }
        }
    });
};