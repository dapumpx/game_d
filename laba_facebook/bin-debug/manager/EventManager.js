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
var EventManager = (function (_super) {
    __extends(EventManager, _super);
    function EventManager() {
        return _super.call(this) || this;
    }
    EventManager.EVT_ON_SLOT_STOP = "EVT_ON_SLOT_STOP";
    EventManager.EVT_START_ROLL = "EVT_START_ROLL";
    return EventManager;
}(egret.EventDispatcher));
__reflect(EventManager.prototype, "EventManager");
//# sourceMappingURL=EventManager.js.map