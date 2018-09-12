var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ManagerLibrary = (function () {
    function ManagerLibrary() {
    }
    ManagerLibrary.moduleMgr = new ModuleManager();
    ManagerLibrary.functionMgr = new FunctionManager();
    ManagerLibrary.layerMgr = new LayerManager();
    ManagerLibrary.tblMgr = new TblManager();
    return ManagerLibrary;
}());
__reflect(ManagerLibrary.prototype, "ManagerLibrary");
//# sourceMappingURL=ManagerLibrary.js.map