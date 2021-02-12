let poisonBoomAtlas = new Atlas('Game/Resource/PoisonBoomAtlas.png', 4, 2);
class PoisonBoom extends GameObject {
  constructor() {
    super('PoisonBoom', 'poisonBoom');
    this._renderer = new AtlasRenderer(poisonBoomAtlas);
    this._collider = new CircleCollider(40);

    // State
    this._isGround = false;
    this._jumping = false;

    // Jump
    this._virtualPosition = new Vector2(0, 0);
    this._velocity = new Vector2(0, 0);

    this._gravity = -1000;
    this._jumpPower = 500;
    this._jumpCount = 0;
    this._targetJumpCount = 3;

    // Movement
    this._moveDirection = Vector2.zero;
    this._moveSpeed = 0;

    // Animation
    this._animTimer = 0;
  }

  awake() {
    this.addComponent(this._renderer);
    this.addComponent(this._collider);
  }

  update() {
    if(this.checkGround()) {
      this.jump(this._jumpPower);
      this._jumpPower *= 5 / 6;
      this._jumpCount++;
      if(this._jumpCount > this._targetJumpCount)
        this.explosion();
    }
    
    this.updateMovement();
    this.updateAnimation();
    
  }

  updateMovement() {
    // Velocity
    this._velocity.y += this._gravity * UTime.deltaTime;
    let current_velocity = this._velocity.mul(UTime.deltaTime);
    this._virtualPosition = this._virtualPosition.add(current_velocity);
    
    // Movement
    this.transform.position = this.transform.position.add(this._moveDirection.mul(this._moveSpeed * UTime.deltaTime));
  }
  
  updateAnimation() {
    // Scale
    let targetScale = UMath.lerp(0.5, 1, this._virtualPosition.y * 1 / 120); // 0 ~ 120
    this.transform.scale.x = targetScale;
    this.transform.scale.y = targetScale;
    
    // Animation
    this._animTimer += UTime.deltaTime;
    if (this._animTimer >= UMath.lerp(0.2, 0.1, this._jumpPower * 1 / 500)) {
      this._renderer.setNextIndex();
      this._animTimer = 0;
    }
  }
  
  jump(jumpPower) {
    this._virtualPosition.y = 0;
    this._velocity.y = jumpPower;
    this._jumping = true;
  }

  checkGround() {
    if (this._virtualPosition.y <= 0 && this._velocity.y < 0) {
      this._isGround = true;
      return true;
    }
    else {
      this._isGround = false;
      return false;
    }
  }

  explosion() {
    let explosion = Utills.newGameObject(PoisonExplosion);
    explosion.init(this.transform.position.clone(), 100);
    Utills.distroyGameObject(this);
    return;
  }

  init(moveDirection, moveSpeed) {
    this._moveDirection = moveDirection;
    this._moveSpeed = moveSpeed;
    this.transform.rotation = moveDirection.deg - 90;
  }
  
  onTriggerStayColiision(other) {
    if(this._jumpCount < 1 || (this._jumpCount <= 1 && this._velocity.y > 0)) return;
    
    if(this._virtualPosition.y <= 20 && other.gameObject.tag == 'monster') {
      let monster = other.gameObject;
      if(!monster.alive) return;
      this.explosion();
    }
    
  }
}