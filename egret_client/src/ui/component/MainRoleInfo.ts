class MainRoleInfo extends BaseComponent{
	public btn1:eui.Button;
	public btn2:eui.Button;
	
	public constructor() {
		super();

		this.setSkinName("comp/MainRoleInfoUI");
	}

	public onSkinLoadComplete():void
	{
		this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn1ClickHandler, this);
	}

	private onBtn1ClickHandler(e:egret.TouchEvent):void
	{
		var pomelo = new PomeloForEgret.Pomelo();

        pomelo.on(PomeloForEgret.Pomelo.EVENT_IO_ERROR, function(event){
            //错误处理
            console.error("error",event);
        });

		pomelo.init({
            host: '127.0.0.1',
            port: 3010
        }, function () {
            //连接成功执行函数
            pomelo.request("main.loginHandler.login","hello world" , function (result) {
                //消息回调
                console.log("request",result);
            });
        });
	}
}