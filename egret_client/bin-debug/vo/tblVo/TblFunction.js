var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TblFunction = (function (_super) {
    __extends(TblFunction, _super);
    function TblFunction(data) {
        var _this = _super.call(this) || this;
        var arrData = data.split(",");
        _this.id = Number(arrData[0]);
        _this.name = arrData[1];
        _this.openLevel = Number(arrData[2]);
        return _this;
    }
    TblFunction.getVo = function (id) {
        return ManagerLibrary.tblMgr.getVo(TblFunction.TBL_NAME, id);
    };
    TblFunction.TBL_NAME = "tbl_function_csv";
    return TblFunction;
}(TblBase));
__reflect(TblFunction.prototype, "TblFunction");
