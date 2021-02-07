let coinAtlas = new Atlas('Game/Resource/CoinAtlas.png', 3, 2);
class Coin extends Item {
  constructor() {
    super('Coin', 'coin');
    
    // Component
    this.renderer = new AtlasRenderer(coinAtlas);
    this.collider = new CircleCollider(10);

    this.target = null;
    
    // Movement
    this.moveSpeed = 0;
    this.pointAmount = 0;
    
    // Animation
    this.animTimer = 0;
  }
  
  awake() {
    this.addComponent(this.renderer);
    this.addComponent(this.collider);
  }

  init(spawnPosition, moveSpeed, player, pointAmount) {
    let tr = this.transform;
    tr.position = spawnPosition;
    this.target = player;
    this.moveSpeed = moveSpeed;
    this.pointAmount = pointAmount;
  }
  
  update() {
    this.updateMovement();
    this.updateAnimation();
  }
  
  updateMovement() {
    let tr = this.transform;
    
    // 플레이어한테 흡수됨
    let moveDirection = this.target.transform.position.sub(tr.position);
    moveDirection = moveDirection.normalized;
    
    // 땅으로 떨어짐
    // if(tr.position.y <= this.target.transform.position.y) {
    //   tr.position.y = this.target.transform.position.y;
    //   return;
    // }
    // let moveDirection = Vector2.down;
    
    tr.position = tr.position.add(moveDirection.mul(this.moveSpeed * UTime.deltaTime));
  }
  
  updateAnimation() {
    this.animTimer += UTime.deltaTime;
    if(this.animTimer >= 0.1) {
      this.animTimer = 0;
      this.renderer.setNextIndex();
    }
  }
  
  onTriggerEnterColiision(other) {
    if(other.name == 'Frog') {
      let playerState = other.gameObject.state;
      playerState.addPoint(this.pointAmount);
      Utills.distroyGameObject(this);
    }
  }
}