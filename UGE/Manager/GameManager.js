let GameManager = {};
GameManager.GameObjectManager = new GameObjectManager();
GameManager.RenderManager = new RenderManager();
GameManager.InputManager = new InputManager();
GameManager.CollisionManager = new CollisionManager();

GameManager._ready = false;

GameManager.init = function(initValues) {
  // Init renderManager 
  let renderReady = GameManager.RenderManager.init(initValues.gameCanvasId, initValues.cameraGameObject);
  let inputReady = GameManager.InputManager.init(initValues.gameCanvasId);

  this._rendererComponent = [];
  this._colliderComponent = [];

  // Finish init 
  console.log('[GameManager] 게임을 초기화했습니다.');
  GameManager._ready = true;
  return;
}

GameManager.start = function() {
  // Check ready
  if(!GameManager._ready) {
    throw new Error('[GameManager] 게임을 시작하기 위한 준비가 되지 않았습니다.');
    return false;
  }
  if(GameManager.state == GameState.Start) {
    console.log('[GameManager] 게임이 진행 중입니다.');
    return false;
  }
  console.log('[GameManager] 게임을 시작했습니다.');
	
	GameManager.state = GameState.Start;
  UTime._lastTime = new Date().getTime();
  
  // Call awake method
  for (let i = 0; i < GameManager.GameObjectManager.gameObjectList.length; i++) {
    let obj = GameManager.GameObjectManager.gameObjectList[i];
    obj.awake();
  }
  
  // Call start method
  for (let i = 0; i < GameManager.GameObjectManager.gameObjectList.length; i++) {
    let obj = GameManager.GameObjectManager.gameObjectList[i];
    obj.start();
  }
  
  // New Frame
  GameManager._frame();
  return;
}

let GameState = {Stop: 0, Start: 1, Pause: 2};
GameManager.state = GameState.Stop;
GameManager.pause = function() {
	console.log('[GameManager] 게임을 일시정지했습니다.');
	GameManager.state = GameState.Pause;
}

GameManager._frame = function() {
	if(GameManager.state == GameState.Pause)
		return;
	
  // New frame
  requestAnimationFrame(GameManager._frame);
	
	// Reset component List
	this._rendererComponent = [];
	this._colliderComponent = [];
	
  // Set delta Time
  let curTime = new Date().getTime();
  UTime.deltaTime = (curTime - UTime._lastTime) / 1000;
  UTime._lastTime = curTime;

  // Find Collider
  let gameObjectListClone = [...GameManager.GameObjectManager.gameObjectList];
  gameObjectListClone.forEach((obj) => {
    obj.components.forEach((com) => {
      if (UMath.checkRange(com.type, ComponentType.Collider, ComponentType.ColliderMax)) {
        this._colliderComponent.push(com);
        com.updatePosition();
      }
    })
  })
  
  // Update check collision
  GameManager.CollisionManager.updateCollision(this._colliderComponent);
  
  // Call collision event
  this._colliderComponent.forEach((com) => {
    if(!com.enable) return;
    com.sendEvent();
  })
  
	// Update input state
	GameManager.InputManager.updateKeyState();
	GameManager.InputManager.updateMouseState();
	GameManager.InputManager.updateTouchState();
  
  // Call update method
  gameObjectListClone = [...GameManager.GameObjectManager.gameObjectList];
  for(let i = 0; i < gameObjectListClone.length; i++) {
    let obj = gameObjectListClone[i];
		if(obj.enable) obj.update();
    for(let j = 0; j < obj.components.length; j++) {
      let com = obj.components[j]
			if(com.enable) com.update();
      
      // Push render Component
      if(UMath.checkRange(com.type, ComponentType.Renderer, ComponentType.RendererMax)){
        this._rendererComponent.push(com);
      }
    }
  }
  
  // Rendering
  GameManager.RenderManager.updateRender(this._rendererComponent);
  // GameManager.RenderManager.renderCollider(this._colliderComponent);
}

// Time
let UTime = {};
UTime._lastTime = 0;
UTime.deltaTime = 0;