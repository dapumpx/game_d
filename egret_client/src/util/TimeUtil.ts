class TimeUtil {
	public constructor() {
	}

	public static toHSMString(s:number):string
	{
		var hstr:string 	= 	Math.floor(s / 3600).toString();
		var sstr:string		=	Math.floor((s % 3600) / 60).toString();
		var mstr:string		=	(s % 60).toString();
		hstr = TimeUtil.fixStrLen(hstr, 2);
		sstr = TimeUtil.fixStrLen(sstr, 2);
		mstr = TimeUtil.fixStrLen(mstr, 2);
		return hstr + ":" + sstr + ":" + mstr;
	}

	private static fixStrLen(s:string, fixLen:number, flag:string = "0", isBefore:Boolean = true):string
	{
		while(s.length < fixLen)
		{
			if (isBefore)
			{
				s = flag + s;
			}
			else
			{
				s += flag;
			}
		}
		return s;
	}
}