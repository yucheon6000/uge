let poisonExplosionAtlas = new Atlas('Game/Resource/PoisonAtlas.png', 7, 1);

class PoisonExplosion extends GameObject {
  constructor() {
    super('PoisonExplosion', 'poisonExplosion');
    this._renderer = new AtlasRenderer(poisonExplosionAtlas, 0, 0, -1);
    this._collider = new CircleCollider(60);

    this._damage = 0;
    this._attackedMonsters = [];

    this._animTimer = 0;
    this._scaleTimer = 0;
  }

  awake() {
    this.addComponent(this._renderer);
    this.addComponent(this._collider);
  }

  update() {
    this._animTimer += UTime.deltaTime;
    this._scaleTimer += UTime.deltaTime;

    let targetScale = UMath.lerp(0.8, 1.3, this._scaleTimer / 0.35);
    this.transform.scale = new Vector2(targetScale, targetScale);

    if (this._animTimer >= 0.05) {
      if (this._renderer.isLastIndex)
        Utills.distroyGameObject(this);
      else {
        this._renderer.setNextIndex();
        this._animTimer = 0;
      }
    }
  }

  init(spawnPosition, damage = 0) {
    this.transform.position.x = spawnPosition.x;
    this.transform.position.y = spawnPosition.y;
    this._damage = damage;
  }

  onTriggerEnterColiision(other) {
    if (other.tag == 'monster') {
      let monster = other.gameObject;
      if (!monster.alive || this._attackedMonsters.indexOf(monster) > -1) return;
      monster.addHp(-this._damage);
      this._attackedMonsters.push(monster);
    }
  }
}