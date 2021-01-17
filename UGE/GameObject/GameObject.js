class GameObject {
  constructor(type='none', tag='none') {
    let tr = new Transform();
    this.components = [tr];
    this.transform = tr;
    this._type = type;
    this._tag = tag;
  }
  
  get type() {
    return this._type;
  }
  
  get tag() {
    return this._tag;
  }
  
  set transform(transform) {
    return new Error('GAMEOBJECT ERROR: Transform을 직접 바꿀 수는 없습니다.');
  }
  
  // Componen method
  addComponent(component) {
    this.components.push(component);
    return component;
  }
  
  removeComponent(component) {
    for(let i = 0; i < this.components.length; i++) {
      if(component == this.components[i]) {
        this.components.slice(i, 1);
        return true;
      }
    }
    
    return false;
  }
  
  getComponent(componentType) {
    for (let i = 0; i < this.components.length; i++) {
      if (componentType == this.components[i].type) 
        return this.components[i];
    }
    
    return undefined;
  }
  
  getComponents(componentType) {
    let result = [];
    for (let i = 0; i < this.components.length; i++) {
      if (componentType == this.components[i].type)
        result.push(this.components[i]);
    }
    
    return result;
  }
  
  // Overridd method
  awake() {}
  
  start() {}
  
  update() {}
}
