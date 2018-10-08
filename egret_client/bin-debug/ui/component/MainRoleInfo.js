var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MainRoleInfo = (function (_super) {
    __extends(MainRoleInfo, _super);
    function MainRoleInfo() {
        var _this = _super.call(this) || this;
        _this.setSkinName("comp/MainRoleInfoUI");
        return _this;
    }
    MainRoleInfo.prototype.onSkinLoadComplete = function () {
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn1ClickHandler, this);
    };
    MainRoleInfo.prototype.onBtn1ClickHandler = function (e) {
        // var pomelo = new PomeloForEgret.Pomelo();
        // pomelo.on(PomeloForEgret.Pomelo.EVENT_IO_ERROR, function(event){
        //     //错误处理
        //     console.error("error",event);
        // });
        // pomelo.init({
        //     host: '127.0.0.1',
        //     port: 3010
        // }, function () {
        //     //连接成功执行函数
        PomeloService.INS.pomelo.request("main.loginHandler.login", "hello world", function (result) {
            //消息回调
            console.log("request", result);
        });
        // });
    };
    return MainRoleInfo;
}(BaseComponent));
__reflect(MainRoleInfo.prototype, "MainRoleInfo");
//# sourceMappingURL=MainRoleInfo.js.map