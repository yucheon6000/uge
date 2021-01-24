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
}