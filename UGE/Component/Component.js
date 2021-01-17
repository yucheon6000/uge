class Component {
  constructor() {
    this.enable = true;

    this.gameObject = undefined;
  }
  
  get type() {
    return 'Component';
  }
  
  get typeIndex() {
    return 0;
  }
  
  setGameObject(obj) {
    this.gameObject = obj;
  }
  
  // 매 프레임마다 실행되는 로직
  update() {
    
  }
}