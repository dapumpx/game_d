var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ModuleManager = (function () {
    function ModuleManager() {
    }
    ;
    Object.defineProperty(ModuleManager, "INS", {
        get: function () {
            return ModuleManager._instace;
        },
        enumerable: true,
        configurable: true
    });
    ModuleManager._instace = new ModuleManager();
    return ModuleManager;
}());
__reflect(ModuleManager.prototype, "ModuleManager");
//# sourceMappingURL=ModuleManager.js.map