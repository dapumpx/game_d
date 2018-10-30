var sClient = module.exports;
const Sequelize = require('sequelize');

sClient.init = function (app) {
    var mySqlConfig = app.get('mysql');

    const sequelize = new Sequelize(mySqlConfig.database, mySqlConfig.user, mySqlConfig.password, {
        host: mySqlConfig.host,
        dialect: 'mysql',
        operatorsAliases: false,
        timestamps: false,
        
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    });

    return sequelize;
}