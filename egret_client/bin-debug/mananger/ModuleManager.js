var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ModuleManager = (function () {
    function ModuleManager() {
        this.arrModule = [];
    }
    ModuleManager.prototype.showModule = function (mid) {
        if (this.isShow(mid)) {
            this.closeModule(mid);
        }
        else {
            var view = ModuleHelper.getModule(mid);
            ManagerLibrary.layerMgr.addView(view);
            this.arrModule.push(view.mid);
        }
    };
    ModuleManager.prototype.closeModule = function (mid) {
        if (this.isShow(mid)) {
            this.arrModule.splice(this.arrModule.indexOf(mid), 1);
            ManagerLibrary.layerMgr.removeView(mid);
        }
    };
    ModuleManager.prototype.isShow = function (mid) {
        return this.arrModule.indexOf(mid) >= 0;
    };
    return ModuleManager;
}());
__reflect(ModuleManager.prototype, "ModuleManager");
//# sourceMappingURL=ModuleManager.js.map