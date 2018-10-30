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
    /*
    public setSkinName(strSkinName:string):void
    {
        this.addEventListener(egret.Event.COMPLETE,this.onSkinLoadComplete,this);
        this.skinName = "resource/eui_exml/" + strSkinName + ".exml";
    }
    */
    BaseModuleView.prototype.onSkinLoadComplete = function () {
        _super.prototype.onSkinLoadComplete.call(this);
        //this.x = (egret.MainContext.instance.stage.stageWidth - this.width) * 0.5;
        //this.y = (egret.MainContext.instance.stage.stageHeight - this.height) * 0.5;
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width = egret.MainContext.instance.stage.stageWidth;
        // console.log(egret.MainContext.instance.stage.width, (egret.MainContext.instance.stage.width - this.width) * 0.5)
        // console.log("skin load complete");
    };
    BaseModuleView.prototype.doClose = function () {
        ManagerLibrary.moduleMgr.closeModule(this.mid);
    };
    return BaseModuleView;
}(BaseComponent));
__reflect(BaseModuleView.prototype, "BaseModuleView");
//# sourceMappingURL=BaseModuleView.js.map