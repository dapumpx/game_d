class GameModel {
	public constructor() {
	}

	public static readonly isFB:boolean = false;
	public static user_guid:string = "a7e35206-2c3e-4b7a-bafb-33e39b79a68e";

	public static lastResult:Array<any>;
	public static user_info:any;

	public static totalResult:Array<any>;
	public static rewardResult:Array<any>;
	public static coinResult:Array<any>;
	public static totalGet:number;

	public static currStep:number = 0;
	/**
	 * topRank => {id, coin}, myRank, rankTime
	 */
	public static rankInfo:any;	
}