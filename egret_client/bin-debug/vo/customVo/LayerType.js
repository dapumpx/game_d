var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LayerType = (function () {
    function LayerType() {
    }
    LayerType.SCENE = 0;
    LayerType.STATIC = 1;
    LayerType.POPUP = 2;
    LayerType.TOP = 3;
    return LayerType;
}());
__reflect(LayerType.prototype, "LayerType");
