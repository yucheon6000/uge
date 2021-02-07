let factoryAtlas = new Atlas('Game/Resource/FactoryAtlas.png', 5, 2);
class Factory extends GameObject {
  constructor() {
    super('Factory', 'factory');
    this.renderer = new AtlasRenderer(factoryAtlas, 0, 0, -1);
    this.collider = new CircleCollider(30, new Vector2(0, 20));
    this.timer = 0;
    this.scaleTimer = 0;
  }

  awake() {
    this.transform.position.y = -(UScreen.gameCanvas.height / 2) + 70;
    this.transform.rotation = -182;
    this.addComponent(this.renderer);
    this.addComponent(this.collider);
  }

  update() {
    this.timer += UTime.deltaTime;
    this.scaleTimer += UTime.deltaTime;

    if (this.timer >= 0.1) {
      this.renderer.setNextIndex();
      this.timer = 0;
    }
    
    if(this.scaleTimer >= 0.4) {
      let scale = this.transform.scale.x == 1 ? 0.9 : 1;
      this.scaleTimer = 0;
      this.transform.scale.x = scale;
      this.transform.scale.y = scale;
      if(scale == 1)
        this.transform.rotation = this.transform.rotation == -182 ? 182 : -182;
    }
  }

  setPosition(pos) {
    this.transform.position.x = pos.x;
    this.transform.position.y = pos.y;
  }
}

