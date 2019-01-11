var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LightEffect = (function () {
    function LightEffect() {
    }
    LightEffect.playEffect = function (obj) {
        var cFilter = new egret.CustomFilter(LightEffect.vertexSrc, LightEffect.fragmentSrc1, {
            customUniform: 0
        });
        if (!LightEffect.isInit) {
            egret.MainContext.instance.stage.addEventListener(egret.Event.ENTER_FRAME, LightEffect.onEnterFrameHandler, null);
            LightEffect.isInit = true;
        }
        obj.filters = [cFilter];
        LightEffect.effectObjList.push(cFilter);
    };
    LightEffect.onEnterFrameHandler = function (e) {
        if (e === void 0) { e = null; }
        LightEffect.effectObjList.forEach(function (item) {
            item.uniforms.customUniform += 0.1;
            if (item.uniforms.customUniform > Math.PI * 2) {
                item.uniforms.customUniform = 0.0;
            }
        });
    };
    LightEffect.vertexSrc = "attribute vec2 aVertexPositionCC;\n" +
        "attribute vec2 aTextureCoord;\n" +
        "attribute vec2 aColor;\n" +
        "uniform vec2 projectionVector;\n" +
        "varying vec2 vTextureCoord;\n" +
        "varying vec4 vColor;\n" +
        "const vec2 center = vec2(-1.0, 1.0);\n" +
        "void main(void) {\n" +
        "	gl_Position = vec4((aVertexPositionCC / projectionVector) + center	, 0.0, 1.0);\n" +
        //"   gl_Position = vec4( (aVertexPositionCC / projectionVector) + center , 0.0, 1.0);\n" +
        "   vTextureCoord = aTextureCoord;\n" +
        "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
        "}";
    LightEffect.fragmentSrc1 = "precision lowp float;\n" +
        "varying vec2 vTextureCoord;\n" +
        "varying vec4 vColor;\n" +
        "uniform sampler2D uSampler;\n" +
        "uniform float customUniform;\n" +
        "void main(void) {\n" +
        "vec2 uvs = vTextureCoord.xy;\n" +
        "vec4 fg = texture2D(uSampler, vTextureCoord);\n" +
        "fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.2;\n" +
        "gl_FragColor = fg * vColor;\n" +
        "}";
    LightEffect.isInit = false;
    LightEffect.effectObjList = [];
    return LightEffect;
}());
__reflect(LightEffect.prototype, "LightEffect");
//# sourceMappingURL=LightEffect.js.map