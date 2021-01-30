class Sprite {
  constructor(spriteSrc) {
    this.img = new Image();
    this.img.src = spriteSrc;
    this.size = new Vector2(this.img.width, this.img.height);
    this.halfSize = this.size.mul(0.5);
  }
}

class SpriteRenderer extends Component {
  constructor(sprite, renderIndex = 0) {
    super();
    this.sprite = sprite;
    this.renderIndex = renderIndex;
  }

  get type() {
    return ComponentType.SpriteRenderer;
  }

  update() {

  }

  render(gCtx, gCvs, selfGameObject, selfComponent) {
    gCtx.save();
    
    gCtx.translate(gCvs.width/2 + this.transform.position.x, gCvs.height/2 - this.transform.position.y);
    gCtx.rotate(-(selfGameObject.transform.rotation * Math.PI / 180));
    gCtx.translate(-(this.sprite.halfSize.x * this.transform.scale.x), -(this.sprite.halfSize.y * this.transform.scale.y));
    gCtx.drawImage(this.sprite.img, 0, 0,
      this.sprite.size.x * this.transform.scale.x, this.sprite.size.y * this.transform.scale.y);
    
    gCtx.restore();
  }
}