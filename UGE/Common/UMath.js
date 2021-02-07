class UMath {
  static checkRange(targetNum, startNum, endNum) {
    if(startNum <= targetNum && targetNum <= endNum)
      return true;
    return false;
  }
  
  static lerp(a, b, t) {
    return a + (b - a) * UMath.clamp(t, 0, 1);
  }
  
  static clamp(value, min, max) {
    if(value < min)
      return min;
    else if(value > max)
      return max;
    else
      return value;
  }
  
  static randomRangeFloat(n1, n2) {
    return (Math.random() * (n2 - n1 + 1)) + n1;
  }
  
	static get deg2rad() {
	  return (Math.PI * 2) / 360;
	}

	static get rad2deg() {
	  return 1 / UMath.deg2rad;
	}
}

// console.log(UMath.randomRange(10,20))