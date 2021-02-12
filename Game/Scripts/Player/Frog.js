let greenFrogAtlas = new Atlas('Game/Resource/GreenFrogHeadAtlas.png', 3, 2);
let redFrogAtlas = new Atlas('Game/Resource/RedFrogHeadAtlas.png', 3, 2);
let purpleFrogAtlas = new Atlas('Game/Resource/PurpleFrogHeadAtlas.png', 3, 2);

class Frog extends GameObject {
  constructor() {
    super('Frog', 'frog');
    this._renderer = new AtlasRenderer(greenFrogAtlas, 0, 0, 3);
    this._collider = new CircleCollider(20);
      
    // State
    this.state = new PlayerState();
    this.inventory = new Inventory();
    
    // Movement
    this._moveDirection = Vector2.left;
    this._originPosition;
    this._moveSpeed = 150;
    
    // Jump
    this._virtualPosition = new Vector2(0, 0);
    this._velocity = new Vector2(0, 0);
    this._isGround = false;
    this._jumping = false;
    this._gravity = -600;
    this._jumpPower = 300;
    this._stayTimer = 0;
    this._targetStayTime = 0.5;

    // Touch
    this._readyAttck = false;
    this._lastRotation;
    
    // Animation
    this._animTimer = 0;
    this._body = Utills.newGameObject(FrogBody);
    
    // Debug
    this._maxY = 0;
  }
  
  awake() {
    this.transform.position.x = 0;
    this.transform.position.y = -(UScreen.gameCanvas.height / 2) + 50;
    this.transform.rotation = 180;
    this._originPosition = this.transform.position.clone();
    this.addComponent(this._renderer);
    this.addComponent(this._collider);
    this.jump();
  }
  
  update() {
    // Movement
    if (!this._readyAttck && this._jumping)
      this.updateMovement();
      
    this.updateJump();
    this.updateAnimation();
  }
  
  updateMovement() {
    // Movement
    this.transform.position = this.transform.position.add(this._moveDirection.mul(this._moveSpeed * UTime.deltaTime));
    
    // Turn move direction
    let maxiumWidth = (UScreen.gameCanvas.width / 2) - 30;
    if(this.transform.position.x <= -maxiumWidth 
        && this._moveDirection.equal(Vector2.left)) {
      this._moveDirection = Vector2.right;
      this.transform.rotation = 0;
    }
    else if (this.transform.position.x >= maxiumWidth
    && this._moveDirection.equal(Vector2.right)) {
      this._moveDirection = Vector2.left;
      this.transform.rotation = 180;
    }
  }
  
  updateJump() {
    // 바닥에 있어 점프 가능한 상태
    if(this._isGround) {
      if(this._stayTimer >= this._targetStayTime && !this._readyAttck)
        this.jump();
      else
        this._stayTimer += UTime.deltaTime;
    }
    // 점프 중
    else {
      this._velocity.y += this._gravity * UTime.deltaTime;
      let current_velocity = this._velocity.mul(UTime.deltaTime);
      this._virtualPosition = this._virtualPosition.add(current_velocity);
    }
    
   if (this._virtualPosition.y <= 0 && this._velocity.y < 0) {
     this._isGround = true;
     this._jumping = false;
   }
  }
  
  readyAttack(value) {
    if(value) {
      this._readyAttck = true;
      this._renderer.setAtlas(redFrogAtlas, this._renderer.colIndex, this._renderer.rowIndex);
      this._lastRotation = this.transform.rotation;
      this.transform.rotation = 90;
    }
    else {
      this._readyAttck = false;
      this._renderer.setAtlas(greenFrogAtlas, this._renderer.colIndex, this._renderer.rowIndex);
      this.transform.rotation = this._lastRotation;
    }
  }
  
  jump() {
    if(this._jumping) return;
    
    this._virtualPosition.y = 0;
    this._velocity.y = this._jumpPower;
    this._stayTimer = 0;
    this._isGround = false;
    this._jumping = true;
    let waterwave = Utills.newGameObject(WaterWave);
    waterwave.init(this.transform.position);
  }
  
  updateAnimation() {
    this._animTimer += UTime.deltaTime;
    if(this._animTimer >= 0.2) {
      this._animTimer = 0;
      this._renderer.setNextIndex();
    }
    
    // Scale
    let targetScale = UMath.lerp(0.8, 1, this._virtualPosition.y * 1 / 70); // 0 ~ 
    this.transform.scale.x = targetScale;
    this.transform.scale.y = targetScale;
    
    // Body
    this._body.setTransform(this.transform.position, this.transform.rotation, this.transform.scale);
    if(this._jumping)
      this._body.jump();
    else
      this._body.land();
  }
  
  get isGround() {
    return this._isGround;
  }
  
  onTriggerStayColiision(other) {
    if(other.name == 'Factory') {
      // other.gameObject.
    }
  }
}