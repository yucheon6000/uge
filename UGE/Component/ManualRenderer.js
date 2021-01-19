class ManualRenderer extends Component {
  constructor(renderIndex = 0) {
    super();
    this.renderIndex = renderIndex;
		this.renderFunc = null;
  }
  
  get type() {
    return ComponentType.Renderer;
  }

  update() {
    
  }
  
	setManualRenderFunc(func) {
		this.renderFunc = func;
	}
	
  render(gCtx, vCtx, gCvs, vCvs, self=this.gameObject) {
		if(this.renderFunc != null)
			this.renderFunc(gCtx, vCtx, gCvs, vCvs, self);
  }
}