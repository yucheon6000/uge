class InputManager {
  constructor() {
  }
  
  init(/*string*/gameCanvasId) {
    this._canvas = document.getElementById(gameCanvasId);
    if(this._canvas == undefined) {
      throw new Error('[InputManager] 캔버스 등록 오류');
      return false;
    }
    
    this.touch = null;
    
    this.initKeyEvent();
    this.initClickEvent();
    this.initTouchEvnet();
    return true;    
  }
  
  initKeyEvent() {
    document.addEventListener('keydown', (event) => {
      let key = event.key || event.which;
      key = key.toUpperCase();
      UInput._key[key] = true;
      // 	event.preventDefault();
    })
    
    document.addEventListener('keyup', (event) => {
      let key = event.key || event.which;
      key = key.toUpperCase();
      UInput._key[key] = false;
      // 	event.preventDefault();
    })
  }
  
  initClickEvent() {
    let canvas = this._canvas;
  
    this._canvas.addEventListener("mousedown", (event) => {
      UInput._mouseClick = true;
      UInput.mousePosition = getMousePosition(canvas, event);
    }, false)
    
    this._canvas.addEventListener("mousemove", (event) => {
      UInput.mousePosition = getMousePosition(canvas, event);
    }, false)
    
    this._canvas.addEventListener("mouseup", (event) => {
      UInput._mouseClick = false;
      UInput.mousePosition = getMousePosition(canvas, event);
    }, false)
  }
  
  initTouchEvnet() {
    let canvas = this._canvas;
    let self = this;
    this._canvas.addEventListener("touchstart", () => {
      UInput._touch = TouchState.Down;
      UInput.touchPosition = getMousePosition(canvas, event.touches[0]);
      self.touch = event.touches[0];
    }, false)
    
    this._canvas.addEventListener("touchmove", (event) => {
      UInput._touch = TouchState.Move;
      UInput.touchPosition = getMousePosition(canvas, event.touches[0]);
    }, false)

    this._canvas.addEventListener("touchend", (event) => {
      if(event.touches[0] == undefined)
        UInput._touch = TouchState.Up;
    }, false)
  }
  
  updateKeyState() {
	  for(let k in UInput._key) {
			// console.log(k);
			let state = UInput._key[k];
			if(state) {
			  if (!UInput.keyDown[k] && !UInput.keyPress[k]) {
			    UInput.keyDown[k] = true;
			    UInput.keyPress[k] = false;
			  }
			  else if (UInput.keyDown[k] && !UInput.keyPress[k]) {
			    UInput.keyPress[k] = true;
			    UInput.keyDown[k] = false;
			  }
			}
			else{
				if(UInput.keyDown[k] || UInput.keyPress[k]) {
					UInput.keyUp[k] = true;
					UInput.keyPress[k] = false;
					UInput.keyDown[k] = false;
				}
				else if(UInput.keyUp[k]) {
					UInput.keyUp[k] = false;
					UInput.keyPress[k] = false;
					UInput.keyDown[k] = false;
				}
			}
	  }
  }
  
  updateMouseState() {
    if(UInput._mouseClick === true)  {
      if(UInput.mouseState == MouseState.None || UInput.mouseState == MouseState.Up) {
        UInput.mouseState = MouseState.Down;
      } else if(UInput.mouseState == MouseState.Down) {
        UInput.mouseState = MouseState.None;
        UInput._mouseClick = null;
      } 
    }
    else if(UInput._mouseClick === false) {
      if (UInput.mouseState == MouseState.None || UInput.mouseState == MouseState.Down) {
        UInput.mouseState = MouseState.Up;
      } else if (UInput.mouseState == MouseState.Up) {
        UInput.mouseState = MouseState.None;
        UInput._mouseClick = null;
      }
    }
  }
  
  updateTouchState() {
    if (UInput._touch == TouchState.Down) {
      if (UInput.touchState == TouchState.None || UInput.touchState == TouchState.Up) {
        UInput.touchState = TouchState.Down;
      }
      else if (UInput.touchState == TouchState.Down) {
        UInput.touchState = TouchState.Move;
      }
    }
    else if (UInput._touch == TouchState.Move) {
      if (UInput.touchState == TouchState.None || UInput.touchState == TouchState.Up) {
        UInput.touchState = TouchState.Down;
      }
      else if(UInput.touchState == TouchState.Down) {
        UInput.touchState = TouchState.Move;
      }
    }
    else if (UInput._touch == TouchState.Up) {
      if (UInput.touchState == TouchState.Down || UInput.touchState == TouchState.Move) {
        UInput.touchState = TouchState.Up;
        UInput._touch = TouchState.None;
      }
    }
    else if (UInput._touch == TouchState.None) {
      if (UInput.touchState == TouchState.Up) {
        UInput.touchState = TouchState.None;
      }
    }
  }
}

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left - UScreen.mainCameraSize.x / 2 + UScreen.mainCamera.transform.position.x;
  let y = event.clientY - rect.top  - UScreen.mainCameraSize.y / 2 - UScreen.mainCamera.transform.position.y;
  return new Vector2(x, -y);
}

// Input
let UInput = {};

// Mouse 
let MouseState = {None: 0, Down: 1, Up: 2};
UInput._mouseClick = null;  // realtime
UInput.mouseState = MouseState.None;  // gametime
UInput.mousePosition = new Vector2(0, 0);

// Touch
let TouchState = {None: 0, Down: 1, Move: 2, Up: 3};
UInput._touch = TouchState.None;  // realtime
UInput.touchState = TouchState.None;  // gametime
UInput.touchPosition = new Vector2(0, 0);

// Key
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

