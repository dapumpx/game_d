class ModuleManager {
	public constructor() {
	}

	private static _instace:ModuleManager = new ModuleManager();;
	static get INS():ModuleManager
	{
		return ModuleManager._instace;
	}
}