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

	public removeView(mid:number):void
	{
		switch(ManagerLibrary.functionMgr.getFuncDataVo(mid).layerType)
		{
			case LayerType.POPUP:
				this.removeFromLayer(mid, this.layerPopup);
				break;

			case LayerType.SCENE:
				this.removeFromLayer(mid, this.layerScene);
				break;

			case LayerType.STATIC:
				this.removeFromLayer(mid, this.layerStatic);
				break;

			case LayerType.TOP:
				this.removeFromLayer(mid, this.layerTop);
				break;
		}
	}

	private removeFromLayer(mid:number, layer:egret.DisplayObjectContainer):void
	{
		for(let i:number = 0; i < layer.numChildren; i++)
		{
			let view:BaseModuleView = layer.getChildAt(i) as BaseModuleView;
			if(view && view.mid == mid)
			{
				layer.removeChild(view);
			}
		}
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