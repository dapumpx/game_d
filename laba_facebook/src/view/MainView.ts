class MainView extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();

		this.skinName = "resource/eui_exml/MainView.exml";
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();

		
	}
	
}