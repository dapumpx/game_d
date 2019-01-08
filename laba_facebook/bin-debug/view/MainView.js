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
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.COMPLETE, _this.onSkinLoadComplete, _this);
        _this.skinName = "resource/eui_exml/MainView.exml";
        return _this;
    }
    MainView.prototype.onSkinLoadComplete = function (e) {
        if (e === void 0) { e = null; }
    };
    MainView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MainView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width = egret.MainContext.instance.stage.stageWidth;
        var box = new egret.Sprite();
        box.y = LotteryCellRender.CELL_H * 3;
        box.x = 100;
        this.addChild(box);
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 5; j++) {
                var cell = new LotteryCellRender(i, j);
                cell.x = j * LotteryCellRender.CELL_W;
                cell.y = i * -LotteryCellRender.CELL_H + LotteryCellRender.CELL_H * 2;
                box.addChild(cell);
            }
        }
        var m = new egret.Shape();
        m.graphics.beginFill(0, 1);
        m.graphics.drawRect(0, 0, LotteryCellRender.CELL_W * 5, LotteryCellRender.CELL_H * 3);
        m.graphics.endFill();
        m.x = 100;
        m.y = LotteryCellRender.CELL_H * 3;
        box.mask = m;
        this.addChild(m);
        this.addHandler();
    };
    MainView.prototype.addHandler = function () {
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStartTapHandler, this);
        this.btnStop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStopTapHandler, this);
    };
    MainView.prototype.onBtnStopTapHandler = function (e) {
        if (e === void 0) { e = null; }
        EventManager.Instance.dispatchEvent(new egret.Event(EventManager.EVT_ON_SLOT_STOP));
    };
    MainView.prototype.onBtnStartTapHandler = function (e) {
        if (e === void 0) { e = null; }
        console.log("Click...");
        EventManager.Instance.dispatchEvent(new egret.Event(EventManager.EVT_START_ROLL));
    };
    return MainView;
}(eui.Component));
__reflect(MainView.prototype, "MainView", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=MainView.js.map