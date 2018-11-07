const uuidv4 = require('uuid/v4');
const pomelo = require('pomelo');
const User = require('./../../../models/user');
const Team = require('./../../../models/team');
const Sequelize = require('sequelize');

module.exports = function (app) {
    return new Handler(app);
};

var Handler = function (app) {
    this.app = app;
};
// var dataApi = require('../../../util/dataApi');

Handler.prototype.login = function (msg, session, next) {
    // console.log(session);

    if (!msg.user_name) {
        next(null, {
            code: 900002
        });
        return;
    }
    pomelo.app.get('sClient').authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    var UserC = User(pomelo.app.get('sClient'), Sequelize.DataTypes)
    var TeamC = Team(pomelo.app.get('sClient'), Sequelize.DataTypes);
    TeamC.findOne({
        include: [{
            model: UserC,
            as: 'user'
        }],
        where: {
            id: '763b7e9f-02f1-43bc-a6f6-bf0730fcd431'


        }
    }).then(t => {    
        console.log(t.user.name);
    })
    return;
    var UserC = User(pomelo.app.get('sClient'), Sequelize.DataTypes)
    UserC.findOne({
        where: {
            user_name: msg.user_name
        }
    }).then(user => {
        if (user) {
            if (user.password == msg.password) {
                next(null, {
                    code: 1,
                    user: user
                });
            } else {
                next(null, {
                    code: 900001
                });
            }
        } else {
            UserC.create({
                id: uuidv4(),
                user_name: msg.user_name,
                name: 'random',
                password: msg.password
            }).then(user => {
                next(null, {
                    code: 900003,
                    user: user
                });
            });
        }
    });



};