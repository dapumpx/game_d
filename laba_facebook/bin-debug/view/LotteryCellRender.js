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
var LotteryCellRender = (function (_super) {
    __extends(LotteryCellRender, _super);
    function LotteryCellRender(row, col) {
        var _this = _super.call(this) || this;
        _this.row = row;
        _this.col = col;
        return _this;
    }
    LotteryCellRender.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    LotteryCellRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var tt = RES.getRes((Math.floor(Math.random() * 100) + 1).toString() + "_head_png");
        var img = new egret.Bitmap(tt);
        this.addChild(img);
        //this.startRoll()
    };
    LotteryCellRender.prototype.addListener = function () {
        EventManager.Instance.addEventListener(EventManager.EVT_ON_SLOT_STOP, this.onEvtSlotStop, this);
        EventManager.Instance.addEventListener(EventManager.EVT_START_ROLL, this.startRoll, this);
    };
    LotteryCellRender.prototype.startRoll = function (e) {
        if (e === void 0) { e = null; }
        this.doRoll();
    };
    LotteryCellRender.prototype.doRoll = function () {
        egret.Tween.get(this).to({
            y: this.y + 300
        }, 300).call(this.resetPos, this);
    };
    LotteryCellRender.prototype.onEvtSlotStop = function (e) {
        if (e === void 0) { e = null; }
        this.isStop = true;
    };
    LotteryCellRender.prototype.resetPos = function () {
        if (!this.isStop) {
            this.y -= 300;
            this.startRoll();
        }
    };
    return LotteryCellRender;
}(eui.Component));
__reflect(LotteryCellRender.prototype, "LotteryCellRender", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=LotteryCellRender.js.map