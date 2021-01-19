class RenderManager {
  constructor() {
     this.gameCanvas = null;
     this.gameCtx = null;
     this.viewCanvas = null;
     this.viewCtx = null;
		this.mainCamera = null;  // Component(Camera);
   }

  init(gameCanvasId, viewCanvasId, mainCamera=undefined) {
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
		
		// Create main camera
		if(mainCamera==undefined) {
			let obj = Utills.newGameObject(GameObject);
			let cam = new Camera();
			obj.addComponent(cam);
			this.mainCamera = cam;
		}
		
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
    this.gameCtx.save();
    this.gameCtx.translate(-this.mainCamera.gameObject.transform.position.x, this.mainCamera.gameObject.transform.position.x.y);
    
    for(let i = 0; i < components.length; i++) {
      components[i].render(this.gameCtx, this.viewCtx, this.gameCanvas, this.viewCanvas, components[i].gameObject);
    }
    
    // Show view
    this.gameCtx.restore();
    // this.viewCtx.drawImage(this.gameCanvas, 0, 0);  // 더블버퍼링 필요 없는 것 같음
  }
}

let cameraPos = new Vector2(0, 0);
