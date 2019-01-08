class LotteryCellRender extends eui.Component implements eui.UIComponent {
	private row: number;
	private col: number;
	private isStop: boolean = true;

	public static readonly CELL_W: number = 108;
	public static readonly CELL_H: number = 107;

	public constructor(row, col) {
		super();

		this.row = row;
		this.col = col;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();

		let tt: egret.Texture = RES.getRes((Math.floor(Math.random() * 100) + 1).toString() + "_head_png");
		let img: egret.Bitmap = new egret.Bitmap(tt);
		this.addChild(img);

		//this.startRoll()
		this.addListener();
	}

	private addListener(): void {
		EventManager.Instance.addEventListener(EventManager.EVT_ON_SLOT_STOP, this.onEvtSlotStop, this);
		EventManager.Instance.addEventListener(EventManager.EVT_START_ROLL, this.startRoll, this);
	}

	public startRoll(e: egret.Event = null): void {
		if (!this.isStop) {
			return;
		}
		this.isStop = false;
		this.y = this.row * -LotteryCellRender.CELL_H + LotteryCellRender.CELL_H * 2;
		egret.Tween.get(this).wait(this.col * 100).call(this.resetAndPlay, this);

	}

	private doRoll(): void {
		egret.Tween.get(this).to({
			y: this.y + LotteryCellRender.CELL_H * 3
		}, 150).call(this.resetAndPlay, this);
	}

	private onEvtSlotStop(e: egret.Event = null): void {
		this.isStop = true;
	}

	public resetAndPlay(): void {
		if (!this.isStop) {
			this.y = this.row * -LotteryCellRender.CELL_H + LotteryCellRender.CELL_H * 2;
			this.doRoll();
		}
	}

}