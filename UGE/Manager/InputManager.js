class InputManager {
  
}

// Input
let Input = {};
Input.key = {};

document.addEventListener('keydown', (event) => {
  Input.key[event.key || event.which] = true;
})

document.addEventListener('keyup', (event) => {
  Input.key[event.key || event.which] = false;
})