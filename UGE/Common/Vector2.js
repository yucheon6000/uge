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
    let v = new Vector2(this.x, this.y);
    v.x += vec2.x;
    v.y += vec2.y;
    return v;
  }
  
  sub(vec2) {
    let v = new Vector2(this.x, this.y);
    v.x -= vec2.x;
    v.y -= vec2.y;
    return v;
  }
  
  mul(num) {
    return new Vector2(this.x * num, this.y * num);
  }
  
  div(num) {
    return new Vector2(this.x / num, this.y / num);
  }
  
  /*  사칙연산 */
  add(vec2) {
    let v = new Vector2(this.x, this.y);
    v.x += vec2.x;
    v.y += vec2.y;
    return v;
  }
  
  sub(vec2) {
    let v = new Vector2(this.x, this.y);
    v.x -= vec2.x;
    v.y -= vec2.y;
    return v;
  }
  
  mul(num) {
    return new Vector2(this.x * num, this.y * num);
  }
  
  div(num) {
    return new Vector2(this.x / num, this.y / num);
  }
}