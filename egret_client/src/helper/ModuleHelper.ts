class ModuleHelper {
	public constructor() {
	}

	public static getModule(mid:number):BaseModuleView
	{
		let moduleView:BaseModuleView;
		switch(mid)
		{
			case FunctionType.TEST_WIN:
				moduleView = new TestView();
				break;
		}

		if(moduleView)
		{
			moduleView.mid = mid;
		}

		return moduleView;
	}
}