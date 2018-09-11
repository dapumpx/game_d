class FunctionManager {
	public constructor() {
	}

	private static _instace:FunctionManager = new FunctionManager();;
	static get INS():FunctionManager
	{
		return FunctionManager._instace;
	}
}