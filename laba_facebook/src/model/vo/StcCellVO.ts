class StcCellVO extends TblBase {
	public static TBL_NAME: string = "cell";

	public name:string;
	public probability:number;
	public icon:string;
	public type:number;
	public return_ratio:number;

	public constructor(data:Array<any>) {
		super();

		this.id = data[0];
		this.name = data[1];
		this.probability = data[2];
		this.icon = data[3];
		this.type = data[4];
		this.return_ratio = data[5];

		console.log(this);
	}
}