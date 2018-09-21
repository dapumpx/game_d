class TestView extends BaseModuleView 
{
	public closeButton:eui.Button;
	public constructor() {
		super();

        this.setSkinName("TestUI");
	}

	public onSkinLoadComplete():void
	{
		super.onSkinLoadComplete();

		this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);

		var sp:egret.Sprite = new egret.Sprite();
		sp.graphics.beginFill(0x00ff00, 1);
		sp.graphics.drawRect(0, 0, this.width, this.height);
		sp.graphics.endFill();

		this.addChildAt(sp, 0);

		let mainRoleInfo:MainRoleInfo = new MainRoleInfo();
		this.addChild(mainRoleInfo);
		// console.log("x", this.x, "y", this.y);
	}



	private onTap(e:egret.TouchEvent):void
	{
		console.log("CLICK CLICK");
		
		super.doClose();
	}

}