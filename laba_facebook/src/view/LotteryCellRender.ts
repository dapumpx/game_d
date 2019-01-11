class LotteryCellRender extends eui.Component implements eui.UIComponent {
	private row: number;
	private col: number;
	private isStop: boolean = true;

	public static readonly CELL_W: number = 108;
	public static readonly CELL_H: number = 107;

	private imgCell:egret.Bitmap;

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

		this.imgCell = new egret.Bitmap(RES.getRes((Math.floor(Math.random() * 100) + 1).toString() + "_head_png"));
		this.addChild(this.imgCell);

		//this.startRoll()
		this.addListener();

		egret.Tween.get(this).wait(Math.random() * 1000).call(() => {
			LightEffect.playEffect(this);
		})
	}

	private addListener(): void {
		ManagerLibrary.evtManager.addEventListener(EventManager.EVT_ON_SLOT_STOP, this.onEvtSlotStop, this);
		ManagerLibrary.evtManager.addEventListener(EventManager.EVT_START_ROLL, this.startRoll, this);
	}

	public startRoll(e: egret.Event = null): void {
		if (!this.isStop) {
			return;
		}
		egret.stopTick(this.onRoll, this);
		this.isStop = false;
		this.isForceStop = false;
		this.y = this.row * LotteryCellRender.CELL_H;
		egret.Tween.get(this).wait(this.col * 100).call(this.doRoll_1, this);

	}

	private doRoll_1(): void {
		egret.startTick(this.onRoll, this);
	}

	private isForceStop: boolean = false;
	private speed = 32;
	private onRoll(ts: number): boolean {
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
			} else if (this.isStop) {
				this.isForceStop = true;
			}
		}

		return false;
	}

	private onEvtSlotStop(e: egret.Event = null): void {
		if (e.data.col == this.col) {
			this.isStop = true;
		}
	}

}