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
        _this.labaState = 0; //0:stop 1:running 2:ready 3:stop 4:force stop
        _this.perDuration = 50;
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
        ManagerLibrary.evtManager.addEventListener(EventManager.EVT_CHANGE_STATE, this.changeState, this);
        ManagerLibrary.evtManager.addEventListener(EventManager.EVT_UPDATE_TO_NEXT_STEP, this.onUpdateToNextStep, this);
    };
    LotteryCellRender.prototype.onUpdateToNextStep = function (e) {
        var _this = this;
        if (this.row == 3)
            return;
        //console.log("row: " + this.row + ", col: " + this.col, ", step: " + GameModel.currStep);
        //console.log(GameModel.totalResult[GameModel.currStep])
        var vo = ManagerLibrary.tblManager.getVo(StcCellVO.TBL_NAME, GameModel.totalResult[GameModel.currStep][this.getCellIndex()].id);
        this.imgCell.texture = RES.getRes(vo.icon + "_head_png");
        var oldRow = Math.round(this.y / LotteryCellRender.CELL_H);
        if (oldRow != this.row) {
            this.labaState = LotteryCellRender.STATE_RUNNING;
            egret.Tween.get(this).to({ y: this.row * LotteryCellRender.CELL_H }, (this.row - oldRow) * this.perDuration * 2)
                .call(function () {
                _this.labaState = LotteryCellRender.STATE_PAUSE;
                ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_CHECK_CELL_STATE));
            }, this);
        }
    };
    LotteryCellRender.prototype.changeState = function (e) {
        if (this.labaState == LotteryCellRender.STATE_PAUSE)
            return;
        if (e.data.col == this.col) {
            this.labaState = e.data.state;
        }
    };
    LotteryCellRender.prototype.checkChangeHandler = function () {
        switch (this.labaState) {
            case LotteryCellRender.STATE_RUNNING:
                this.imgCell.texture = RES.getRes(Math.floor(Math.random() * 100 + 1) + "_head_png");
                break;
            case LotteryCellRender.STATE_READY_STOP:
                if (this.row == 3) {
                    egret.Tween.removeTweens(this);
                    egret.Tween.get(this).to({
                        y: this.row * LotteryCellRender.CELL_H
                    }, 4 * this.perDuration).call(this.changeToPause, this);
                    ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_CHANGE_STATE, false, false, {
                        col: this.col,
                        state: LotteryCellRender.STATE_FORCE_STOP
                    }));
                }
                else {
                    this.imgCell.texture = RES.getRes(Math.floor(Math.random() * 100 + 1) + "_head_png");
                }
                break;
            case LotteryCellRender.STATE_FORCE_STOP:
                var vo = ManagerLibrary.tblManager.getVo(StcCellVO.TBL_NAME, GameModel.totalResult[GameModel.currStep][this.getCellIndex()].id);
                this.imgCell.texture = RES.getRes(vo.icon + "_head_png");
                egret.Tween.removeTweens(this);
                egret.Tween.get(this).to({
                    y: this.row * LotteryCellRender.CELL_H
                }, (this.row + 1) * this.perDuration).call(this.changeToPause, this);
                break;
        }
    };
    LotteryCellRender.prototype.changeToPause = function () {
        this.labaState = LotteryCellRender.STATE_PAUSE;
    };
    LotteryCellRender.prototype.startRoll = function (e) {
        if (e === void 0) { e = null; }
        if (this.labaState != LotteryCellRender.STATE_PAUSE) {
            return;
        }
        egret.Tween.get(this, {
            loop: true
        }).to({
            y: LotteryCellRender.CELL_H * 3
        }, this.perDuration * (3 - this.row))
            .to({
            y: -LotteryCellRender.CELL_H
        }, 0)
            .call(this.checkChangeHandler, this)
            .to({
            y: this.row * LotteryCellRender.CELL_H
        }, (this.row + 1) * this.perDuration);
        this.labaState = LotteryCellRender.STATE_RUNNING;
    };
    LotteryCellRender.prototype.onEvtSlotStop = function (e) {
        if (e === void 0) { e = null; }
        if (this.labaState != LotteryCellRender.STATE_RUNNING)
            return;
        if (e.data.col == this.col) {
            this.labaState = LotteryCellRender.STATE_READY_STOP;
        }
    };
    LotteryCellRender.prototype.getCellIndex = function () {
        return this.row + this.col * 3;
    };
    LotteryCellRender.STATE_PAUSE = 0;
    LotteryCellRender.STATE_RUNNING = 1;
    LotteryCellRender.STATE_READY_STOP = 2;
    LotteryCellRender.STATE_FORCE_STOP = 4;
    LotteryCellRender.CELL_W = 108;
    LotteryCellRender.CELL_H = 107;
    return LotteryCellRender;
}(eui.Component));
__reflect(LotteryCellRender.prototype, "LotteryCellRender", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=LotteryCellRender.js.map