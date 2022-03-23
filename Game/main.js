window.factoryList = [];
function mainInit() {
    let initSample = {
        gameCanvasId: 'game-canvas'
    };

    GameManager.init(initSample);

    let frogManager = Utills.newGameObject(FrogManager);
    let frog = frogManager.frog;

    let snakeManager = Utills.newGameObject(SnakeManager);
    snakeManager.init(frog, null);

    let space = UScreen.gameCanvas.width / 4;
    let x = space / 2;
    for (let i = 0; i < 4; i++) {
        console.log(space, x)
        let factory = Utills.newGameObject(Factory, new Vector2(x - (UScreen.gameCanvas.width / 2), 0));
        window.factoryList.push(factory);
        x += space;
    }

    frog.transform.position = window.factoryList[0].transform.position.clone();

    // let coin = Utills.newGameObject(Coin);
    // coin.init(Vector2.zero, 30, frog, 30)
}