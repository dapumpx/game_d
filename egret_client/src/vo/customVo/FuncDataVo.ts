class FuncDataVo {
	public id:number;
	public assetName:string;
	public layerType:number;

	public constructor(_id:number, _assetName:string, _layerType:number) {
		this.id = _id;
		this.assetName = _assetName;
		this.layerType = _layerType;
	}
}