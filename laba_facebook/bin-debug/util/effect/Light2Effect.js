var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LightEffect2 = (function () {
    function LightEffect2(item, type, parent) {
        this._item = item;
        this._parent = parent;
        RES.getResByUrl("resource/assets/lizi/" + type + ".png", function (texture) {
            this._texture = texture;
            this.create();
        }, this, RES.ResourceItem.TYPE_IMAGE);
        RES.getResByUrl("resource/assets/lizi/" + type + ".json", function (data) {
            this._config = data;
            this.create();
        }, this, RES.ResourceItem.TYPE_JSON);
    }
    LightEffect2.playEffect = function (displayObject, type, parent) {
        if (parent === void 0) { parent = null; }
        var effect = new LightEffect2(displayObject, type, parent);
    };
    LightEffect2.prototype.create = function () {
        if (this._texture && this._config) {
            var system = new particle.GravityParticleSystem(this._texture, this._config);
            this._parent.addChild(system);
            system.x = this._item.x;
            system.y = this._item.y;
            system.start();
            // console.log("emissionRate", system.emissionRate);
            // system.emissionRate = 5;
            var sx_1 = 0;
            var sy_1 = 0;
            egret.startTick(function (timeStamp) {
                // console.log(sx + " " + sy + " " + this._item.measuredWidth + " " + this._item.measuredHeight);
                if (sy_1 == 0 && sx_1 < this._item.width) {
                    sx_1 += 2;
                    system.emitterX = sx_1;
                }
                else if (sx_1 == this._item.width && sy_1 < this._item.height) {
                    sy_1 += 2;
                    system.emitterY = sy_1;
                }
                else if (sy_1 == this._item.height && sx_1 > 0) {
                    sx_1 -= 2;
                    system.emitterX = sx_1;
                }
                else {
                    sy_1 -= 2;
                    system.emitterY = sy_1;
                }
                system.emitterY = Math.min(system.emitterY, this._item.height);
                system.emitterX = Math.min(system.emitterX, this._item.width);
                system.emitterY = Math.max(system.emitterY, 0);
                system.emitterX = Math.max(system.emitterX, 0);
                sy_1 = system.emitterY;
                sx_1 = system.emitterX;
                return false;
            }, this);
        }
    };
    LightEffect2.TYPE_1 = "particle_pink_1";
    return LightEffect2;
}());
__reflect(LightEffect2.prototype, "LightEffect2");
//# sourceMappingURL=Light2Effect.js.map