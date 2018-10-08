class PomeloService {
	private static _instance: PomeloService;

	public pomelo: PomeloForEgret.Pomelo;
	public constructor() {
		this.pomelo = new PomeloForEgret.Pomelo();
		this.pomelo.on(PomeloForEgret.Pomelo.EVENT_IO_ERROR, this.onPomeloIOErrorHandler);
		this.pomelo.init({
			host: '127.0.0.1',
			port: 3010
		}, this.onPomeloConnectSuccessHandler);
	}

	public static get INS(): PomeloService {
		if (PomeloService._instance == null) {
			PomeloService._instance = new PomeloService();
		}

		return PomeloService._instance;
	}

	private onPomeloConnectSuccessHandler() {
		console.log("Pomelo Connect Success...!!!");
	}

	private onPomeloIOErrorHandler(event) {
		console.error("Pomelo Error!", event);
	}
}