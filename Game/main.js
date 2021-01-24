let ataa = new Atlas('Game/NormalBoomAtlas.png',3,2);

class Player extends GameObject {
	constructor() {
		super('Player', 'player');
		this.renderer = new AtlasRenderer(ataa);
		this.color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
		
		this.collider = new BoxCollider(new Vector2(30, 30));
		
		this.timer = 0;
		this.zommOut = true; // 0: ZoomOut, 1: ZoomIn
		
		// this.shadow = Utills.newGameObject(GameObject, this.transform.position);
		// this.shadowRenderer = new SpriteRenderer(new Sprite('Game/BoomShadow.png'), -1);
		// this.shadow.transform.scale = new Vector2(0.8, 0.8);
		// this.shadowScale = this.shadow.transform.scale;
		// this.shadow.addComponent(this.shadowRenderer);
		
		// Jump
		this.virtualPosition = new Vector2(0,0);
		this.velocity = new Vector2(0, 0);
		this.gravity = -1000;
		this.jumpPower = 500;
		this.jumpCount = 0;
		
		this.maxY = 0;
		this.lastX = 0;
		this.moveDirection = Vector2.zero;
		this.moveSpeed = 0;
	}
	
	awake() {
	  this.addComponent(this.collider);
		this.addComponent(this.renderer);
		//this.renderer.setManualRenderFunc(this.renderFunc)
		this.originY = this.transform.position.y;
	}
		
	update() {
	 // Movement
		this.velocity.y += this.gravity * UTime.deltaTime;
		let currentVelocity = this.velocity.clone().mul(UTime.deltaTime);
		
		this.virtualPosition.add(currentVelocity);
		
		let currentY = this.virtualPosition.y;
		if( currentY >= this.maxY)
		  this.maxY = currentY;
	  else {	    
	   // console.log(this.maxY);
	  }

		// if(this.transform.position.y > 500)
		//   console.log(this.velocity, this.jumpPower);
		
		let targetScale = UMath.lerp(0.5, 1, this.virtualPosition.y * 1/120);
		this.transform.scale.x = targetScale;
		this.transform.scale.y = targetScale;
		
		if (this.virtualPosition.y <= 0 && this.velocity.y < 0) {
		  if(this.jumpCount == 6) {
		    Utills.distroyGameObject(this);
		    return;
		  }
		  this.virtualPosition.y = 0;
		  this.velocity.y = this.jumpPower;
		  this.jumpPower *= 2/3;
		  this.jumpCount++;
		  this.maxY = 0;
		  // console.log(this.virtualPosition.x - this.lastX);
		  this.lastX = this.virtualPosition.x;
		}
		
		this.transform.position.add(this.moveDirection.clone().mul(this.moveSpeed*UTime.deltaTime));
		
		// Animation
		this.timer += UTime.deltaTime;
		if (this.timer >= UMath.lerp(0.2, 0.1, this.jumpPower * 1 / 500)) {
		  this.renderer.setNextIndex();
		  this.timer = 0;
		}
	}
	
	updateJump() {
	  if(!this.jumping) {
	    this.jumping = true;
	    this.y = this.originY;
	  }
	  
	  if(this.jumping)
	    this.jump();
	}
	
	jump() {
	  this.jumpTime += UTime.deltaTime;
	  
	  
	  let height = (this.jumpTime * this.jumpTime * (-this.gravity) / 2) + (this.jumpTime * this.jumpPower);
	  // console.log(height);
	  this.y += height;
	  
	  
	  if(this.y <= this.originY) {
	    this.jumping = false;
	    this.jumpTime = 0;
	    this.y = this.originY;
	  }
	}
}

class PlayerManager extends GameObject {
  constructor() {
    super('PlayerManager', 'pm');
    this.fpsDiv = document.getElementById('fps');
    this.touchStartPosition = new Vector2(0, 0);
    this.touchCurrentPosition = new Vector2(0, 0);
    this.touching = false;
    let mr = new ManualRenderer(-1);
    this.renderer = this.addComponent(mr);
    this.renderer.setManualRenderFunc((gCtx, gCvs, self, sC) => {
      if(self.touching) {
        let rad = 30;
        gCtx.save();
        gCtx.translate(gCvs.width / 2 + self.touchStartPosition.x, gCvs.height / 2 - self.touchStartPosition.y);
        gCtx.beginPath();
        gCtx.fillStyle = '#878787';
        gCtx.strokeStyle = '#989898';
        gCtx.lineWidth = 30;
        gCtx.lineCap = 'round';
        
        // Line
        gCtx.beginPath();
        gCtx.moveTo(0, 0);
        gCtx.lineTo(self.touchCurrentPosition.x - self.touchStartPosition.x, -(self.touchCurrentPosition.y - self.touchStartPosition.y));
        gCtx.stroke();
        gCtx.closePath();
        
        // Circle
        gCtx.beginPath();
        gCtx.moveTo(0, 0);
        gCtx.arc(0, 0, rad, 0, 2 * Math.PI);
        gCtx.fill();
        gCtx.closePath();
        
        gCtx.restore();
      }
    });
  }
  
  update() {
    this.fpsDiv.textContent = parseInt(1 / UTime.deltaTime);
    
    if (UInput.keyPress['X']) {
      let newPlayer = Utills.newGameObject(Player, new Vector2(0, 0));
      newPlayer.renderer.renderIndex = parseInt(Math.random() * 100);
    }
    
    if(UInput.mouseState == MouseState.Down) {
      let newPlayer = Utills.newGameObject(Player, UInput.mousePosition);
    }
    
    if (UInput.touchState == TouchState.Down) {
      this.touchStartPosition = UInput.touchPosition.clone();
      this.touchCurrentPosition = UInput.touchPosition.clone();
      this.touching = true;
    }
    else if(UInput.touchState == TouchState.Move) {
      this.touchCurrentPosition = UInput.touchPosition.clone();
    }
    else if(UInput.touchState == TouchState.Up) {
      let newPlayer = Utills.newGameObject(Player, this.touchStartPosition);
      newPlayer.moveDirection = UInput.touchPosition.clone().sub(this.touchStartPosition).normalized;
      newPlayer.moveSpeed = UInput.touchPosition.clone().sub(this.touchStartPosition).mag;
      newPlayer.transform.rotation = 90-newPlayer.moveDirection.deg; 
      this.touching = false;
    }
  }
}

let playerManager = Utills.newGameObject(PlayerManager);

let initSample = {
  gameCanvasId: 'game-canvas',
  viewCanvasId: 'view-canvas'
};

GameManager.init(initSample); 
		

