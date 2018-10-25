var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PomeloService = (function () {
    function PomeloService() {
        var _this = this;
        this.onPomeloConnectGateSuccessHandler = function () {
            _this.pomelo.request("gate.gateHandler.queryEntry", { uid: 123123 }, _this.onQueryEntryResult);
        };
        this.onQueryEntryResult = function (result) {
            console.log(result);
            _this.connectorServerIP = result.host;
            _this.connectorServerPort = result.port;
            _this.pomelo.disconnect();
            _this.pomelo.off();
            _this.pomelo.init({
                host: result.host,
                port: result.port
            }, _this.onPomeloConnectSuccessHandler);
        };
        this.onPomeloHeartBeatTimeoutHandler = function (event) {
            console.log("Pomelo ready to reconnect...");
            _this.connnect();
        };
        this.pomelo = new PomeloForEgret.Pomelo();
        this.pomelo.on(PomeloForEgret.Pomelo.EVENT_IO_ERROR, this.onPomeloIOErrorHandler);
        this.pomelo.on(PomeloForEgret.Pomelo.EVENT_HEART_BEAT_TIMEOUT, this.onPomeloHeartBeatTimeoutHandler);
        this.connnect();
    }
    PomeloService.prototype.connnect = function () {
        this.pomelo.init({
            host: '127.0.0.1',
            port: 3014
        }, this.onPomeloConnectGateSuccessHandler);
    };
    Object.defineProperty(PomeloService, "INS", {
        get: function () {
            if (PomeloService._instance == null) {
                PomeloService._instance = new PomeloService();
            }
            return PomeloService._instance;
        },
        enumerable: true,
        configurable: true
    });
    PomeloService.prototype.onPomeloConnectSuccessHandler = function () {
        console.log("Pomelo Connect Success...!!!");
    };
    PomeloService.prototype.onPomeloIOErrorHandler = function (event) {
        console.error("Pomelo Error!", event);
    };
    return PomeloService;
}());
__reflect(PomeloService.prototype, "PomeloService");
//# sourceMappingURL=PomeloService.js.map