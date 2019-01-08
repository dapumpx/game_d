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
        _this.skinName = "resource/eui_exml/MainView.exml";
        return _this;
    }
    MainView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MainView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var box = new egret.Sprite();
        box.y = 300;
        box.x = 100;
        this.addChild(box);
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 5; j++) {
                var cell = new LotteryCellRender(i, j);
                cell.x = j * 100;
                cell.y = i * -100 + 200;
                box.addChild(cell);
            }
        }
        var m = new egret.Shape();
        m.graphics.beginFill(0, 1);
        m.graphics.drawRect(0, 0, 500, 300);
        m.graphics.endFill();
        m.x = 100;
        m.y = 300;
        box.mask = m;
        this.addChild(m);
        this.getChildByName("btnStart").addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTap, this);
    };
    MainView.prototype.onTap = function (e) {
        if (e === void 0) { e = null; }
        EventManager.Instance.dispatchEvent(new egret.Event(EventManager.EVT_START_ROLL));
    };
    return MainView;
}(eui.Component));
__reflect(MainView.prototype, "MainView", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=MainView.js.map