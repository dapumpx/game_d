class TimerManager 
{
	private static _shape:egret.Shape;
	private static _currTimer:number = 0;
	private static _dictHandlers:Array<TimerHandler>;
	private static _timeout:number = 1000;
	private static _currFrame:number = 0;
	private static _count:number = 0;
	private static _pool:Array<TimerHandler>;
	public constructor() 
	{
		
	}

	public static init():void
	{
		TimerManager._shape = new egret.Shape();
		TimerManager._shape.addEventListener(egret.Event.ENTER_FRAME, TimerManager.onShapeEnterFrameHandler, null);
		TimerManager._dictHandlers = new Array<TimerHandler>();
		TimerManager._pool = new Array<TimerHandler>();
	}

	private static onShapeEnterFrameHandler(e:egret.Event):void
	{
		if(TimerManager._currTimer == 0)
		{
			TimerManager._currTimer = egret.getTimer();
			return;
		}

		let overT:number = egret.getTimer() - TimerManager._currTimer;
		if(overT > TimerManager._timeout)
		{
			TimerManager._currTimer = egret.getTimer();
			return;
		}
		
		for(let key in TimerManager._dictHandlers)
		{
			let handler:TimerHandler = TimerManager._dictHandlers[key];
			let t:number = handler.userFrame ? TimerManager._currFrame:TimerManager._currTimer;
			if(t >= handler.exeTime)
			{
				handler.repeat ? handler.exeTime += handler.delay : TimerManager.clearTimer(handler.method);
				handler.method.apply(handler.objThis, handler.args);
			}
		}

	}

	private static create(useFrame:Boolean, repeat:Boolean, delay:number, method:Function, objThis:any, args:Array<any> = null):void 
	{
		//先删除相同函数的计时
		TimerManager.clearTimer(method);
		//如果执行时间小于1，直接执行
		if (delay < 1) 
		{
			method.apply(objThis, args)
			return;
		}
		let handler:TimerHandler = TimerManager._pool.length > 0 ? TimerManager._pool.pop() : new TimerHandler();
		handler.userFrame = useFrame;
		handler.repeat = repeat;
		handler.delay = delay;
		handler.method = method;
		handler.args = args;
		handler.exeTime = delay + (useFrame ? TimerManager._currFrame : TimerManager._currTimer);
		handler.objThis = objThis;
		handler.randGUID();
		TimerManager._dictHandlers[handler.handlerId] = handler;
		TimerManager._count++;
	}

	public static clearTimer(method:Function):void 
	{
		var handler:TimerHandler = TimerManager.getHandlerByMethond(method);
		if (handler != null) 
		{
			delete TimerManager._dictHandlers[handler.handlerId];
			handler.clear();

			TimerManager._pool.push(handler);
			TimerManager._count--;
		}
	}
	
	private static getHandlerByMethond(method:Function):TimerHandler
	{
		TimerManager._dictHandlers.forEach(handler => 
		{
			if(handler.method == method)
			{
				return handler;
			}
		});

		return null;
	}

	/**定时重复执行*/
	public static doLoop(delay:number, method:Function, objThis:any, args:Array<any> = null):void 
	{
		TimerManager.create(false, true, delay, method, objThis, args);
	}

	private static getHandlerKeyByMethod(method:Function):string
	{
		TimerManager._dictHandlers.forEach(handler => 
		{
			if(handler.method == method)
			{
				return handler.handlerId;
			}
		});

		return "";
	}
	
}

class TimerHandler {
	/**执行间隔*/
	public delay:number;
	/**是否重复执行*/
	public repeat:Boolean;
	/**是否用帧率*/
	public userFrame:Boolean;
	/**执行时间*/
	public exeTime:number;
	/**处理方法*/
	public method:Function;
	/**参数*/
	public args:Array<any>;
	
	public handlerId:string;

	public objThis:any;

	public randGUID():void
	{
		this.handlerId = RUtil.uuidv4();
	}
	/**清理*/
	public clear():void 
	{
		this.method = null;
		this.args = null;
	}
}
