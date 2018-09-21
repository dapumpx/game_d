class BaseModuleView extends BaseComponent {
	
	public mid:number;

	public constructor() 
	{
		super();
	}

	/*
	public setSkinName(strSkinName:string):void
	{
		this.addEventListener(egret.Event.COMPLETE,this.onSkinLoadComplete,this);
        this.skinName = "resource/eui_exml/" + strSkinName + ".exml";
	}
	*/

	public onSkinLoadComplete():void
	{
		super.onSkinLoadComplete();

		//this.x = (egret.MainContext.instance.stage.stageWidth - this.width) * 0.5;
		//this.y = (egret.MainContext.instance.stage.stageHeight - this.height) * 0.5;

		this.height = egret.MainContext.instance.stage.stageHeight;
		this.width = egret.MainContext.instance.stage.stageWidth;

		// console.log(egret.MainContext.instance.stage.width, (egret.MainContext.instance.stage.width - this.width) * 0.5)
		// console.log("skin load complete");
	}

	public doClose():void
	{
		ManagerLibrary.moduleMgr.closeModule(this.mid);
	}

	


}