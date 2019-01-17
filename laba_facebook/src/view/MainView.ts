class MainView extends eui.Component implements eui.UIComponent {

	public btnStart: eui.Button;
	public btnStop: eui.Button;

	private boxLottery: egret.Sprite;

	private shapeLine: egret.Shape;

	public constructor() {
		super();

		this.addEventListener(egret.Event.COMPLETE, this.onSkinLoadComplete, this);
		this.skinName = "resource/eui_exml/MainView.exml";
	}

	protected onSkinLoadComplete(e: egret.Event = null): void {

	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();

		this.height = egret.MainContext.instance.stage.stageHeight;
		this.width = egret.MainContext.instance.stage.stageWidth;

		this.boxLottery = new egret.Sprite();
		this.boxLottery.y = 100;
		this.boxLottery.x = 100;
		this.addChild(this.boxLottery);

		for (let i: number = 0; i < 4; i++) {
			for (let j: number = 0; j < 5; j++) {
				let cell: LotteryCellRender = new LotteryCellRender(i, j);
				cell.x = j * LotteryCellRender.CELL_W;
				cell.y = i * LotteryCellRender.CELL_H;
				this.boxLottery.addChild(cell);
			}
		}

		let m: egret.Shape = new egret.Shape();
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
		this.shapeLine.filters = [new egret.GlowFilter(0xffffff, 0.8)]
		this.addChild(this.shapeLine);

		this.addHandler();
	}

	private addHandler(): void {
		this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStartTapHandler, this);
		this.btnStop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStopTapHandler, this);
		ManagerLibrary.evtManager.addEventListener(EventManager.EVT_CHECK_CELL_STATE, this.loopCheck, this);
	}

	private onBtnStopTapHandler(e: egret.Event = null): void {
		egret.Tween.get(this).call(() => {
			ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_ON_SLOT_STOP, false, false, {
				col: 0
			}));
		}, this).wait(200).call(() => {
			ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_ON_SLOT_STOP, false, false, {
				col: 1
			}));
		}, this).wait(200).call(() => {
			ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_ON_SLOT_STOP, false, false, {
				col: 2
			}));
		}, this).wait(200).call(() => {
			ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_ON_SLOT_STOP, false, false, {
				col: 3
			}));
		}, this).wait(200).call(() => {
			ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_ON_SLOT_STOP, false, false, {
				col: 4
			}));
		}, this).call(this.loopCheck, this);
	}

	private loopCheck(): void {
		let loopCheckTween: egret.Tween = egret.Tween.get(this, {
			loop: true
		});
		loopCheckTween.wait(1000)
			.call(() => {
				if (this.checkIsAllStop()) {
					egret.Tween.removeTweens(this);
					this.checkReward();
				}
			});
	}

	private checkReward(): void {
		if (GameModel.currStep < GameModel.rewardResult.length) {
			let arrIndex: Array < number > = [];
			let arrLine: Array < any > = GameModel.rewardResult[GameModel.currStep];
			this.shapeLine.graphics.clear();
			this.shapeLine.graphics.lineStyle(4, 0xff0000);
			for (let i = 0; i < arrLine.length; i++) {
				for (let j = 0; j < arrLine[i].length; j++) {
					let cellObj = arrLine[i][j];
					if (arrIndex.indexOf(cellObj.index) == -1) {
						arrIndex.push(cellObj.index);
					}
					if (j == 0) {
						this.shapeLine.graphics.moveTo(
							(Math.floor(cellObj.index / 3) + 0.5) * LotteryCellRender.CELL_W,
							(cellObj.index % 3 + 0.5) * LotteryCellRender.CELL_H);
					} else {
						this.shapeLine.graphics.lineTo(
							(Math.floor(cellObj.index / 3) + 0.5) * LotteryCellRender.CELL_W,
							(cellObj.index % 3 + 0.5) * LotteryCellRender.CELL_H);
					}
				}
			}

			this.shakeCell(arrIndex);
		}
	}

	private shakeCell(arrIndex: Array < number > ): void {
		for (let i = 0; i < arrIndex.length; i++) {
			let cell: LotteryCellRender = this.getCellByIndex(arrIndex[i]);
			let cellTween: egret.Tween = egret.Tween.get(cell);
			for (let j = 0; j < 3; j++) {
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
	}

	private onShakeFinish(cell: LotteryCellRender): void {
		cell.row = -1;
		cell.y = -LotteryCellRender.CELL_H;
		cell.alpha = 1;
	}

	private updateNextStep(): void {
		for (let i = 14; i >= 0; i--) {
			let cell: LotteryCellRender = this.getCellByIndex(i);
			if (cell == null) {
				let CellIndex = i;
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
	}

	private getCellByIndex(index: number, isEmpty: boolean = false): LotteryCellRender {
		let cellCol: number = Math.floor(index / 3);
		let cellRow: number = index % 3;

		for (let i = 0; i < this.boxLottery.numChildren; i++) {
			let cell: LotteryCellRender = this.boxLottery.getChildAt(i) as LotteryCellRender;
			if (isEmpty) {
				if (cell.col == cellCol && cell.row == -1) {
					return cell;
				}
			} else {
				if (cell.col == cellCol && cell.row == cellRow) {
					return cell;
				}
			}
		}
		return null;
	}

	private checkIsAllStop(): boolean {
		let isStop: boolean = true;
		for (let i = 0; i < this.boxLottery.numChildren; i++) {
			let cell: LotteryCellRender = this.boxLottery.getChildAt(i) as LotteryCellRender;
			if (cell.labaState != LotteryCellRender.STATE_PAUSE) {
				isStop = false;
				break;
			}
		}
		return isStop;
	}

	private onBtnStartTapHandler(e: egret.Event = null): void {
		if (!this.checkIsAllStop()) return;

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
	}
}