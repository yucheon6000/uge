let explosionAtlas = new Atlas('Game/Resource/ExplosionAtlas.png', 4, 2);
class Explosion extends GameObject {
  constructor() {
    super('Explosion', 'explosion');
    this.renderer = new AtlasRenderer(explosionAtlas, 0, 0, -1);
    
    this.timer = 0;
    this.scaleTimer = 0;
  }
  
  awake() {
    this.addComponent(this.renderer);
  }
  
  update() {
    this.timer += UTime.deltaTime;
    this.scaleTimer += UTime.deltaTime;
    
    let targetScale = UMath.lerp(0.8, 1.5, this.scaleTimer / 0.35);
    this.transform.scale = new Vector2(targetScale, targetScale);
    
    if(this.timer >= 0.05) {
      if (this.renderer.isLastIndex)
        Utills.distroyGameObject(this);
      else {
        this.renderer.setNextIndex();
        this.timer = 0;
      }
    }
  }
  
  setPosition(pos) {
    this.transform.position.x = pos.x;
    this.transform.position.y = pos.y;
  }
}