class Utills {
  static newGameObject(gameObjectName, position) {
    let obj = new gameObjectName();
    if(position != undefined)
      obj.transform.position = position;
    
    // 게임 메니저에 추가
    GameManager.GameObjectManager.addGameObject(obj);
    
    // Call awake and start method
    obj.awake();
    obj.start();
    
    return obj;
  }
  
  static distroyGameObject(obj) {
    // 게임 메니저에 추가
    Gamemanager.GameObjectManager.removeGameObject(obj);
  }
}