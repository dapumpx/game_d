class PomeloService {
	private static _instance: PomeloService;

	public pomelo: PomeloForEgret.Pomelo;

	private connectorServerIP:string;
	private connectorServerPort:string;

	public constructor() {
		this.pomelo = new PomeloForEgret.Pomelo();
		this.pomelo.on(PomeloForEgret.Pomelo.EVENT_IO_ERROR, this.onPomeloIOErrorHandler);
		this.pomelo.on(PomeloForEgret.Pomelo.EVENT_HEART_BEAT_TIMEOUT, this.onPomeloHeartBeatTimeoutHandler);
		
		this.connnect();
	}

	private connnect():void
	{
		this.pomelo.init({
			host: '127.0.0.1',
			port: 3014
		}, this.onPomeloConnectGateSuccessHandler);
	}

	private onPomeloConnectGateSuccessHandler = () => 
	{
		this.pomelo.request("gate.gateHandler.queryEntry",{uid:123123}, this.onQueryEntryResult);
	}

	private onQueryEntryResult = (result) =>
	{
		console.log(result);

		this.connectorServerIP = result.host;
		this.connectorServerPort = result.port;

		this.pomelo.disconnect();
		this.pomelo.off();

		this.pomelo.init({
			host: result.host,
			port: result.port
		}, this.onPomeloConnectSuccessHandler);
	}

	public static get INS(): PomeloService {
		if (PomeloService._instance == null) {	
			PomeloService._instance = new PomeloService();
		}

		return PomeloService._instance;
	}

	private onPomeloHeartBeatTimeoutHandler = (event) => {
		console.log("Pomelo ready to reconnect...");

		this.connnect();
	}

	private onPomeloConnectSuccessHandler() {
		console.log("Pomelo Connect Success...!!!");
	}

	private onPomeloIOErrorHandler(event) {
		console.error("Pomelo Error!", event);
	}
}