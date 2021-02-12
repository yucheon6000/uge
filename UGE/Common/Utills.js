class Utills {
  static newGameObject(gameObjectName, position) {
    let obj = new gameObjectName();
    if(position)
      obj.transform.position = position;
    
    // 게임 메니저에 추가
    GameManager.GameObjectManager.addGameObject(obj);
    return obj;
  }
  
  static distroyGameObject(obj) {
    // 게임 메니저에 추가
    obj.components.forEach((val) => {
      val.enable = false;
      val.enable = false;
    })
    GameManager.GameObjectManager.removeGameObject(obj);
  }
}