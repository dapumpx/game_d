var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PomeloService = (function () {
    function PomeloService() {
        this.pomelo = new PomeloForEgret.Pomelo();
        this.pomelo.on(PomeloForEgret.Pomelo.EVENT_IO_ERROR, this.onPomeloIOErrorHandler);
        this.pomelo.init({
            host: '127.0.0.1',
            port: 3010
        }, this.onPomeloConnectSuccessHandler);
    }
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