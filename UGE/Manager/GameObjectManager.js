class GameObjectManager {
  constructor() {
    this.gameObjectList = [];
    this.gameObjectIndex = 0;
  }
  
  // GameObject 추가/삭제
  addGameObject(/*GameObject*/obj) {
    this.gameObjectList.push(obj);
    // 고쳐야 할 듯
    if(GameManager.state == GameState.Start || GameManager.state == GameState.Pause) {
      obj.awake();
      obj.start();
    }
    //console.log(`[GameObjectManager] GameObject 추가됨 (${obj.type})`);
    return;
  }
  
  removeGameObject(/*GameObject*/obj) {
    let index = this.gameObjectList.indexOf(obj);
    if(index != -1) {
        this.gameObjectList.splice(index, 1);
        return true;
    }
    return false;
  }
}