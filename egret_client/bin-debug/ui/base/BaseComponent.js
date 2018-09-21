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
var BaseComponent = (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent() {
        return _super.call(this) || this;
    }
    BaseComponent.prototype.setSkinName = function (strSkinName) {
        this.addEventListener(egret.Event.COMPLETE, this.onSkinLoadComplete, this);
        this.skinName = "resource/eui_exml/" + strSkinName + ".exml";
    };
    BaseComponent.prototype.onSkinLoadComplete = function () {
    };
    return BaseComponent;
}(eui.Component));
__reflect(BaseComponent.prototype, "BaseComponent");
//# sourceMappingURL=BaseComponent.js.map