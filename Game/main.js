let initSample = {
  gameCanvasId: 'game-canvas'
};

GameManager.init(initSample); 
		
let frogManager = Utills.newGameObject(FrogManager);

let frog = frogManager.frog;
let factory = Utills.newGameObject(Factory);

let snakeManager = Utills.newGameObject(SnakeManager);
snakeManager.init(frog, factory);

// let coin = Utills.newGameObject(Coin);
// coin.init(Vector2.zero, 30, frog, 30)
