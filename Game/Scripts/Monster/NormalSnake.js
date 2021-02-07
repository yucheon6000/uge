let normalSnakeAtlas = new Atlas('Game/Resource/NormalSnakeAtlas.png', 4, 2);
class NormalSnake extends Monster {
  constructor() {
    super('NormalSnake');
    this.renderer = new AtlasRenderer(normalSnakeAtlas, 0, 0, -2);
    this.collider = new CircleCollider(30);
    
    // State
    this.hp = 100;
    this.alive = true;

    this.target = null;
    
    // Movement
    this.moveDirection = new Vector2();
    this.moveSpeed = 70;
    
    // Animation
    this.animTimer = 0;
  }
  
  awake() {
    this.addComponent(this.renderer);
    this.addComponent(this.collider);
  }
  
  update() {
    this.updateMovement();
    this.updateAnimation();
  }
  
  updateMovement() {
    let tr = this.transform;
    tr.position = tr.position.add(this.moveDirection.mul(this.moveSpeed * UTime.deltaTime));
  }
  
  updateAnimation() {
    this.animTimer += UTime.deltaTime;
    
    if(this.animTimer >= 0.08) {
      this.animTimer = 0;
      this.renderer.setNextIndex();
    }
    
    if(!this.target) return;
    let dis = this.transform.position.sub(this.target.transform.position).sqrMag;
    let scale = UMath.lerp(0.8, 0.4, dis / (UScreen.gameCanvas.height ** 2));
    this.transform.scale.x = scale;
    this.transform.scale.y = scale;
  }
    
  init(spawnPosition, player, target) {
    this.target = target;
    this.moveDirection = target.transform.position.sub(spawnPosition).normalized;
    this.transform.position = spawnPosition;
    this.player = player;
    // this.transform.rotation = this.moveDirection.deg + 90;
  }
  
  addHp(val) {
    this.hp += val;
    if(this.hp <= 0)
      this.die();
  }
  
  die() {
    if(!this.alive) return;

    this.alive = false;
    Utills.distroyGameObject(this);
    
    let ghoost = Utills.newGameObject(Ghoost);
    ghoost.init(this.transform.position.clone());
    
    this.spawnCoin(30, 10);
  }
  
  onTriggerEnterColiision(other) {
    if(other.gameObject.name == 'Factory') {
      // Distroy
      this.alive = false;
      Utills.distroyGameObject(this);
    }
  }
}