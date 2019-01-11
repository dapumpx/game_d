var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ManagerLibrary = (function () {
    function ManagerLibrary() {
    }
    ManagerLibrary.init = function () {
        ManagerLibrary.tblManager = new TblManager();
        ManagerLibrary.evtManager = new EventManager();
    };
    return ManagerLibrary;
}());
__reflect(ManagerLibrary.prototype, "ManagerLibrary");
//# sourceMappingURL=ManagerLibrary.js.map