let bodyAtlas = new Atlas('Game/Resource/FrogBodyAtlas.png', 2, 1);

class FrogBody extends GameObject {
  constructor() {
    super('FrogBody', 'frogBody');
    this._renderer = new AtlasRenderer(bodyAtlas, 0, 0, 2);
    this._jumping = false;
  }
  
  awake() {
    this.addComponent(this._renderer);
  }
  
  setTransform(position, rotation, scale) {
    this.transform.position.x = position.x;
    this.transform.position.y = position.y;
    this.transform.rotation = rotation;
    this.transform.scale.y = scale.y;
    this.transform.scale.y = scale.y;
  }
  
  jump() {
    if(!this._jumping) {
      this._renderer.setAtlasIndex(1, 0);
      this._jumping = true;
    }
  }
  
  land() {
    if(this._jumping) {
      this._renderer.setAtlasIndex(0, 0);
      this._jumping = false;
    }
  }
}