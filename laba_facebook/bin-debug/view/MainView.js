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
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.COMPLETE, _this.onSkinLoadComplete, _this);
        _this.skinName = "resource/eui_exml/MainView.exml";
        return _this;
    }
    MainView.prototype.onSkinLoadComplete = function (e) {
        if (e === void 0) { e = null; }
    };
    MainView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MainView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width = egret.MainContext.instance.stage.stageWidth;
        this.boxLottery = new egret.Sprite();
        this.boxLottery.y = 100;
        this.boxLottery.x = 100;
        this.addChild(this.boxLottery);
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 5; j++) {
                var cell = new LotteryCellRender(i, j);
                cell.x = j * LotteryCellRender.CELL_W;
                cell.y = i * LotteryCellRender.CELL_H;
                this.boxLottery.addChild(cell);
            }
        }
        var m = new egret.Shape();
        m.graphics.beginFill(0, 1);
        m.graphics.drawRect(0, 0, LotteryCellRender.CELL_W * 5, LotteryCellRender.CELL_H * 3);
        m.graphics.endFill();
        m.x = 100;
        m.y = 100;
        this.boxLottery.mask = m;
        this.addChild(m);
        this.shapeLine = new egret.Shape();
        this.shapeLine.x = 100;
        this.shapeLine.y = 100;
        this.shapeLine.filters = [new egret.GlowFilter(0xffffff, 0.8)];
        this.addChild(this.shapeLine);
        this.addHandler();
    };
    MainView.prototype.addHandler = function () {
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStartTapHandler, this);
        this.btnStop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStopTapHandler, this);
        ManagerLibrary.evtManager.addEventListener(EventManager.EVT_CHECK_CELL_STATE, this.loopCheck, this);
    };
    MainView.prototype.onBtnStopTapHandler = function (e) {
        if (e === void 0) { e = null; }
        egret.Tween.get(this).call(function () {
            ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_ON_SLOT_STOP, false, false, {
                col: 0
            }));
        }, this).wait(200).call(function () {
            ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_ON_SLOT_STOP, false, false, {
                col: 1
            }));
        }, this).wait(200).call(function () {
            ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_ON_SLOT_STOP, false, false, {
                col: 2
            }));
        }, this).wait(200).call(function () {
            ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_ON_SLOT_STOP, false, false, {
                col: 3
            }));
        }, this).wait(200).call(function () {
            ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_ON_SLOT_STOP, false, false, {
                col: 4
            }));
        }, this).call(this.loopCheck, this);
    };
    MainView.prototype.loopCheck = function () {
        var _this = this;
        var loopCheckTween = egret.Tween.get(this, {
            loop: true
        });
        loopCheckTween.wait(1000)
            .call(function () {
            if (_this.checkIsAllStop()) {
                egret.Tween.removeTweens(_this);
                _this.checkReward();
            }
        });
    };
    MainView.prototype.checkReward = function () {
        if (GameModel.currStep < GameModel.rewardResult.length) {
            var arrIndex = [];
            var arrLine = GameModel.rewardResult[GameModel.currStep];
            this.shapeLine.graphics.clear();
            this.shapeLine.graphics.lineStyle(4, 0xff0000);
            for (var i = 0; i < arrLine.length; i++) {
                for (var j = 0; j < arrLine[i].length; j++) {
                    var cellObj = arrLine[i][j];
                    if (arrIndex.indexOf(cellObj.index) == -1) {
                        arrIndex.push(cellObj.index);
                    }
                    if (j == 0) {
                        this.shapeLine.graphics.moveTo((Math.floor(cellObj.index / 3) + 0.5) * LotteryCellRender.CELL_W, (cellObj.index % 3 + 0.5) * LotteryCellRender.CELL_H);
                    }
                    else {
                        this.shapeLine.graphics.lineTo((Math.floor(cellObj.index / 3) + 0.5) * LotteryCellRender.CELL_W, (cellObj.index % 3 + 0.5) * LotteryCellRender.CELL_H);
                    }
                }
            }
            this.shakeCell(arrIndex);
        }
    };
    MainView.prototype.shakeCell = function (arrIndex) {
        for (var i = 0; i < arrIndex.length; i++) {
            var cell = this.getCellByIndex(arrIndex[i]);
            var cellTween = egret.Tween.get(cell);
            for (var j = 0; j < 3; j++) {
                cellTween = cellTween.to({
                    alpha: 0
                }, 200).to({
                    alpha: 1
                }, 200);
            }
            cellTween.to({
                alpha: 0
            }, 200).call(this.onShakeFinish, this, [cell]);
        }
        egret.Tween.get(this).wait(1500).call(this.updateNextStep, this);
    };
    MainView.prototype.onShakeFinish = function (cell) {
        cell.row = -1;
        cell.y = -LotteryCellRender.CELL_H;
        cell.alpha = 1;
    };
    MainView.prototype.updateNextStep = function () {
        for (var i = 14; i >= 0; i--) {
            var cell = this.getCellByIndex(i);
            if (cell == null) {
                var CellIndex = i;
                while (true) {
                    if (CellIndex % 3 == 0) {
                        cell = this.getCellByIndex(i, true);
                        cell.row = i % 3;
                        if ((i + 1) % 3 != 0 && this.getCellByIndex(i + 1).y < 0)
                            cell.y = LotteryCellRender.CELL_H * -2;
                        if ((i + 2) % 3 != 0 && this.getCellByIndex(i + 2).y < 0)
                            cell.y = LotteryCellRender.CELL_H * -3;
                        break;
                    }
                    CellIndex--;
                    cell = this.getCellByIndex(CellIndex);
                    if (cell != null) {
                        cell.row = i % 3;
                        break;
                    }
                }
            }
        }
        this.shapeLine.graphics.clear();
        GameModel.currStep++;
        ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_UPDATE_TO_NEXT_STEP));
    };
    MainView.prototype.getCellByIndex = function (index, isEmpty) {
        if (isEmpty === void 0) { isEmpty = false; }
        var cellCol = Math.floor(index / 3);
        var cellRow = index % 3;
        for (var i = 0; i < this.boxLottery.numChildren; i++) {
            var cell = this.boxLottery.getChildAt(i);
            if (isEmpty) {
                if (cell.col == cellCol && cell.row == -1) {
                    return cell;
                }
            }
            else {
                if (cell.col == cellCol && cell.row == cellRow) {
                    return cell;
                }
            }
        }
        return null;
    };
    MainView.prototype.checkIsAllStop = function () {
        var isStop = true;
        for (var i = 0; i < this.boxLottery.numChildren; i++) {
            var cell = this.boxLottery.getChildAt(i);
            if (cell.labaState != LotteryCellRender.STATE_PAUSE) {
                isStop = false;
                break;
            }
        }
        return isStop;
    };
    MainView.prototype.onBtnStartTapHandler = function (e) {
        if (e === void 0) { e = null; }
        if (!this.checkIsAllStop())
            return;
        PomeloService.INS.pomelo.request(CMD.LABA_MAIN_LA, {
            userId: GameModel.user_guid
        }, function (result) {
            //消息回调
            console.log("request", result);
            this.shapeLine.graphics.clear();
            GameModel.lastResult = result.info;
            GameModel.user_info = result.user;
            GameModel.totalResult = result.info.totalResult;
            GameModel.rewardResult = result.info.rewardResult;
            GameModel.coinResult = result.info.coinResult;
            GameModel.totalGet = result.info.totalGet;
            GameModel.rankInfo = result.rankInfo;
            GameModel.currStep = 0;
            ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_START_ROLL));
            console.log("start roll");
        }, this);
    };
    return MainView;
}(eui.Component));
__reflect(MainView.prototype, "MainView", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=MainView.js.map