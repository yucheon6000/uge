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
    for(let i = 0; i < this.gameObjectList.length; i++) 
      if(this.gameObjectList[i] == obj) {
        this.gameObjectList.splice(i, 1);
        //console.log(`[GameObjectManager] GameObject 삭제됨 (${obj.type})`);
        return true;
      }
      
    return false;
  }
}