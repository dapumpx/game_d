class LotteryCellRender extends eui.Component implements eui.UIComponent {
	private row: number;
	private col: number;
	private isStop: boolean;

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
	}

	private addListener(): void {
		EventManager.Instance.addEventListener(EventManager.EVT_ON_SLOT_STOP, this.onEvtSlotStop, this);
		EventManager.Instance.addEventListener(EventManager.EVT_START_ROLL, this.startRoll, this);
	}

	public startRoll(e: egret.Event = null): void {
		this.doRoll();
	}

	private doRoll(): void {
		egret.Tween.get(this).to({
			y: this.y + 300
		}, 300).call(this.resetPos, this);
	}

	private onEvtSlotStop(e: egret.Event = null): void {
		this.isStop = true;
	}

	public resetPos(): void {
		if (!this.isStop) {
			this.y -= 300;
			this.startRoll();
		}
	}

}