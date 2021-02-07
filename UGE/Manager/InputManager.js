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
      UInput._mousePosition = getMousePosition(canvas, event);
    }, false)
    
    this._canvas.addEventListener("mousemove", (event) => {
      UInput._mousePosition = getMousePosition(canvas, event);
    }, false)
    
    this._canvas.addEventListener("mouseup", (event) => {
      UInput._mouseClick = false;
      UInput._mousePosition = getMousePosition(canvas, event);
    }, false)
  }
  
  initTouchEvnet() {
    let canvas = this._canvas;
    let self = this;
    this._canvas.addEventListener("touchstart", (event) => {
      UInput._touch = TouchState.Down;
      UInput._touchPosition = getMousePosition(canvas, event.touches[0]);
      self.touch = event.touches[0];
      event.preventDefault();
    }, false)
    
    this._canvas.addEventListener("touchmove", (event) => {
      UInput._touch = TouchState.Move;
      UInput._touchPosition = getMousePosition(canvas, event.touches[0]);
      event.preventDefault();
    }, false)

    this._canvas.addEventListener("touchend", (event) => {
      if(event.touches[0] == undefined)
        UInput._touch = TouchState.Up;
        event.preventDefault();
    }, false)
  }
  
  updateKeyState() {
	  for(let k in UInput._key) {
			// console.log(k);
			let state = UInput._key[k];
			if(state) {
			  if (!UInput._keyDown[k] && !UInput._keyPress[k]) {
			    UInput._keyDown[k] = true;
			    UInput._keyPress[k] = false;
			  }
			  else if (UInput._keyDown[k] && !UInput._keyPress[k]) {
			    UInput._keyPress[k] = true;
			    UInput._keyDown[k] = false;
			  }
			}
			else{
				if(UInput._keyDown[k] || UInput._keyPress[k]) {
					UInput._keyUp[k] = true;
					UInput._keyPress[k] = false;
					UInput._keyDown[k] = false;
				}
				else if(UInput._keyUp[k]) {
					UInput._keyUp[k] = false;
					UInput._keyPress[k] = false;
					UInput._keyDown[k] = false;
				}
			}
	  }
  }
  
  updateMouseState() {
    if(UInput._mouseClick === true)  {
      if(UInput._mouseState == MouseState.None || UInput._mouseState == MouseState.Up) {
        UInput._mouseState = MouseState.Down;
      } else if(UInput._mouseState == MouseState.Down) {
        UInput._mouseState = MouseState.Stay;
        UInput._mouseClick = null;
      } 
    }
    else if(UInput._mouseClick === false) {
      if (UInput._mouseState == MouseState.None || UInput._mouseState == MouseState.Down || UInput._mouseState == MouseState.Stay) {
        UInput._mouseState = MouseState.Up;
      } else if (UInput._mouseState == MouseState.Up) {
        UInput._mouseState = MouseState.None;
        UInput._mouseClick = null;
      }
    }
    else if(UInput._mouseClick === null) {
      if(UInput._mouseState == MouseState.Down) {
        UInput._mouseState = MouseState.Stay;
      }
    }
  }
  
  updateTouchState() {
    if (UInput._touch == TouchState.Down) {
      if (UInput._touchState == TouchState.None || UInput._touchState == TouchState.Up) {
        UInput._touchState = TouchState.Down;
      }
      else if (UInput._touchState == TouchState.Down) {
        UInput._touchState = TouchState.Move;
      }
    }
    else if (UInput._touch == TouchState.Move) {
      if (UInput._touchState == TouchState.None || UInput._touchState == TouchState.Up) {
        UInput._touchState = TouchState.Down;
      }
      else if(UInput._touchState == TouchState.Down) {
        UInput._touchState = TouchState.Move;
      }
    }
    else if (UInput._touch == TouchState.Up) {
      if (UInput._touchState == TouchState.Down || UInput._touchState == TouchState.Move) {
        UInput._touchState = TouchState.Up;
        UInput._touch = TouchState.None;
      }
    }
    else if (UInput._touch == TouchState.None) {
      if (UInput._touchState == TouchState.Up) {
        UInput._touchState = TouchState.None;
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
let MouseState = {None: 0, Down: 1, Stay:2, Up: 3};
UInput._mouseClick = null;  // realtime
UInput._mouseState = MouseState.None;  // gametime(frame)
UInput._mousePosition = new Vector2(0, 0);
Object.defineProperty(UInput, 'mousePosition', {get : function(){
  return UInput._mousePosition.clone();
}});
UInput.getMouseButton = function() {
  if (UInput._mouseState == MouseState.Down || UInput._mouseState == MouseState.Stay)
    return true;
  else
    return false;
}

UInput.getMouseButtonDown = function() {
  if (UInput._mouseState == MouseState.Down)
    return true;
  else
    return false;
}

UInput.getMouseButtonUp = function() {
  if (UInput._mouseState == MouseState.Up)
    return true;
  else
    return false;
}


// Touch
let TouchState = {None: 0, Down: 1, Move: 2, Up: 3};
UInput._touch = TouchState.None;  // realtime
UInput._touchState = TouchState.None;  // gametime
UInput._touchPosition = new Vector2(0, 0);
Object.defineProperty(UInput, 'touchPosition', {get : function(){
  return UInput._touchPosition.clone();
}});
UInput.getTouch = function() {
  if (UInput._touchState == TouchState.Down || UInput._touchState == TouchState.Move)
    return true;
  else
    return false;
}

UInput.getTouchDown = function() {
  if (UInput._touchState == TouchState.Down)
    return true;
  else
    return false;
}

UInput.getTouchUp = function() {
  if (UInput._touchState == TouchState.Up)
    return true;
  else
    return false;
}


// Key
UInput._key = {};
UInput._keyDown = {};
UInput._keyPress = {};
UInput._keyUp = {};
UInput.inputKey = function(key) {
	if(UInput._keyDown[key] || UInput._keyPress[key])
		return true;
	else 
		return false;
}
UInput.getKey = function(key) {
  key = key.toUpperCase();
  if(UInput._keyDown[key] || UInput._keyPress[key])
    return true;
  else
    return false;
}

UInput.getKeyDown = function(key) {
  key = key.toUpperCase();
  if (UInput._keyDown[key])
    return true;
  else
    return false;
}

UInput.getKeyUp = function(key) {
  key = key.toUpperCase();
  if (UInput._keyUp[key])
    return true;
  else
    return false;
}