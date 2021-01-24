class Vector2 {
  constructor(x=0, y=0) {
    this.x = x;
    this.y = y;
  }
  
  equal(vec2) {
    if(this.x == vec2.x && this.y == vec2.y)
      return true;
    else
      return false;
  }
  
  // 사칙연산
  // 새 객체 생성 후, 반환
  add(vec2) {
    this.x += vec2.x;
    this.y += vec2.y;
    return this;
  }
  
  sub(vec2) {
    this.x -= vec2.x;
    this.y -= vec2.y;
    return this;
  }
  
  mul(num) {
    this.x *= num;
    this.y *= num;
    return this;
  }
  
  div(num) {
    this.x /= num;
    this.y /= num;
    return this;
  }
	
	// Method
	clone() {
	  return new Vector2(this.x, this.y);
	}
	
  // 
	
	// Get getter
	get sqrMag() {
		return this.x * this.x + this.y * this.y;
	}
	
	get mag() {
		return Math.sqrt(this.sqrMag);
	}
	
	get normalized() {
		let len = this.mag;
		if(len == 0) return Vector2.zero;
		
		let x = this.x / len;
		let y = this.y / len;
		return new Vector2(x, y);
	}
  
  get deg() {
    let ang = Math.atan2(this.y, this.x);
    let deg = 180 * ang / Math.PI;
    return (360 + Math.round(deg)) % 360;
  }
  
	// Static
	static get zero() {
		return new Vector2(0, 0);
	}
	
	static get up() {
		return new Vector2(0, 1);
	}
	
	static get down() {
		return new Vector2(0, -1);
	}
	
	static get right() {
		return new Vector2(1, 0);
	}
	
	static get left() {
		return new Vector2(-1, 0);
	}
	
	static get deg2rad() {
	  return (Math.PI * 2) / 360;
	}
	
	static get rad2deg() {
	  return 1 / Vector2.deg2rad;
	}
}