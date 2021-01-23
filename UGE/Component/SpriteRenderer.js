class Sprite {
  constructor(spriteSrc) {
    this.img = new Image();
    this.img.src = spriteSrc;
    this.size = new Vector2(this.img.width, this.img.height);
    this.halfSize = this.size.clone().mul(0.5);
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

  render(gCtx, vCtx, gCvs, vCvs, self = this.gameObject) {
    gCtx.save();
    
    gCtx.translate(gCvs.width/2 + this.transform.position.x, gCvs.height/2 - this.transform.position.y);
    gCtx.rotate(self.transform.rotation * Math.PI / 180);
    gCtx.translate(-(this.sprite.halfSize.x), -(this.sprite.halfSize.y));
    gCtx.drawImage(this.sprite.img, 0, 0);
    
    gCtx.restore();
  }
}