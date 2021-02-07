class PlayerState {
  constructor() {
    this._point = 0;
    this._boomCount = {};
  }
  
  addPoint(amount) {
    this._point += amount;
    if(this._point < 0) this._point = 0;
  }
  
  addBoomCount(boomName, amount) {
    if(!this._boomCount.hasProperty(boomName))
      this._boomCount[boomName] = 0;
      
    this._boomCount[boomName] += amount;
    
    if(this._boomCount[boomName] < 0)
      this._boomCount[boomName] = 0;
  }
  
  getBoomCount(boomName) {
    if (!this._boomCount.hasProperty(boomName))
      this._boomCount[boomName] = 0;
      
    return this._boomCount[boomName];
  }
}