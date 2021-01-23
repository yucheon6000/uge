
  


class Player extends GameObject {
	constructor() {
		super('Player', 'player');
		this.renderer = new AtlasRenderer(new Atlas('Game/NormalBoomAtlas.png', 3, 2));
		this.color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
		
		this.collider = new BoxCollider(new Vector2(30, 30));
		
		this.timer = 0;
	}
	
	awake() {
	  this.addComponent(this.collider);
		this.addComponent(this.renderer);
		//this.renderer.setManualRenderFunc(this.renderFunc)
	}
		
	update() {
		let dir = Vector2.zero;
		let moveSpeed = 700;
		if(UInput.inputKey('W')) {
			dir.add(Vector2.up);
		}
		if(UInput.inputKey('S')) {
			dir.add(Vector2.down);
		}
		if(UInput.inputKey('D')) {
			dir.add(Vector2.right);
		}
		if(UInput.inputKey('A')) {
			dir.add(Vector2.left);
		}
		
		this.timer += UTime.deltaTime;
		if(this.timer >= 0.3) {
		  this.renderer.setNextIndex();
		  this.timer = 0;
		}
// 		this.transform.rotation += 180 * UTime.deltaTime;

// 		this.transform.position.add(dir.normalized.mul(moveSpeed * UTime.deltaTime));	
	}
	
	renderFunc(gCtx, vCtx, gCvs, vCvs, self) {
		let rectSize = new Vector2(30, 30);
    
    let realPos = this.gameObject.transform.position;
    
    let targetPos = new Vector2(gCvs.width/2, gCvs.height/2); //0, 0
    // console.log(targetPos);
    targetPos.x += realPos.x;
    targetPos.y -= realPos.y;
    
    gCtx.save();
    gCtx.beginPath();
    gCtx.translate(targetPos.x, targetPos.y);
    gCtx.rotate(self.transform.rotation * Math.PI/180);
    gCtx.translate(-(rectSize.x/2), -(rectSize.y/2));
    
    gCtx.rect(0, 0, rectSize.x, rectSize.y);
    
		gCtx.fillStyle = self.gameObject.color;
		gCtx.fill();
    gCtx.stroke();	
    gCtx.restore();
    
	}
}

class PlayerManager extends GameObject {
  constructor() {
    super('PlayerManager', 'pm');
    this.fpsDiv = document.getElementById('fps');
  }
  
  update() {
    this.fpsDiv.textContent = parseInt(1 / UTime.deltaTime);
    
    if (UInput.keyDown['X']) {
      let newPlayer = Utills.newGameObject(Player, new Vector2(0, 0));
      newPlayer.renderer.renderIndex = parseInt(Math.random() * 100);
    }
    
    if(UInput.mouseState == MouseState.Down) {
      let newPlayer = Utills.newGameObject(Player, UInput.mousePosition);
    }
    
    if (UInput.touchState == TouchState.Down || UInput.touchState == TouchState.Move) {
      let newPlayer = Utills.newGameObject(Player, UInput.touchPosition);
    }
  }
}

let playerManager = Utills.newGameObject(PlayerManager);

let camera = Utills.newGameObject(Player);
camera.addComponent(new Camera());

camera.update = function() {
  let dir = Vector2.zero;
  let moveSpeed = 300;
  if (UInput.inputKey('I')) {
    dir.add(Vector2.up);
  }
  if (UInput.inputKey('K')) {
    dir.add(Vector2.down);
  }
  if (UInput.inputKey('L')) {
    dir.add(Vector2.right);
  }
  if (UInput.inputKey('J')) {
    dir.add(Vector2.left);
  }
  
  this.transform.position.add(dir.normalized.mul(moveSpeed * UTime.deltaTime));	
};

camera.renderFunc = function(gCtx, vCtx, gCvs, vCvs, self) {};


let initSample = {
  gameCanvasId: 'game-canvas',
  viewCanvasId: 'view-canvas',
  cameraGameObject: camera
};

GameManager.init(initSample); 
		

