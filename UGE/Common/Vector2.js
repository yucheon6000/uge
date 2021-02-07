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
    let origin = this.clone();
    origin.x += vec2.x;
    origin.y += vec2.y;
    return origin;
  }
  
  sub(vec2) {
    let origin = this.clone();
    origin.x -= vec2.x;
    origin.y -= vec2.y;
    return origin;
  }
  
  mul(num) {
    let origin = this.clone();
    origin.x *= num;
    origin.y *= num;
    return origin;
  }
  
  div(num) {
    let origin = this.clone();
    origin.x /= num;
    origin.y /= num;
    return origin;
  }
	
	// Method
	clone() {
	  return new Vector2(this.x, this.y);
	}
	
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
  
  // get degree() {
  //   let n = this.normalized;
  //   if (n.sqrMag == 0) return 0;
  
  //   let r = Math.acos(n.x);
  //   if(this.y < 0) r *= -1;
  //   return Math.round(r * UMath.rad2deg * 1e2) / 1e2;
  // }
  
	// Static getter
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
	
  // Static method
	static radianToVector2(radian) {
	  let x = Math.round(Math.cos(rad) * 1e2) / 1e2;
	  let y = Math.round(Math.sin(rad) * 1e2) / 1e2;
	  return new Vector2(x, y);
	}
	
	static degreeToVector2(degree) {
	  new Vector2.radianToVector2(degree * UMath.deg2rad);
	}
	
	static rotateVector2(vector2, degree) {
	  let x = Math.cos(UMath.deg2rad * degree) * vector2.x - Math.sin(UMath.deg2rad * degree) * vector2.y;
	  x = Math.round(x * 1e2) / 1e2;
	  let y = Math.sin(UMath.deg2rad * degree) * vector2.x + Math.cos(UMath.deg2rad * degree) * vector2.y;
	  y = Math.round(y * 1e2) / 1e2;
	  return new Vector2(x, y);
	}
}
