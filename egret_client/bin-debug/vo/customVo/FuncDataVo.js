var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FuncDataVo = (function () {
    function FuncDataVo(_id, _assetName, _layerType) {
        this.id = _id;
        this.assetName = _assetName;
        this.layerType = _layerType;
    }
    return FuncDataVo;
}());
__reflect(FuncDataVo.prototype, "FuncDataVo");
//# sourceMappingURL=FuncDataVo.js.map