class LayerManager {
	public constructor() {
	
	}

	// private static _instace:LayerManager = new LayerManager();;
	// static get INS():LayerManager
	// {
	// 	return LayerManager._instace;
	// }

	public layerScene:LayerBase;
	public layerStatic:LayerBase;
	public layerPopup:LayerBase;
	public layerTop:LayerBase;

	public init(stage:egret.DisplayObjectContainer):void
	{
		this.layerScene = new LayerBase();
		stage.addChild(this.layerScene);

		this.layerStatic = new LayerBase();
		stage.addChild(this.layerStatic);

		this.layerPopup = new LayerBase();
		stage.addChild(this.layerPopup);

		this.layerTop = new LayerBase();
		stage.addChild(this.layerTop);
	}

	public addView(view:BaseModuleView):void
	{
		switch(ManagerLibrary.functionMgr.getFuncDataVo(view.mid).layerType)
		{
			case LayerType.POPUP:
				this.layerPopup.addChild(view);
				break;

			case LayerType.SCENE:
				this.layerScene.addChild(view);
				break;

			case LayerType.STATIC:
				this.layerStatic.addChild(view);
				break;

			case LayerType.TOP:
				this.layerTop.addChild(view);
				break;
		}
	}
}