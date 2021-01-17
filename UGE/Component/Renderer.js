class Renderer extends Component {
  constructor(renderIndex = 0) {
    super();
    this.renderIndex = renderIndex;
  }
  
  get type() {
    return 'Renderer';
  }
  
  get typeIndex() {
    return 2000;
  }
  
  update() {
    
  }
  
  render(gCtx, vCtx, gCvs, vCvs) {
    let rectSize = new Vector2(100, 100);
    
    let realPos = this.gameObject.transform.position;
    
    let targetPos = new Vector2(gCvs.width/2, gCvs.height/2); //0, 0
    // console.log(targetPos);
    targetPos.x += realPos.x;
    targetPos.x -= rectSize.x/2;
    targetPos.y -= realPos.y;
    targetPos.y -= rectSize.y/2;
    
    gCtx.beginPath();
    gCtx.rect(targetPos.x, targetPos.y, rectSize.x, rectSize.y);
    gCtx.stroke();
  }
}