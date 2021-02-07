class CircleCollider extends Collider {
  constructor(radius, pivot) {
    super();
    this.radius = radius;
    this.pivot = pivot ? pivot : new Vector2();
    this.center = new Vector2();
  }
  
  get type() {
    return ComponentType.CircleCollider;
  }

  // 게임 오브젝트에 추가되었을 때 실행
  registered() {
    
  }
  
  // 매 프레임마다 실행되는 로직
  update() {
  }

  updatePosition() {
    if(!this.gameObject) return;
    if(this.pivot.equal(Vector2.zero)) {
      this.center = this.transform.position.clone();
    }
    else {
      let addVec = Vector2.rotateVector2(this.pivot, this.transform.rotation);
      this.center = this.transform.position.add(addVec);
    }
  }
  
  
  drawCollider(gCtx, gCvs, selfComponent) {
    gCtx.save();
    gCtx.translate(gCvs.width * 0.5 + selfComponent.center.x, gCvs.height * 0.5 - selfComponent.center.y);
    // Draw circle
    gCtx.beginPath();
    gCtx.arc(0, 0, selfComponent.radius, 0, 2 * Math.PI);
    gCtx.stroke();
    gCtx.closePath();
    
    gCtx.restore();
  }
}