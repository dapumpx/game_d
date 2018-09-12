var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LayerManager = (function () {
    function LayerManager() {
    }
    LayerManager.prototype.init = function (stage) {
        this.layerScene = new LayerBase();
        stage.addChild(this.layerScene);
        this.layerStatic = new LayerBase();
        stage.addChild(this.layerStatic);
        this.layerPopup = new LayerBase();
        stage.addChild(this.layerPopup);
        this.layerTop = new LayerBase();
        stage.addChild(this.layerTop);
    };
    LayerManager.prototype.addView = function (view) {
        switch (ManagerLibrary.functionMgr.getFuncDataVo(view.mid).layerType) {
            case LayerType.POPUP:
                this.layerPopup.addChild(view);
                break;
            case LayerType.SCENE:
                this.layerScene.addChild(view);
                break;
            case LayerType.STATIC:
                this.layerStatic.addChild(view);
                break;
            case LayerType.TOP:
                this.layerTop.addChild(view);
                break;
        }
    };
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map