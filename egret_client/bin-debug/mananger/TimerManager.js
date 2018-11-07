var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TimerManager = (function () {
    function TimerManager() {
    }
    TimerManager.init = function () {
        TimerManager._shape = new egret.Shape();
        TimerManager._shape.addEventListener(egret.Event.ENTER_FRAME, TimerManager.onShapeEnterFrameHandler, null);
        TimerManager._dictHandlers = new Array();
        TimerManager._pool = new Array();
    };
    TimerManager.onShapeEnterFrameHandler = function (e) {
        if (TimerManager._currTimer == 0) {
            TimerManager._currTimer = egret.getTimer();
            return;
        }
        var overT = egret.getTimer() - TimerManager._currTimer;
        if (overT > TimerManager._timeout) {
            TimerManager._currTimer = egret.getTimer();
            return;
        }
        for (var key in TimerManager._dictHandlers) {
            var handler = TimerManager._dictHandlers[key];
            var t = handler.userFrame ? TimerManager._currFrame : TimerManager._currTimer;
            if (t >= handler.exeTime) {
                handler.repeat ? handler.exeTime += handler.delay : TimerManager.clearTimer(handler.method);
                handler.method.apply(handler.objThis, handler.args);
            }
        }
    };
    TimerManager.create = function (useFrame, repeat, delay, method, objThis, args) {
        if (args === void 0) { args = null; }
        //先删除相同函数的计时
        TimerManager.clearTimer(method);
        //如果执行时间小于1，直接执行
        if (delay < 1) {
            method.apply(objThis, args);
            return;
        }
        var handler = TimerManager._pool.length > 0 ? TimerManager._pool.pop() : new TimerHandler();
        handler.userFrame = useFrame;
        handler.repeat = repeat;
        handler.delay = delay;
        handler.method = method;
        handler.args = args;
        handler.exeTime = delay + (useFrame ? TimerManager._currFrame : TimerManager._currTimer);
        handler.objThis = objThis;
        handler.randGUID();
        TimerManager._dictHandlers[handler.handlerId] = handler;
        TimerManager._count++;
    };
    TimerManager.clearTimer = function (method) {
        var handler = TimerManager.getHandlerByMethond(method);
        if (handler != null) {
            delete TimerManager._dictHandlers[handler.handlerId];
            handler.clear();
            TimerManager._pool.push(handler);
            TimerManager._count--;
        }
    };
    TimerManager.getHandlerByMethond = function (method) {
        TimerManager._dictHandlers.forEach(function (handler) {
            if (handler.method == method) {
                return handler;
            }
        });
        return null;
    };
    /**定时重复执行*/
    TimerManager.doLoop = function (delay, method, objThis, args) {
        if (args === void 0) { args = null; }
        TimerManager.create(false, true, delay, method, objThis, args);
    };
    TimerManager.getHandlerKeyByMethod = function (method) {
        TimerManager._dictHandlers.forEach(function (handler) {
            if (handler.method == method) {
                return handler.handlerId;
            }
        });
        return "";
    };
    TimerManager._currTimer = 0;
    TimerManager._timeout = 1000;
    TimerManager._currFrame = 0;
    TimerManager._count = 0;
    return TimerManager;
}());
__reflect(TimerManager.prototype, "TimerManager");
var TimerHandler = (function () {
    function TimerHandler() {
    }
    TimerHandler.prototype.randGUID = function () {
        this.handlerId = RUtil.uuidv4();
    };
    /**清理*/
    TimerHandler.prototype.clear = function () {
        this.method = null;
        this.args = null;
    };
    return TimerHandler;
}());
__reflect(TimerHandler.prototype, "TimerHandler");
//# sourceMappingURL=TimerManager.js.map