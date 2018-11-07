var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TimeUtil = (function () {
    function TimeUtil() {
    }
    TimeUtil.toHSMString = function (s) {
        var hstr = Math.floor(s / 3600).toString();
        var sstr = Math.floor((s % 3600) / 60).toString();
        var mstr = (s % 60).toString();
        hstr = TimeUtil.fixStrLen(hstr, 2);
        sstr = TimeUtil.fixStrLen(sstr, 2);
        mstr = TimeUtil.fixStrLen(mstr, 2);
        return hstr + ":" + sstr + ":" + mstr;
    };
    TimeUtil.fixStrLen = function (s, fixLen, flag, isBefore) {
        if (flag === void 0) { flag = "0"; }
        if (isBefore === void 0) { isBefore = true; }
        while (s.length < fixLen) {
            if (isBefore) {
                s = flag + s;
            }
            else {
                s += flag;
            }
        }
        return s;
    };
    return TimeUtil;
}());
__reflect(TimeUtil.prototype, "TimeUtil");
//# sourceMappingURL=TimeUtil.js.map