var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FunctionType = (function () {
    function FunctionType() {
        // console.log("i am in...");
    }
    FunctionType.MAIN_LINE = 90001;
    FunctionType.TEST_WIN = 90002;
    return FunctionType;
}());
__reflect(FunctionType.prototype, "FunctionType");
//# sourceMappingURL=FunctionType.js.map