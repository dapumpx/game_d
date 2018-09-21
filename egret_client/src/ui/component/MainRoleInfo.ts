class MainRoleInfo extends BaseComponent{
	public btn1:eui.Button;
	public btn2:eui.Button;
	
	public constructor() {
		super();

		this.setSkinName("comp/MainRoleInfoUI");
	}

	public onSkinLoadComplete():void
	{
		this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn1ClickHandler, this);
	}

	private onBtn1ClickHandler(e:egret.TouchEvent):void
	{

	}
}