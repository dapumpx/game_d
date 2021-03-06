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
        this.btnLink0.textFlow = [
            { text: "Test View", style: { underline: true } }
        ];
        this.btnLink1.textFlow = [
            { text: "Click 2", style: { underline: true } }
        ];
        this.btnLink0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn1ClickHandler, this);
        this.btnLink1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn2ClickHandler, this);
        this.gameTimer = new GameTimer();
        this.gameTimer.x = 50;
        this.gameTimer.y = 200;
        this.addChild(this.gameTimer);
    };
    MainRoleInfo.prototype.onBtn2ClickHandler = function (e) {
        // PomeloService.INS.pomelo.request(this.txtRouter.text, this.txtParams.text, function (result) {
        // 	//消息回调
        // 	console.log("request", result);
        // });
        var req = {};
        req['user_id'] = UserDataModel.uid;
        PomeloService.INS.pomelo.request("main.guaJiHandler.checkExp", req, function (result) {
            //消息回调
            console.log("request", result);
            // this.gameTimer.setStartTime(result.info.start_time);
        }, this);
    };
    MainRoleInfo.prototype.onBtn1ClickHandler = function (e) {
        // var req = {};
        // req['user_name'] = "严立夤";
        // req['password'] = "严立夤";
        // PomeloService.INS.pomelo.request("main.loginHandler.login", req, function (result) {
        // 	//消息回调
        // 	console.log("request", result);	
        // });
        var req = {};
        req['user_id'] = UserDataModel.uid;
        PomeloService.INS.pomelo.request("main.guaJiHandler.view", req, function (result) {
            //消息回调
            console.log("request", result);
            this.gameTimer.setStartTime(result.info.start_time);
        }, this);
    };
    return MainRoleInfo;
}(BaseComponent));
__reflect(MainRoleInfo.prototype, "MainRoleInfo");
//# sourceMappingURL=MainRoleInfo.js.map