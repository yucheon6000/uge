let ghoostAtlas = new Atlas('Game/Resource/GhoostAtlas.png', 5, 2);

class Ghoost extends GameObject {
  constructor() {
    super('Ghoost', 'ghoost');
    this._renderer = new AtlasRenderer(ghoostAtlas, 0, 0, -1);

    this._animTimer = 0;
    this._scaleTimer = 0;
  }

  awake() {
    this.addComponent(this._renderer);
    this.transform.scale = new Vector2(0.6, 0.6);
  }

  update() {
    this._animTimer += UTime.deltaTime;
    this._scaleTimer += UTime.deltaTime;

    let targetScale = UMath.lerp(0.6, 0.8, this._scaleTimer / 1);
    this.transform.scale = new Vector2(targetScale, targetScale);

    if (this._animTimer >= 0.1) {
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