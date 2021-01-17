class GameObjectManager {
  constructor() {
    this.gameObjectList = [];
    this.gameObjectIndex = 0;
  }
  
  // GameObject 추가/삭제
  addGameObject(obj) {
    this.gameObjectList.push(obj);
    console.log(`[GameObjectManager] GameObject 추가됨 (${obj.type})`);
    return;
  }
  
  removeGameObject(obj) {
    for(let i = 0; i < this.gameObjectList.length; i++) 
      if(this.gameObjectList[i] == obj) {
        this.gameObjectList.slice(i, 1);
        console.log(`[GameObjectManager] GameObject 삭제됨 (${obj.type})`);
        return true;
      }
      
    return false;
  }
}