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
var GameTimer = (function (_super) {
    __extends(GameTimer, _super);
    function GameTimer() {
        var _this = _super.call(this) || this;
        _this._gameTimer = new eui.Label();
        _this.addChild(_this._gameTimer);
        return _this;
    }
    GameTimer.prototype.setStartTime = function (ts) {
        this._startTs = ts;
        TimerManager.doLoop(500, this.onTimerHandler, this);
    };
    GameTimer.prototype.onTimerHandler = function () {
        var s = new Date().getTime() - this._startTs;
        s = Math.floor(s / 1000);
        this._gameTimer.text = TimeUtil.toHSMString(s);
    };
    return GameTimer;
}(BaseComponent));
__reflect(GameTimer.prototype, "GameTimer");
//# sourceMappingURL=GameTimer.js.map