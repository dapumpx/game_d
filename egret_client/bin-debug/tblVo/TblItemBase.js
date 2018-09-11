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
var TblItemBase = (function (_super) {
    __extends(TblItemBase, _super);
    function TblItemBase(data) {
        var _this = _super.call(this) || this;
        var arrData = data.split(",");
        _this.id = Number(arrData[0]);
        _this.name = arrData[1];
        _this.quality = Number(arrData[2]);
        return _this;
    }
    TblItemBase.getVo = function (id) {
        return TblManager.INS.getVo(TblItemBase.TBL_NAME, id);
    };
    TblItemBase.TBL_NAME = "tbl_item_base_csv";
    return TblItemBase;
}(TblBase));
__reflect(TblItemBase.prototype, "TblItemBase");
//# sourceMappingURL=TblItemBase.js.map