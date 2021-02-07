class Component {
  constructor() {
    this.enable = true;
    this.gameObject = undefined;
  }
	
	/* Override Method */
  get type() {
    return ComponentType.Component;
  }
  
	// 게임 오브젝트에 추가되었을 때 실행
	registered() {

	}
	
  // 매 프레임마다 실행되는 로직
  update() {
    
  }
	
	/* Default Method */
	setGameObject(obj) {
    this.gameObject = obj;
  }
  
  get transform() {return this.gameObject.transform;}
  get name() {return this.gameObject.name;}
  get tag() {return this.gameObject.tag;}
}