class LayerManager {
	public constructor() {

	}

	private static _instace:LayerManager = new LayerManager();;
	static get INS():LayerManager
	{
		return LayerManager._instace;
	}

	public layerScene:egret.DisplayObjectContainer;
	public layerStatic:egret.DisplayObjectContainer;
	public layerPopup:egret.DisplayObjectContainer;
	public layerTop:egret.DisplayObjectContainer;

	public init(stage:egret.DisplayObjectContainer):void
	{
		this.layerScene = new egret.DisplayObjectContainer();
		stage.addChild(this.layerScene);

		this.layerStatic = new egret.DisplayObjectContainer();
		stage.addChild(this.layerStatic);

		this.layerPopup = new egret.DisplayObjectContainer();
		stage.addChild(this.layerPopup);

		this.layerTop = new egret.DisplayObjectContainer();
		stage.addChild(this.layerTop);
	}
}