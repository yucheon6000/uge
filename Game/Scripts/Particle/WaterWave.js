let waterWaveAtlas = new Atlas('Game/Resource/WaterWaveAtlas.png', 3, 3);

class WaterWave extends GameObject {
  constructor() {
    super('WaterWave', 'waterWave');
    this._renderer = new AtlasRenderer(waterWaveAtlas, 0, 0, -1);

    this._animTimer = 0;
    this._scaleTimer = 0;
  }

  awake() {
    this.addComponent(this._renderer);
  }

  update() {
    this._animTimer += UTime.deltaTime;
    this._scaleTimer += UTime.deltaTime;

    let targetScale = UMath.lerp(0.8, 1, this._scaleTimer / 0.35);
    this.transform.scale = new Vector2(targetScale, targetScale);

    if (this._animTimer >= 0.05) {
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