class Atlas extends Sprite {
  constructor(spriteSrc, colLength, rowLength) {
    super(spriteSrc);
    this.size = new Vector2(this.size.x / colLength, this.size.y / rowLength);
    this.halfSize = this.size.clone().mul(0.5);
    this.length = colLength * rowLength;
    this.colLength = colLength;
    this.rowLength = rowLength;
  }
  
  getStartPositionByIndex(colIndex, rowIndex) {
    return new Vector2(this.size.x * colIndex, this.size.y * rowIndex);
  }
}

class AtlasRenderer extends Component {
  constructor(atlas, colIndex=0, rowIndex=0, renderIndex = 0) {
    super();
    this.atlas = atlas;
    this.renderIndex = renderIndex;
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
    this.startPosition;
    this.setStartPosition();
  }

  get type() {
    return ComponentType.AtlasRenderer;
  }

  update() {

  }

  setStartPosition() {
    this.startPosition = this.atlas.getStartPositionByIndex(this.colIndex, this.rowIndex);
  }

  setAtlasIndex(colIndex, rowIndex) {
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
  }

  setNextIndex(){
    this.colIndex++;
    if(this.colIndex == this.atlas.colLength) {
      this.colIndex = 0;
      this.rowIndex++;
      if(this.rowIndex == this.atlas.rowLength) {
        this.rowIndex = 0;
      }
    }
    
    this.setStartPosition();
  }
  
  setPrevIndex(){
    
  }

  render(gCtx, vCtx, gCvs, vCvs, self = this.gameObject) {
    gCtx.save();

    gCtx.translate(gCvs.width / 2 + this.transform.position.x, gCvs.height / 2 - this.transform.position.y);
    gCtx.rotate(self.transform.rotation * Math.PI / 180);
    gCtx.translate(-(this.atlas.halfSize.x), -(this.atlas.halfSize.y));
    gCtx.drawImage(
      this.atlas.img, 
      this.startPosition.x, this.startPosition.y, this.atlas.size.x, this.atlas.size.y, 
      0, 0, this.atlas.size.x, this.atlas.size.y);

    gCtx.restore();
  }
}
