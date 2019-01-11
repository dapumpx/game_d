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
var StcCellVO = (function (_super) {
    __extends(StcCellVO, _super);
    function StcCellVO(data) {
        var _this = _super.call(this) || this;
        _this.id = data[0];
        _this.name = data[1];
        _this.probability = data[2];
        _this.icon = data[3];
        _this.type = data[4];
        _this.return_ratio = data[5];
        console.log(_this);
        return _this;
    }
    StcCellVO.TBL_NAME = "cell";
    return StcCellVO;
}(TblBase));
__reflect(StcCellVO.prototype, "StcCellVO");
//# sourceMappingURL=StcCellVO.js.map