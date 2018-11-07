class GameTimer extends BaseComponent
{
	private _gameTimer:eui.Label;
	private _startTs:number;

	public constructor() 
	{
		super();

		this._gameTimer = new eui.Label();
		this.addChild(this._gameTimer);
	}

	public setStartTime(ts:number):void
	{
		this._startTs = ts;

		TimerManager.doLoop(500, this.onTimerHandler, this);
	}

	private onTimerHandler():void
	{
		let s:number = new Date().getTime() - this._startTs;
		s = Math.floor(s / 1000);
		this._gameTimer.text = TimeUtil.toHSMString(s);
	}
}