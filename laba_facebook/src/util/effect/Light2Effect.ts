class LightEffect2 {
    public static readonly TYPE_1: string = "particle_pink_1";

    public constructor(item: egret.DisplayObject, type: string, parent: egret.DisplayObjectContainer) {
        this._item = item;
        this._parent = parent;
        RES.getResByUrl("resource/assets/lizi/" + type + ".png", function (texture: egret.Texture): void {
            this._texture = texture;
            this.create();
        }, this, RES.ResourceItem.TYPE_IMAGE);
        RES.getResByUrl("resource/assets/lizi/" + type + ".json", function (data: any): void {
            this._config = data;

            this.create();
        }, this, RES.ResourceItem.TYPE_JSON);
    }

    public static playEffect(displayObject: egret.DisplayObject, type: string, parent: egret.DisplayObjectContainer = null) {
        let effect: LightEffect2 = new LightEffect2(displayObject, type, parent);

    }

    private _item: egret.DisplayObject;
    private _texture: egret.Texture;
    private _config: any;
    private _parent: egret.DisplayObjectContainer;

    private create(): void {
        if (this._texture && this._config) {
            var system = new particle.GravityParticleSystem(this._texture, this._config);
            this._parent.addChild(system);
            system.x = this._item.x;
            system.y = this._item.y;
            system.start();
            // console.log("emissionRate", system.emissionRate);
            // system.emissionRate = 5;

            let sx: number = 0;
            let sy: number = 0;
            egret.startTick(function (timeStamp: number): boolean {
                // console.log(sx + " " + sy + " " + this._item.measuredWidth + " " + this._item.measuredHeight);
                if (sy == 0 && sx < this._item.width) {
                    sx += 2;
                    system.emitterX = sx;
                } else if (sx == this._item.width && sy < this._item.height) {
                    sy += 2;
                    system.emitterY = sy;
                } else if (sy == this._item.height && sx > 0) {
                    sx -= 2;
                    system.emitterX = sx;
                } else {
                    sy -= 2;
                    system.emitterY = sy;
                }

                system.emitterY = Math.min(system.emitterY, this._item.height);
                system.emitterX = Math.min(system.emitterX, this._item.width);
                system.emitterY = Math.max(system.emitterY, 0);
                system.emitterX = Math.max(system.emitterX, 0);

                sy = system.emitterY;
                sx = system.emitterX;

                return false;
            }, this);
        }
    }
}