class MainView extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();

		this.skinName = "resource/eui_exml/MainView.exml";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();

		let box:egret.Sprite = new egret.Sprite();
		box.y = 300;
		box.x = 100;
		this.addChild(box);

		for (let i: number = 0; i < 6; i++) {
			for (let j: number = 0; j < 5; j++) {
				let cell:LotteryCellRender = new LotteryCellRender(i, j);
				cell.x = j * 100;
				cell.y = i * - 100 + 200;
				box.addChild(cell);
			}
		}

		let m:egret.Shape = new egret.Shape();
		m.graphics.beginFill(0, 1);
		m.graphics.drawRect(0, 0, 500, 300);
		m.graphics.endFill();

		m.x = 100;
		m.y = 300;

		box.mask = m;

		this.addChild(m);
	}

}