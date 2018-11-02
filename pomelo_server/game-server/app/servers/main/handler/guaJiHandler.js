const GuaJi = require('./../../../models/guaji');
const Sequelize = require('sequelize');
const pomelo = require('pomelo');

module.exports = function (app) {
    return new Handler(app);
};

var Handler = function (app) {
    this.app = app;
};

Handler.prototype.view = function (msg, session, next) {
    var GuaJiC = GuaJi(pomelo.app.get('sClient'), Sequelize.DataTypes);
    GuaJiC.findOne({
        where: {
            user_id: msg.user_id
        }
    }).then(g => {
        if (g) {
            next(null, {
                code: 1,
                info: g
            });
        } else {
            console.log(Date.now());
            GuaJiC.create({
                user_id: msg.user_id,
                start_time: Date.now(),
                stage_id: 1,
                chapter_id: 1
            }).then(g => {
                next(null, {
                    code: 1,
                    info: g
                });
            });
        }
    })
}