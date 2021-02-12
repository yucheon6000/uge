let rightJoyStickState = {
  None: 0, Start: 1, 
  ReadySelect: 2, Select: 3, 
  ReadyAttack: 4, Attack: 5
};
let rightJoyStickAtlas = new Atlas('Game/Resource/RightJoyStick.png', 6, 1);
let selectAtlas = new Atlas('Game/Resource/SelectOption.png', 2, 1);
class RightJoyStick extends GameObject {
  static _instance = null
  static get instance() {
    if(!RightJoyStick._instance)
     RightJoyStick._instance = Utills.newGameObject(RightJoyStick);
    return RightJoyStick._instance;
  }
  
  constructor() {
    super('RightJoyStick', 'rightJoyStick');
    
    // Component
    this.renderer = new AtlasRenderer(rightJoyStickAtlas);
    this.radius = 30;
    
    // Touch
    this.startPosition = Vector2.zero;
    
    // State
    this.state = rightJoyStickState.None;
    this.options = {};
    this.selectedOption = -1;
  }
  
  awake() {
    this.addComponent(this.renderer);

    let targetPosition = this.transform.position.add(Vector2.right.mul(30 + 30));
    targetPosition = Vector2.rotateVector2(targetPosition, 90);
    let opt = Utills.newGameObject(SelectOption, targetPosition.clone());
    opt.init(selectAtlas);
    this.options[-1] = {
      gameObject: opt,
      position: targetPosition.clone()
    };
    
    targetPosition = Vector2.rotateVector2(targetPosition, 90);
    for(let i = 0; i < 4; i++) {
      targetPosition = Vector2.rotateVector2(targetPosition, 36);
      let opt = Utills.newGameObject(SelectOption, targetPosition.clone());
      opt.init(selectAtlas);
      
      this.options[i] = {
        gameObject: opt,
        position: targetPosition.clone()
      };
    }
    // Init Position
    // Init State
  }
  
  update() {
    this.updateState();
    if(this.state == rightJoyStickState.ReadySelect)
      this.updateSelect();
    
    this.renderer.setIndex(this.state, 0);
  }
  
  updateState() {
    let touchPos = UInput.touchPosition;
    
    if (UInput.getTouchDown()) {
      // 첫 시작
      if(this.transform.position.sub(touchPos).sqrMag <= this.radius * this.radius) {
        this.state = rightJoyStickState.Start;
        this.startPosition = touchPos.clone();
      }
    }
    else if(UInput.getTouch()) {
      let subVec = touchPos.sub(this.startPosition);
      
      // 2가지 중 선택
      if(this.state == rightJoyStickState.Start && subVec.y * subVec.y >= 10 * 10) {
        if(subVec.y > 0)  {
          this.state = rightJoyStickState.ReadyAttack;
        }
        if (subVec.y < 0)
          this.state = rightJoyStickState.ReadySelect;
      }
    }
    else if (UInput.getTouchUp()) {
      this.state = rightJoyStickState.None;
    }
  }
  
  updateSelect() {
    let touchPos = UInput.touchPosition;
    let dir = touchPos.sub(this.startPosition).normalized;
    let targetPos = dir.mul(30 + 30);
    let min = 9999999;
    let selected = 0;
    for(let i in this.options) {
      let options = this.options[i].position;
      let distance = options.sub(targetPos).sqrMag;
      if(distance < min) {
        min = distance;
        selected = i;
      }
    }
    
    this.selectedOption = selected;
    
    for(let i in this.options) {
      let obj = this.options[i].gameObject;
      if(i == selected)
        this.options[i].gameObject.setSelect(true);
      else
        this.options[i].gameObject.setSelect(false);
    }
  }
}

class SelectOption extends GameObject {
  constructor() {
    super('SelectOption', 'selectOption');
    this.renderer = new AtlasRenderer();
    this.selected = 1;
  }
  
  init(atlas) {
    this.renderer.setAtlas(atlas);
  }
  
  awake() {
    this.addComponent(this.renderer);
  }
  
  setVisible(boolean) {
    this.renderer.enable = boolean;
    if(boolean) {
      this.selected = 0;
      this.updateRenderer();
    }
  }
  
  setSelect(boolean) {
    this.selected = boolean ? 1 : 0;
    this.updateRenderer();
  }
  
  updateRenderer() {
    this.renderer.setIndex(this.selected, 0);
  }
}

RightJoyStick.instance;