var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FunctionManager = (function () {
    function FunctionManager() {
        this.init();
        // console.log(FunctionType);
    }
    FunctionManager.prototype.init = function () {
        this.dictMoldule = {};
        this.dictMoldule[FunctionType.MAIN_LINE] = new FuncDataVo(FunctionType.MAIN_LINE, "", LayerType.SCENE);
        this.dictMoldule[FunctionType.TEST_WIN] = new FuncDataVo(FunctionType.TEST_WIN, "", LayerType.POPUP);
    };
    FunctionManager.prototype.getFuncDataVo = function (id) {
        return this.dictMoldule[id];
    };
    return FunctionManager;
}());
__reflect(FunctionManager.prototype, "FunctionManager");
