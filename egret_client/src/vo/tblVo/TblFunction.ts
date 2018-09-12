class TblFunction extends TblBase {
	public id: number;
	public static TBL_NAME: string = "tbl_function_csv";

	public name: string;
	public openLevel: number;

	public constructor(data: string) {
		super();

		let arrData = data.split(",");

		this.id = Number(arrData[0]);
		this.name = arrData[1];
		this.openLevel = Number(arrData[2]);
	}

	public static getVo(id: number): TblFunction {
		return ManagerLibrary.tblMgr.getVo < TblFunction > (TblFunction.TBL_NAME, id);
	}
}