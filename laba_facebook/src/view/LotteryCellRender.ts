class LotteryCellRender extends eui.Component implements eui.UIComponent {
	public row: number;
	public col: number;
	public labaState: number = 0; //0:stop 1:running 2:ready 3:stop 4:force stop

	public static readonly STATE_PAUSE: number = 0;
	public static readonly STATE_RUNNING: number = 1;
	public static readonly STATE_READY_STOP: number = 2;
	public static readonly STATE_FORCE_STOP: number = 4;

	public static readonly CELL_W: number = 108;
	public static readonly CELL_H: number = 107;

	private imgCell: egret.Bitmap;

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
		ManagerLibrary.evtManager.addEventListener(EventManager.EVT_CHANGE_STATE, this.changeState, this);
		ManagerLibrary.evtManager.addEventListener(EventManager.EVT_UPDATE_TO_NEXT_STEP,this.onUpdateToNextStep, this)
	}

	public onUpdateToNextStep(e:egret.Event):void{
		if(this.row == 3) return;
		//console.log("row: " + this.row + ", col: " + this.col, ", step: " + GameModel.currStep);
		//console.log(GameModel.totalResult[GameModel.currStep])
		let vo: StcCellVO = ManagerLibrary.tblManager.getVo < StcCellVO > (StcCellVO.TBL_NAME, GameModel.totalResult[GameModel.currStep][this.getCellIndex()].id);
		this.imgCell.texture = RES.getRes(vo.icon + "_head_png");

		let oldRow = Math.round(this.y / LotteryCellRender.CELL_H);

		if(oldRow != this.row)
		{
			this.labaState = LotteryCellRender.STATE_RUNNING;
			egret.Tween.get(this).to({y:this.row * LotteryCellRender.CELL_H}, (this.row - oldRow) * this.perDuration * 2)
				.call(()=>{
					this.labaState = LotteryCellRender.STATE_PAUSE;
					ManagerLibrary.evtManager.dispatchEvent(new egret.Event(EventManager.EVT_CHECK_CELL_STATE));
				}, this)
		}
	}

	public changeState(e: egret.Event): void {
		if (this.labaState == LotteryCellRender.STATE_PAUSE) return;
		if (e.data.col == this.col) {
			this.labaState = e.data.state;
		}
	}
	private perDuration:number = 50;
	public checkChangeHandler(): void {
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
				} else {
					this.imgCell.texture = RES.getRes(Math.floor(Math.random() * 100 + 1) + "_head_png");
				}
				break;
			case LotteryCellRender.STATE_FORCE_STOP:
				let vo: StcCellVO = ManagerLibrary.tblManager.getVo < StcCellVO > (StcCellVO.TBL_NAME, GameModel.totalResult[GameModel.currStep][this.getCellIndex()].id);
				this.imgCell.texture = RES.getRes(vo.icon + "_head_png");
				egret.Tween.removeTweens(this);
				egret.Tween.get(this).to({
					y: this.row * LotteryCellRender.CELL_H
				}, (this.row + 1) * this.perDuration).call(this.changeToPause, this);
				break;
		}
	}

	public changeToPause() {
		this.labaState = LotteryCellRender.STATE_PAUSE;
	}

	public startRoll(e: egret.Event = null): void {
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
	}

	private onEvtSlotStop(e: egret.Event = null): void {
		if (this.labaState != LotteryCellRender.STATE_RUNNING) return;
		if (e.data.col == this.col) {
			this.labaState = LotteryCellRender.STATE_READY_STOP;
		}
	}

	private getCellIndex(): number {
		return this.row + this.col * 3;
	}

}