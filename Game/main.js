class PlayerManager extends GameObject {
  constructor() {
    super('PlayerManager', 'pm');
    this.fpsDiv = document.getElementById('fps');
    this.touchStartPosition = new Vector2(0, 0);
    this.touchCurrentPosition = new Vector2(0, 0);
    this.touching = false;
    this.renderer = new ManualRenderer(-1);
  }
  
  awake() {
    this.renderer.setManualRenderFunc(this.renderFunc);
    this.addComponent(this.renderer);
  }
  
  update() {
    // Print fps
    this.fpsDiv.textContent = parseInt(1 / UTime.deltaTime);
    
    // Touch
    if (UInput.touchState == TouchState.Down) {
      this.touchStartPosition = UInput.touchPosition.clone();
      this.touchCurrentPosition = UInput.touchPosition.clone();
      this.touching = true;
    }
    else if(UInput.touchState == TouchState.Move) {
      this.touchCurrentPosition = UInput.touchPosition.clone();
    }
    else if(UInput.touchState == TouchState.Up) {
      let moveDirection = UInput.touchPosition.clone().sub(this.touchStartPosition).normalized;
      let moveSpeed = UInput.touchPosition.clone().sub(this.touchStartPosition).mag;
      let boom = Utills.newGameObject(NormalBoom, this.touchStartPosition);
      boom.init(moveDirection, moveSpeed);
      this.touching = false;
    }
  }
  
  renderFunc(gCtx, gCvs, self, selfComponent) {
    if (self.touching) {
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
  }
}

let playerManager = Utills.newGameObject(PlayerManager);

let initSample = {
  gameCanvasId: 'game-canvas'
};

GameManager.init(initSample); 
		

