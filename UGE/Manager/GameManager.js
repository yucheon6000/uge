GameManager = {};
GameManager.GameObjectManager = new GameObjectManager();

GameManager._canvas = undefined;
GameManager._ready = false;

GameManager.init = function(canvasId) {
  GameManager._canvas = document.getElementById(canvasId);
  if(GameManager._canvas == undefined)
    throw new Error('[GameManager] 존재하지 않는 canvas의 id 입니다.');
    
  console.log('[GameManager] 게임을 초기화했습니다.');
  GameManager._ready = true;
  return;
}

GameManager.start = function() {
  if(!GameManager._ready)
    throw new Error('[GameManager] 게임을 시작하기 위한 준비가 되지 않았습니다.');
  
  console.log('[GameManager] 게임을 시작했습니다.');
  Game._lastTime = new Date().getTime();
  requestAnimationFrame(GameManager._frame);
  return;
}

GameManager._frame = function() {
  let curTime = new Date().getTime();
  Game.deltaTime = curTime - Game._lastTime;
  Game._lastTime = curTime;
  
  for(let i = 0; i < GameManager.GameObjectManager.gameObjectList.length; i++) {
    let obj = GameManager.GameObjectManager.gameObjectList[i];
    obj.update();
    for(let j = 0; j < obj.components.length; j++) {
      obj.components[j].update();
    }
  }
  
  requestAnimationFrame(GameManager._frame);
}

Game = {};
Game._lastTime = 0;
Game.deltaTime = 0;