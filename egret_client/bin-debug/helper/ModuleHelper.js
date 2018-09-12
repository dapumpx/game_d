var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ModuleHelper = (function () {
    function ModuleHelper() {
    }
    ModuleHelper.getModule = function (mid) {
        var moduleView;
        switch (mid) {
            case FunctionType.TEST_WIN:
                moduleView = new TestView();
                break;
        }
        if (moduleView) {
            moduleView.mid = mid;
        }
        return moduleView;
    };
    return ModuleHelper;
}());
__reflect(ModuleHelper.prototype, "ModuleHelper");
//# sourceMappingURL=ModuleHelper.js.map