let initSample = {
      gameCanvasId: 'game-canvas',
      viewCanvasId: 'view-canvas'
    };
  
GameManager.init(initSample); 

class Player extends GameObject {
	constructor() {
		super('Player', 'player');
		this.renderer = new ManualRenderer();
		this.color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
	}
	
	awake() {
		this.addComponent(this.renderer);
		this.renderer.setManualRenderFunc(this.renderFunc)
	}
		
	update() {
		let dir = Vector2.zero;
		let moveSpeed = 700;
		if(UInput.inputKey('w')) {
			dir.add(Vector2.up);
		}
		if(UInput.inputKey('s')) {
			dir.add(Vector2.down);
		}
		if(UInput.inputKey('d')) {
			dir.add(Vector2.right);
		}
		if(UInput.inputKey('a')) {
			dir.add(Vector2.left);
		}

		this.transform.position.add(dir.normalized.mul(moveSpeed * UTime.deltaTime));	
		
		if(UInput.keyDown['x']) {
			let newPlayer = Utills.newGameObject(Player, new Vector2(0,0));
			newPlayer.renderer.renderIndex = parseInt( Math.random() * 100);
		}
	}
	
	renderFunc(gCtx, vCtx, gCvs, vCvs, self) {
		let rectSize = new Vector2(100, 100);
    
    let realPos = this.gameObject.transform.position;
    
    let targetPos = new Vector2(gCvs.width/2, gCvs.height/2); //0, 0
    // console.log(targetPos);
    targetPos.x += realPos.x;
    targetPos.x -= rectSize.x/2;
    targetPos.y -= realPos.y;
    targetPos.y -= rectSize.y/2;
    
    gCtx.beginPath();
    gCtx.rect(targetPos.x, targetPos.y, rectSize.x, rectSize.y);
		gCtx.fillStyle = self.color;
		gCtx.fill();
    gCtx.stroke();		
	}
}

let player = Utills.newGameObject(Player);


