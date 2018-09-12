class ModuleManager {
	public constructor() {
	}

	public arrModule:number[] = [];
	public showModule(mid:number){
		if(this.isShow(mid))
		{
			this.closeModule(mid);
		}
		else
		{
			let view:BaseModuleView = ModuleHelper.getModule(mid);
			ManagerLibrary.layerMgr.addView(view);
			this.arrModule.push(view.mid);
		}
	}

	public closeModule(mid:number):void
	{
		if(this.isShow(mid))
		{

		}
	}

	public isShow(mid:number):boolean{
		return this.arrModule.indexOf(mid) >= 0;
	}
}