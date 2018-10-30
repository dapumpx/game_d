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
    LayerManager.prototype.removeView = function (mid) {
        switch (ManagerLibrary.functionMgr.getFuncDataVo(mid).layerType) {
            case LayerType.POPUP:
                this.removeFromLayer(mid, this.layerPopup);
                break;
            case LayerType.SCENE:
                this.removeFromLayer(mid, this.layerScene);
                break;
            case LayerType.STATIC:
                this.removeFromLayer(mid, this.layerStatic);
                break;
            case LayerType.TOP:
                this.removeFromLayer(mid, this.layerTop);
                break;
        }
    };
    LayerManager.prototype.removeFromLayer = function (mid, layer) {
        for (var i = 0; i < layer.numChildren; i++) {
            var view = layer.getChildAt(i);
            if (view && view.mid == mid) {
                layer.removeChild(view);
            }
        }
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
