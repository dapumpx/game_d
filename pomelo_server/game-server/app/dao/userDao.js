const userDao = module.exports;
const User = require('./../models/user');
const Sequelize = require('sequelize');
const pomelo = require('pomelo');
const UserC = User(pomelo.app.get('sClient'), Sequelize.DataTypes);
const utils = require('../dao/util/utils');

userDao.addExp = function (userId, totalExp, cb) {
    UserC.update({
        exp: totalExp
    }, {
        where: {
            id: userId
        }
    }).then(g => {
        if (g) {
            console.log(g);
            cb(null)
        }
    })
}