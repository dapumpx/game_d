class FunctionManager {
	private dictMoldule:{[id:number]:FuncDataVo}
	public constructor() {
		this.init();
		// console.log(FunctionType);
	}

	public init():void {
		this.dictMoldule = {};

		this.dictMoldule[FunctionType.MAIN_LINE] = new FuncDataVo(FunctionType.MAIN_LINE, "", LayerType.SCENE);
		this.dictMoldule[FunctionType.TEST_WIN] = new FuncDataVo(FunctionType.TEST_WIN, "", LayerType.POPUP);
	}

	public getFuncDataVo(id:number):FuncDataVo
	{
		return this.dictMoldule[id];
	}

	// private static _instace:FunctionManager = new FunctionManager();;
	// static get INS():FunctionManager
	// {
	// 	return FunctionManager._instace;
	// }
}