class UMath {
  static checkRange(targetNum, startNum, endNum) {
    if(startNum <= targetNum && targetNum <= endNum)
      return true;
    return false;
  }
}