var guaJiDao = require('../../../dao/guaJiDao');

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
   
    return;

    // var GuaJiC = GuaJi(pomelo.app.get('sClient'), Sequelize.DataTypes);
    // GuaJiC.findOne({
    //     where: {
    //         user_id: msg.user_id
    //     }
    // }).then(g => {
    //     if (g) {
    //         next(null, {
    //             code: 1,
    //             info: g
    //         });
    //     } else {
    //         console.log(Date.now());
    //         GuaJiC.create({
    //             user_id: msg.user_id,
    //             start_time: Date.now(),
    //             stage_id: 1,
    //             chapter_id: 1
    //         }).then(g => {
    //             next(null, {
    //                 code: 1,
    //                 info: g
    //             });
    //         });
    //     }
    // })
}