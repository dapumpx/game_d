var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TblManager = (function () {
    function TblManager() {
        this.objDictTbl = new Object();
    }
    // private static _instace:TblManager = new TblManager();;
    // static get INS():TblManager
    // {
    // 	return TblManager._instace;
    // }
    TblManager.prototype.addTable = function (c, strTblName) {
        var _this = this;
        if (!this.objDictTbl[strTblName]) {
            console.log("Add table ...", strTblName);
            this.objDictTbl[strTblName] = new Object();
        }
        var strTbl = RES.getRes(strTblName);
        var arrRow = strTbl.split("\n");
        arrRow.forEach(function (row) {
            var tblVo = new c(row);
            _this.objDictTbl[strTblName][tblVo.id] = tblVo;
        });
    };
    TblManager.prototype.getVo = function (strTblName, id) {
        if (this.objDictTbl[strTblName]) {
            return this.objDictTbl[strTblName][id];
        }
        return null;
    };
    return TblManager;
}());
__reflect(TblManager.prototype, "TblManager");
