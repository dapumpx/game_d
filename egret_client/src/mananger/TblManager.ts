class TblManager {
	public constructor() {
		this.objDictTbl = new Object();
	}

	private objDictTbl:Object;
	// private static _instace:TblManager = new TblManager();;
	// static get INS():TblManager
	// {
	// 	return TblManager._instace;
	// }

	public addTable<T extends TblBase>(c: {new(data:string): T; }, strTblName):void
	{
		if(!this.objDictTbl[strTblName])
		{
			console.log("Add table ...", strTblName);

			this.objDictTbl[strTblName] = new Object();
		}

		let strTbl:String = RES.getRes(strTblName);
		let arrRow = strTbl.split("\n");

		arrRow.forEach(row => {
			let tblVo = new c(row);
			this.objDictTbl[strTblName][tblVo.id] = tblVo;
		});
	}

	public getVo<T>(strTblName:string, id:number):T
	{
		if(this.objDictTbl[strTblName])
		{
			return this.objDictTbl[strTblName][id];
		}

		return null;
	}
}