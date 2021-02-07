class Monster extends GameObject {
  constructor(name='Monster', tag='monster') {
    super(name, tag);
    
    // Component
    this.renderer;
    this.collider;
    
    // State
    this.hp = 100;
    this.mp = 100;
    this.alive = true;
    
    this.player = null;
  }
  
  init() {  }
  
  addHp(amount) {
    this.hp += amount;
    if(this.hp <= 0) {
      this.die();
    }
  }
  
  addMp(amount) {
    this.mp += amount;
  }
  
  die() {  }
  
  spawnCoin(pointAmountPerCoin, coinCount) {
    for(let i = 0; i < coinCount; i++) {
      let coin = Utills.newGameObject(Coin);
      let spawnPosition = this.transform.position.clone().add(
        new Vector2(UMath.randomRangeFloat(-40, 40), UMath.randomRangeFloat(-40, 40)));
      let moveSpeed = 250;
      
      coin.init(spawnPosition, moveSpeed, this.player, pointAmountPerCoin);
    }
  }
}