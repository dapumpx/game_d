class ManagerLibrary {
	public static moduleMgr:ModuleManager;
	public static functionMgr:FunctionManager;
	public static layerMgr:LayerManager;
	public static tblMgr:TblManager;
	
	public constructor() {
	}

	public static init()
	{
		ManagerLibrary.moduleMgr = new ModuleManager();
		ManagerLibrary.functionMgr = new FunctionManager();
		ManagerLibrary.layerMgr = new LayerManager();
		ManagerLibrary.tblMgr = new TblManager();
	}
}