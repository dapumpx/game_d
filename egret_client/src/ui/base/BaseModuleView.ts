class BaseModuleView extends eui.Component {
	
	public mid:number;

	public constructor() 
	{
		super();
	}

	public setSkinName(strSkinName:string):void
	{
		this.addEventListener(egret.Event.COMPLETE,this.onSkinLoadComplete,this);
        this.skinName = "resource/eui_exml/" + strSkinName + ".exml";
	}

	public onSkinLoadComplete():void
	{
		console.log("skin load complete");
	}


}