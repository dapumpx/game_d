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
    function LotteryCellRender() {
        return _super.call(this) || this;
    }
    LotteryCellRender.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    LotteryCellRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return LotteryCellRender;
}(eui.Component));
__reflect(LotteryCellRender.prototype, "LotteryCellRender", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=LotteryCellRender.js.map