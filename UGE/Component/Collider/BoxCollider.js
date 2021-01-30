class BoxCollider extends Collider {
  constructor(boxSize){
    super();
    this.boxSize = boxSize;
    this.halfBoxSize = this.boxSize.div(2);
    this.points = [new Vector2(), new Vector2(), new Vector2(), new Vector2()];
    /*
      0 1    
      2 3      
    */
  }
  
  /* Override Method */
  get type() {
    return ComponentType.BoxCollider;
  }
  
  // 게임 오브젝트에 추가되었을 때 실행
  registered() {
  
  }
  
  // 매 프레임마다 실행되는 로직
  update() {
    this.updatePoints();
  }

  updatePoints() {
    let pos = this.transform.position;
    this.points[0].x = pos.x + this.halfBoxSize.x;
    this.points[0].y = pos.y + this.halfBoxSize.y;
  
    this.points[1].x = pos.x + this.halfBoxSize.x;
    this.points[1].y = pos.y - this.halfBoxSize.y;
    
    this.points[2].x = pos.x - this.halfBoxSize.x;
    this.points[2].y = pos.y - this.halfBoxSize.y;
    
    this.points[3].x = pos.x - this.halfBoxSize.x;
    this.points[3].y = pos.y + this.halfBoxSize.y;
  }
  
  drawCollider(gCtx, gCvs, self) {
    let zeroPos = new Vector2(gCvs.width / 2, gCvs.height / 2); //0, 0
    
    let firstPos;
    for(let i = 0; i < 5; i++) {
      let pos;
      
      if(i == 4)
        pos = firstPos;
      else
        pos = new Vector2(zeroPos.x + self.points[i].x, zeroPos.y - self.points[i].y);
      if(i == 0) {
        gCtx.beginPath()
        gCtx.moveTo(pos.x, pos.y);
        firstPos = pos;
      }
      else
        gCtx.lineTo(pos.x, pos.y);
    }
    
    gCtx.stroke();
  }
}
