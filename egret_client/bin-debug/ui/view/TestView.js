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
var TestView = (function (_super) {
    __extends(TestView, _super);
    function TestView() {
        var _this = _super.call(this) || this;
        _this.setSkinName("TestUI");
        return _this;
    }
    TestView.prototype.onSkinLoadComplete = function () {
        _super.prototype.onSkinLoadComplete.call(this);
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        // var sp:egret.Sprite = new egret.Sprite();
        // sp.graphics.beginFill(0x00ff00, 1);
        // sp.graphics.drawRect(0, 0, this.width, this.height);
        // sp.graphics.endFill();
        // this.addChildAt(sp, 0);
        var mainRoleInfo = new MainRoleInfo();
        this.addChild(mainRoleInfo);
        // console.log("x", this.x, "y", this.y);
    };
    TestView.prototype.onTap = function (e) {
        console.log("CLICK CLICK");
        _super.prototype.doClose.call(this);
    };
    return TestView;
}(BaseModuleView));
__reflect(TestView.prototype, "TestView");
//# sourceMappingURL=TestView.js.map