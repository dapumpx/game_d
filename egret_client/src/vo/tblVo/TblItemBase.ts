class TblItemBase extends TblBase {
	public static TBL_NAME: string = "tbl_item_base_csv";

	public id: number;
	public name: string;
	public quality: number;

	public constructor(data: string) {
		super();
		let arrData = data.split(",");
		this.id = Number(arrData[0]);
		this.name = arrData[1];
		this.quality = Number(arrData[2]);
	}

	public static getVo(id: number): TblItemBase {
		return ManagerLibrary.tblMgr.getVo < TblItemBase > (TblItemBase.TBL_NAME, id);
	}
}