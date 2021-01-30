class Atlas extends Sprite {
  constructor(spriteSrc, colLength=1, rowLength=1) {
    super(spriteSrc);
    this.size = new Vector2(this.size.x / colLength, this.size.y / rowLength);
    this.halfSize = this.size.mul(0.5);
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
    this._setStartPosition();
  }

  get type() {
    return ComponentType.AtlasRenderer;
  }

  update() {

  }

  _setStartPosition() {
    this.startPosition = this.atlas.getStartPositionByIndex(this.colIndex, this.rowIndex);
  }

  get isFirstIndex() {
    if(this.colIndex == 0 && this.rowIndex == 0)
      return true;
    else 
      return false;
  }

  get isLastIndex() {
    if (this.colIndex == this.atlas.colLength - 1 && this.rowIndex == this.atlas.rowLength - 1)
      return true;
    else
      return false;
  }

  setAtlas (atlas, colIndex=0, rowIndex=0) {
    this.atlas = atlas;
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
    this._setStartPosition();
  }

  setAtlasIndex(colIndex, rowIndex) {
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
    this._setStartPosition();
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
    
    this._setStartPosition();
  }
  
  setPrevIndex(){
    this.colIndex--;
    if (this.colIndex < 0) {
      this.colIndex = this.atlas.colLength - 1;
      this.rowIndex--;
      if (this.rowIndex < 0) {
        this.rowIndex = this.atlas.rowLength - 1;
      }
    }
    
    this._setStartPosition();
  }

  render(gCtx, gCvs, selfGameObject, selfComponent) {
    gCtx.save();

    gCtx.translate(gCvs.width * 0.5 + this.transform.position.x, gCvs.height * 0.5 - this.transform.position.y);
    gCtx.rotate(-(selfGameObject.transform.rotation * Math.PI / 180));
    gCtx.translate(-(this.atlas.halfSize.x * this.transform.scale.x), -(this.atlas.halfSize.y * this.transform.scale.y));
    
    gCtx.drawImage(
      this.atlas.img, 
      this.startPosition.x, this.startPosition.y, this.atlas.size.x, this.atlas.size.y, 
      0, 0, this.atlas.size.x  * this.transform.scale.x, this.atlas.size.y  * this.transform.scale.y);

    gCtx.restore();
  }
}
