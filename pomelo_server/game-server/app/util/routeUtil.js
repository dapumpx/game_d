var exp = module.exports;
var dispatcher = require('./dispatcher');

exp.main = function (session, msg, app, cb) {
    // var serverId = session.get('serverId');

    // if(!serverId) {
    // 	cb(new Error('can not find server info for type: ' + msg.serverType));
    // 	return;
    // }

    // cb(null, serverId);

    var mainServers = app.getServersByType('main');
    if (!mainServers || mainServers.length === 0) {
        cb(new Error('can not find chat servers.'));
        return;
    }
    // console.log(mainServers.length);

    // var res = dispatcher.dispatch(session.get('rid'), mainServers);

    cb(null, mainServers[0].id);
};