class SnakeManager extends GameObject {
  constructor() {
    super('SnakeManager', 'snakeManager');
    this.spawnTimer = 0;
    this.player = null;
    this.factory = null;
  }
  
  init(player, factory) {
    this.player = player;
    this.factory = factory;
  }
  
  update() {
    this.updateSpawn();
  }
  
  updateSpawn() {
    this.spawnTimer += UTime.deltaTime;
    if(this.spawnTimer >= 1) {
      this.spawnTimer = 0;
      this.spawn();
    }
  }
  
  spawn() {
    let snake = Utills.newGameObject(NormalSnake);
    let x = Math.random() * 10000 % UScreen.gameCanvas.width - (UScreen.gameCanvas.width/2);
    let spawnPosition = new Vector2(x, (UScreen.gameCanvas.height/2) + 40);
    snake.init(spawnPosition, this.player, this.factory);
  }
  
}
