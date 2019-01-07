class LotteryCellRender extends eui.Component implements  eui.UIComponent {
	private row:number;
	private col:number;

	public constructor(row, col) {
		super();

		this.row = row;
		this.col = col;
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();

		let tt:egret.Texture = RES.getRes( (Math.floor(Math.random() * 100) + 1).toString() + "_head_png");
		let img:egret.Bitmap = new egret.Bitmap(tt);
		this.addChild(img);

		this.startRoll()
	}

	public startRoll():void
	{
		egret.Tween.get(this).to({y:this.y + 300}, 300).call(this.resetPos, this);
	}

	public resetPos():void
	{
		this.y -= 300;
		this.startRoll();
	}
	
}