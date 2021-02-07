let CollisionState = {None:0, Enter: 1, Stay: 2, Exit: 3};
class Collider extends Component {
  constructor() {
    super();
    this._colliderMap = new Map();
    
    this._eventStack
  }
  
  /* Override Method */
  get type() {
    return ComponentType.Collider;
  }
  
  // 게임 오브젝트에 추가되었을 때 실행
  registered() {
  
  }
  
  // 매 프레임마다 실행
  update() {
  
  }
  
  // 매 프레임마다 부모 게임오브젝트의 위치를 기반으로 콜라이더 위치를 계산
  updatePosition() {
    
  }
  
  updateCollisionState(/*Collider*/collider, state) {
    if(this._colliderMap.has(collider)) {
      let lastState = this._colliderMap.get(collider);
      let targetState;
      switch(lastState) {
        case CollisionState.None:
          if (state) targetState = CollisionState.Enter;
          else targetState = CollisionState.None;
          break;
        case CollisionState.Enter:
          if(state) targetState = CollisionState.Stay;
          else targetState = CollisionState.Exit;
          break;
        case CollisionState.Stay:
          if (state) targetState = CollisionState.Stay;
          else targetState = CollisionState.Exit;
          break;
        case CollisionState.Exit:
          if (state) targetState = CollisionState.Enter;
          else targetState = CollisionState.None;
          break;
      }
      
      this._colliderMap.set(collider, targetState);
    }
    else {
      if(state)
        this._colliderMap.set(collider, CollisionState.Enter);
    }
  }
  
  // 부모 게임오브젝트의 이벤트를 호출
  sendEvent() {
    if(!this.gameObject) return;
    this._colliderMap.forEach((state, collider) => {
      switch (state) {
        case CollisionState.None:
          break;
        case CollisionState.Enter:
          this.gameObject.onTriggerEnterColiision(collider);
          break;
        case CollisionState.Stay:
          this.gameObject.onTriggerStayColiision(collider);
          break;
        case CollisionState.Exit:
          this.gameObject.onTriggerExitColiision(collider);
          this._colliderMap.set(collider, CollisionState.None);
          break;
      }
    })
  }
  
  drawCollider(gCtx, gCanvas, selfComponent) {
  
  }
}