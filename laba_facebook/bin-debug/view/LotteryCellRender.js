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
var LotteryCellRender = (function (_super) {
    __extends(LotteryCellRender, _super);
    function LotteryCellRender(row, col) {
        var _this = _super.call(this) || this;
        _this.isStop = true;
        _this.isForceStop = false;
        _this.speed = 32;
        _this.row = row;
        _this.col = col;
        return _this;
    }
    LotteryCellRender.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    LotteryCellRender.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.imgCell = new egret.Bitmap(RES.getRes((Math.floor(Math.random() * 100) + 1).toString() + "_head_png"));
        this.addChild(this.imgCell);
        //this.startRoll()
        this.addListener();
        egret.Tween.get(this).wait(Math.random() * 1000).call(function () {
            LightEffect.playEffect(_this);
        });
    };
    LotteryCellRender.prototype.addListener = function () {
        ManagerLibrary.evtManager.addEventListener(EventManager.EVT_ON_SLOT_STOP, this.onEvtSlotStop, this);
        ManagerLibrary.evtManager.addEventListener(EventManager.EVT_START_ROLL, this.startRoll, this);
    };
    LotteryCellRender.prototype.startRoll = function (e) {
        if (e === void 0) { e = null; }
        if (!this.isStop) {
            return;
        }
        egret.stopTick(this.onRoll, this);
        this.isStop = false;
        this.isForceStop = false;
        this.y = this.row * LotteryCellRender.CELL_H;
        egret.Tween.get(this).wait(this.col * 100).call(this.doRoll_1, this);
    };
    LotteryCellRender.prototype.doRoll_1 = function () {
        egret.startTick(this.onRoll, this);
    };
    LotteryCellRender.prototype.onRoll = function (ts) {
        this.y += this.speed;
        if (this.y >= LotteryCellRender.CELL_H * 3) {
            if (!this.isForceStop) {
                this.y = -LotteryCellRender.CELL_H + this.y - LotteryCellRender.CELL_H * 3;
                this.imgCell.texture = RES.getRes((Math.floor(Math.random() * 100) + 1).toString() + "_head_png");
            }
        }
        if (this.isStop) {
            if (this.y >= LotteryCellRender.CELL_H * this.row) {
                if (this.isForceStop) {
                    this.y = LotteryCellRender.CELL_H * this.row;
                    egret.stopTick(this.onRoll, this);
                    return false;
                }
            }
            else if (this.isStop) {
                this.isForceStop = true;
            }
        }
        return false;
    };
    LotteryCellRender.prototype.onEvtSlotStop = function (e) {
        if (e === void 0) { e = null; }
        if (e.data.col == this.col) {
            this.isStop = true;
        }
    };
    LotteryCellRender.CELL_W = 108;
    LotteryCellRender.CELL_H = 107;
    return LotteryCellRender;
}(eui.Component));
__reflect(LotteryCellRender.prototype, "LotteryCellRender", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=LotteryCellRender.js.map