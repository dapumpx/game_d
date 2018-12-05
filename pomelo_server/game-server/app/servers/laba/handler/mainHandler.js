module.exports = function (app) {
    return new Handler(app);
};

var labaDao = require('../../../dao/labaDao');

var Handler = function (app) {
    this.app = app;
};

Handler.prototype.la = function (msg, session, next) {
    let result = [];
    for(let i = 0; i < 15; i++)
    {
        result.push(labaDao.once());
    }

    next(null, {
        code: 1,
        info: result
    });
}