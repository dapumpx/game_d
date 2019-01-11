class ManagerLibrary {
	// public static moduleMgr:ModuleManager;
	// public static functionMgr:FunctionManager;
	// public static layerMgr:LayerManager;
	public static tblManager:TblManager;
    public static evtManager:EventManager;
	
	public constructor() {
	}

	public static init()
	{
		ManagerLibrary.tblManager = new TblManager();
        ManagerLibrary.evtManager = new EventManager();
	}
}