var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FunctionManager = (function () {
    function FunctionManager() {
    }
    ;
    Object.defineProperty(FunctionManager, "INS", {
        get: function () {
            return FunctionManager._instace;
        },
        enumerable: true,
        configurable: true
    });
    FunctionManager._instace = new FunctionManager();
    return FunctionManager;
}());
__reflect(FunctionManager.prototype, "FunctionManager");
//# sourceMappingURL=FunctionManager.js.map