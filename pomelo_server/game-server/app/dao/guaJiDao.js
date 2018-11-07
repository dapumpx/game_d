const guaJiDao = module.exports;
const GuaJi = require('./../models/guaji');
const Sequelize = require('sequelize');
const pomelo = require('pomelo');
const GuaJiC = GuaJi(pomelo.app.get('sClient'), Sequelize.DataTypes);
const utils = require('../dao/util/utils');

guaJiDao.view = function (userId, cb) {
    GuaJiC.findOne({
        where: {
            user_id: userId
        }
    }).then(g => {
        if (g) {
            utils.invokeCallback(cb, null, g);
        } else {
            guaJiDao.init(userId, cb);
        }
    })
}

guaJiDao.init = function(userId, cb){
    GuaJiC.create({
        user_id: userId,
        start_time: Date.now(),
        stage_id: 1,
        chapter_id: 1
    }).then(g => {
        utils.invokeCallback(cb, null, g);
    });
}