class RenderManager {
  constructor() {
     this.gameCanvas = null;
     this.gameCtx = null;
     this.viewCanvas = null;
     this.viewCtx = null;
   }

  init(gameCanvasId, viewCanvasId) {
    let error = function(val) {
      throw new Error(`[RenderManager] 초기화 실패! (${val})`);
      return false;
    }
    
    this.gameCanvas = document.getElementById(gameCanvasId);
    if(this.gameCanvas == undefined)
      return error(gameCanvasId);
    
    this.gameCtx = this.gameCanvas.getContext('2d');
    if (this.gameCtx == undefined)
      return error(gameCanvasId);
      
    this.viewCanvas = document.getElementById(viewCanvasId);
    if (this.viewCanvas == undefined)
      return error(viewCanvasId);
    
    this.viewCtx = this.viewCanvas.getContext('2d');
    if (this.viewCtx == undefined)
      return error(viewCanvasId);
    
    return true;
  }
    
  render(components) {
    // Clear canvas
    this.gameCtx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.viewCtx.clearRect(0, 0, this.viewCanvas.width, this.viewCanvas.height);
    
    // Sort components
    components.sort((a,b) => {
      return a.renderIndex - b.renderIndex;
    })
    
    // Draw canvas
    //let cameraPos = new Vector2(0, 0);
    cameraPos.y -= 5 * UTime.deltaTime;
    
    // if (Input.key['w']) // w
    //   cameraPos.y += 5 * UTime.deltaTime;
    // if (Input.key['s']) // s
    //   cameraPos.y -= 5 * UTime.deltaTime;
    // if (Input.key['a']) // a
    //   cameraPos.x -= 5 * UTime.deltaTime;
    // if (Input.key['d']) // d
    //   cameraPos.x += 5 * UTime.deltaTime;
    
    this.gameCtx.save();
    this.gameCtx.translate(-cameraPos.x, cameraPos.y);
    
    for(let i = 0; i < components.length; i++) {
      components[i].render(this.gameCtx, this.viewCtx, this.gameCanvas, this.viewCanvas);
    }
    
    // Show view
    this.gameCtx.restore();
    this.viewCtx.drawImage(this.gameCanvas, 0, 0);
  }
}

let cameraPos = new Vector2(0, 0);
