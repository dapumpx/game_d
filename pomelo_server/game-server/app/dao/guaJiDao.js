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

guaJiDao.init = function (userId, cb) {
    GuaJiC.create({
        user_id: userId,
        start_time: Date.now(),
        stage_id: 1,
        chapter_id: 1
    }).then(g => {
        utils.invokeCallback(cb, null, g);
    });
}

guaJiDao.checkExp = function (userId, cb) {
    GuaJiC.findOne({
        where: {
            user_id: userId
        }
    }).then(g => {
        let second = Math.floor((Date.now() - g.start_time) / 1000);
        let perSecondExp = 0.1;
        let totalExp = second * perSecondExp;
        if (totalExp <= 0) {
            cb('total exp == 0', null);
        } else {
            cb(null, totalExp);
        }
    });
}

guaJiDao.clearTime = function (userId, cb) {
    GuaJiC.update({
        start_time: Date.now()
    }, {
        where: {
            user_id: userId
        }
    }).then(result => {
        console.log(result);
        if (result) cb(null)
    });
}