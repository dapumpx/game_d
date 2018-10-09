class MainRoleInfo extends BaseComponent {
	public btn1: eui.Button;
	public btn2: eui.Button;

	public txtRouter:eui.TextInput;
	public txtParams:eui.TextInput;

	public constructor() {
		super();

		this.setSkinName("comp/MainRoleInfoUI");
	}

	public onSkinLoadComplete(): void {
		this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn1ClickHandler, this);
		this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn2ClickHandler, this);
	}

	private onBtn2ClickHandler(e:egret.TouchEvent):void
	{
		PomeloService.INS.pomelo.request(this.txtRouter.text, this.txtParams.text, function (result) {
			//消息回调
			console.log("request", result);
		});
	}

	private onBtn1ClickHandler(e: egret.TouchEvent): void {
		PomeloService.INS.pomelo.request("main.loginHandler.login", "hello world", function (result) {
			//消息回调
			console.log("request", result);
		});
	}
}