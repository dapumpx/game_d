var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LayerManager = (function () {
    function LayerManager() {
    }
    ;
    Object.defineProperty(LayerManager, "INS", {
        get: function () {
            return LayerManager._instace;
        },
        enumerable: true,
        configurable: true
    });
    LayerManager.prototype.init = function (stage) {
        this.layerScene = new egret.DisplayObjectContainer();
        stage.addChild(this.layerScene);
        this.layerStatic = new egret.DisplayObjectContainer();
        stage.addChild(this.layerStatic);
        this.layerPopup = new egret.DisplayObjectContainer();
        stage.addChild(this.layerPopup);
        this.layerTop = new egret.DisplayObjectContainer();
        stage.addChild(this.layerTop);
    };
    LayerManager._instace = new LayerManager();
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map