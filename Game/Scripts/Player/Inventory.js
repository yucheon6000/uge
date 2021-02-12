class Inventory {
  constructor() {
    this._inventory = {};
    this._ui = {};
    this._ui['coin'] = document.getElementById('coin');
  }
  
  addItem(itemName, amount) {
    if(!this._inventory.hasOwnProperty(itemName))
      this._inventory[itemName] = 0;
    
    this._inventory[itemName] += amount;
    this.updateUI(itemName);
  }
  
  getItemCount(itemName) {
    if (!this._inventory.hasOwnProperty(itemName))
      this._inventory[itemName] = 0;
    
    return this._inventory[itemName];
  }
  
  updateUI (itemName) {
    switch (itemName) {
      case 'coin':
        this._ui[itemName].textContent = this.getItemCount(itemName);
        break;
    }
  }
}