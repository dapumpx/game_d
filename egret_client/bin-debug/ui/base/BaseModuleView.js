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
var BaseModuleView = (function (_super) {
    __extends(BaseModuleView, _super);
    function BaseModuleView() {
        return _super.call(this) || this;
    }
    BaseModuleView.prototype.setSkinName = function (strSkinName) {
        this.addEventListener(egret.Event.COMPLETE, this.onSkinLoadComplete, this);
        this.skinName = "resource/eui_exml/" + strSkinName + ".exml";
    };
    BaseModuleView.prototype.onSkinLoadComplete = function () {
        console.log("skin load complete");
    };
    return BaseModuleView;
}(eui.Component));
__reflect(BaseModuleView.prototype, "BaseModuleView");
//# sourceMappingURL=BaseModuleView.js.map