class InputManager {
  updateKeyState() {
	  for(let k in UInput._key) {
			// console.log(k);
			let state = UInput._key[k];
			if(state && !UInput.keyDown[k]) {
				UInput.keyDown[k] = true;
				UInput.keyPress[k] = false;
			}
			else if(state && UInput.keyDown[k]) {
				UInput.keyPress[k] = true;
				UInput.keyDown[k] = false;
			}
			else if(!state) {
				if(UInput.keyDown[k] || UInput.keyPress[k]) {
					UInput.keyUp[k] = true;
				}
				else if(UInput.keyUp[k]) {
					UInput.keyUp[k] = false;
				}
				UInput.keyPress[k] = false;
				UInput.keyDown[k] = false;
			}
	  }
  }
}

// Input
let UInput = {};
UInput._key = {};
UInput.keyDown = {};
UInput.keyPress = {};
UInput.keyUp = {};

UInput.inputKey = function(key) {
	if(UInput.keyDown[key] || UInput.keyPress[key])
		return true;
	else 
		return false;
}

document.addEventListener('keydown', (event) => {
  UInput._key[event.key || event.which] = true;
	event.preventDefault();
})

document.addEventListener('keyup', (event) => {
  UInput._key[event.key || event.which] = false;
	event.preventDefault();
})