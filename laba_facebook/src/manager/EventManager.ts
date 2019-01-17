class EventManager extends egret.EventDispatcher{
	public static readonly EVT_ON_SLOT_STOP:string = "EVT_ON_SLOT_STOP";
	public static readonly EVT_START_ROLL:string = "EVT_START_ROLL";
	public static readonly EVT_CHANGE_STATE:string = "EVT_CHANGE_STATE";
	public static readonly EVT_UPDATE_TO_NEXT_STEP:string = "EVT_UPDATE_TO_NEXT_STEP";
	public static readonly EVT_CHECK_CELL_STATE:string = "EVT_CHECK_CELL_STATE";
	
	public constructor() {
		super();
	}
}