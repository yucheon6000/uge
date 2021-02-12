class FrogManager extends GameObject {
  constructor() {
    super('FrogManager', 'frogManager');
    this.fpsDiv = document.getElementById('fps');
    
    // Frog
    this._frog = Utills.newGameObject(Frog);
    this.attackVector = new Vector2();
    this.readyAttack = false;
    
    // Touch
     this.touchStartPosition = new Vector2(0, 0);
     this.touchCurrentPosition = new Vector2(0, 0);
     this.touching = false;
     this.renderer = new ManualRenderer(-1);
  }

  get frog() {
    return this._frog;
  }

  awake() {
    this.renderer.setManualRenderFunc(this.renderFunc);
    this.addComponent(this.renderer);
  }
  
  update() {
    // Print fps
    this.fpsDiv.textContent = parseInt(1 / UTime.deltaTime);
    
    this.updateTouch();
  }
  
  updateTouch() {
    if(!this.frog.isGround) return;
    // Touch
    if (UInput.getTouchDown()) {
      this.touchStartPosition = UInput.touchPosition.clone();
      this.touchCurrentPosition = UInput.touchPosition.clone();
      this.touching = true;
      this.attackVector = new Vector2();
      this.frog.readyAttack(this.touching);
      this.readyAttack = true;

    }
    else if (UInput.getTouch() && this.readyAttack) {
      this.touchCurrentPosition = UInput.touchPosition.clone();
      let origin = this.touchCurrentPosition.sub(this.touchStartPosition);
      if(origin.mag > 300) {
        let newPos = origin.normalized.mul(300);
        this.attackVector = newPos;
      }
      else
        this.attackVector = origin;
    }
    else if (UInput.getTouchUp() && this.readyAttack) {
      let moveDirection = this.attackVector.normalized;
      let moveSpeed = this.attackVector.mag;
      let boom = Utills.newGameObject(PoisonBoom, this.frog.transform.position);
      boom.init(moveDirection, moveSpeed);
      this.touching = false;
      
      this.frog.jump();
      this.frog.readyAttack(this.touching);
      this.readyAttack = false;
    }
  }
  
  renderFunc(gCtx, gCvs, self, selfComponent) {
    if (self.touching) {
      let rad = 30;
      gCtx.save();
      gCtx.translate(gCvs.width / 2 + self.frog.transform.position.x, gCvs.height / 2 - self.frog.transform.position.y);
      gCtx.beginPath();
      gCtx.fillStyle = '#878787';
      gCtx.strokeStyle = '#98989880';
      gCtx.lineWidth = 30;
      gCtx.lineCap = 'round';
    
      // Line
      gCtx.beginPath();
      gCtx.moveTo(0, 0);
      gCtx.lineTo(self.attackVector.x, -(self.attackVector.y));
      gCtx.stroke();
      gCtx.closePath();
    
      // Circle
      // gCtx.beginPath();
      // gCtx.moveTo(0, 0);
      // gCtx.arc(0, 0, rad, 0, 2 * Math.PI);
      // gCtx.fill();
      // gCtx.closePath();
    
      gCtx.restore();
    }
  }
}