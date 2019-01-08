class EventManager extends egret.EventDispatcher{
	public static readonly EVT_ON_SLOT_STOP:string = "EVT_ON_SLOT_STOP";
	public static readonly EVT_START_ROLL:string = "EVT_START_ROLL";

	public constructor() {
		super();
	}

	private static _instance:EventManager;

	public static get Instance():EventManager
	{
		if(EventManager._instance == null)
		{
			EventManager._instance = new EventManager();
		}

		return EventManager._instance;
	}
}