class CollisionManager {
  constructor() {
    
  }
  
  updateCollision(components) {
    let len = components.length;
    for(let i = 0; i < len-1; i++) {
      for(let j = i+1; j < len; j++) {
        let component1 = components[i];
        let component2 = components[j];
        
        if(!component1.enable || !component2.enable) continue;
        
        let collision = this._checkCollision(component1, component2);
        component1.updateCollisionState(component2, collision);
        component2.updateCollisionState(component1, collision);
      }
    }
  }
  
  _checkCollision(component1, component2) {
    if(component1.type == ComponentType.CircleCollider && component2.type == ComponentType.CircleCollider) {
      return this._checkCollisionCnC(component1, component2);
    }
  }
  
  _checkCollisionCnC(component1, component2) {
    let distance = component1.center.sub(component2.center).mag;
    if(distance <= component1.radius + component2.radius)
      return true;
    else 
      return false;
  }
}