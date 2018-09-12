class TestView extends BaseModuleView 
{
	public btnOk:eui.Button;
	public constructor() {
		super();

        this.setSkinName("TestUI");
	}

	public onSkinLoadComplete():void
	{
		console.log(this.btnOk);
	}

}