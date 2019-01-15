class MainView extends eui.Component implements eui.UIComponent {

	public btnStart: eui.Button;
	public btnStop: eui.Button;

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

		let box: egret.Sprite = new egret.Sprite();
		box.y = 100;
		box.x = 100;
		this.addChild(box);

		for (let i: number = 0; i < 4; i++) {
			for (let j: number = 0; j < 5; j++) {
				let cell: LotteryCellRender = new LotteryCellRender(i, j);
				cell.x = j * LotteryCellRender.CELL_W;
				cell.y = i * LotteryCellRender.CELL_H;
				box.addChild(cell);
			}
		}

		let m: egret.Shape = new egret.Shape();
		m.graphics.beginFill(0, 1);
		m.graphics.drawRect(0, 0, LotteryCellRender.CELL_W * 5, LotteryCellRender.CELL_H * 3);
		m.graphics.endFill();

		m.x = 100;
		m.y = 100;

		box.mask = m;

		this.addChild(m);

		this.addHandler();
	}

	private addHandler(): void {
		this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStartTapHandler, this);
		this.btnStop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStopTapHandler, this);
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
		}, this)
	}

	private onBtnStartTapHandler(e: egret.Event = null): void {
		PomeloService.INS.pomelo.request(CMD.LABA_MAIN_LA, {
			userId: GameModel.user_guid
		}, function (result) {
			//消息回调
			console.log("request", result);
			GameModel.lastResult = result.info;
			GameModel.user_info = result.user;

			ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_START_ROLL));

			console.log("start roll");
		}, this);
	}
}