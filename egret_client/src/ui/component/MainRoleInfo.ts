class MainRoleInfo extends BaseComponent {
	public btnLink0:eui.Label;
	public btnLink1:eui.Label;

	public constructor() {
		super();

		this.setSkinName("comp/MainRoleInfoUI");
	}

	public onSkinLoadComplete(): void {
		this.btnLink0.textFlow = <Array<egret.ITextElement>>[ 
			{ text:"Click 1", style:{underline:true} }
		];

		this.btnLink1.textFlow = <Array<egret.ITextElement>>[ 
			{ text:"Click 2", style:{underline:true} }
		];

		this.btnLink0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn1ClickHandler, this);
		// this.btnLink1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn2ClickHandler, this);
	}

	private onBtn2ClickHandler(e:egret.TouchEvent):void
	{
		// PomeloService.INS.pomelo.request(this.txtRouter.text, this.txtParams.text, function (result) {
		// 	//消息回调
		// 	console.log("request", result);
		// });
	}

	private onBtn1ClickHandler(e: egret.TouchEvent): void {
		// var req = {};
		// req['user_name'] = "严立夤";
		// req['password'] = "严立夤";
		// PomeloService.INS.pomelo.request("main.loginHandler.login", req, function (result) {
		// 	//消息回调
		// 	console.log("request", result);	
		// });

		var req = {};
		req['user_id'] = "763b7e9f-02f1-43bc-a6f6-bf0730fcd439";
		PomeloService.INS.pomelo.request("main.guaJiHandler.view", req, function (result) {
			//消息回调
			console.log("request", result);	
		});
	}
}