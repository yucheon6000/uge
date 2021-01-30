let explosionAtlas = new Atlas('Game/Resource/ExplosionAtlas.png', 4, 2);

class Explosion extends GameObject {
  constructor() {
    super('Explosion', 'explosion');
    this._renderer = new AtlasRenderer(explosionAtlas, 0, 0, -1);
    
    this._animTimer = 0;
    this._scaleTimer = 0;
  }
  
  awake() {
    this.addComponent(this._renderer);
  }
  
  update() {
    this._animTimer += UTime.deltaTime;
    this._scaleTimer += UTime.deltaTime;
    
    let targetScale = UMath.lerp(0.8, 1.3, this._scaleTimer / 0.35);
    this.transform.scale = new Vector2(targetScale, targetScale);
    
    if(this._animTimer >= 0.05) {
      if (this._renderer.isLastIndex)
        Utills.distroyGameObject(this);
      else {
        this._renderer.setNextIndex();
        this._animTimer = 0;
      }
    }
  }
  
  init(spawnPosition) {
    this.transform.position.x = spawnPosition.x;
    this.transform.position.y = spawnPosition.y;
  }
}