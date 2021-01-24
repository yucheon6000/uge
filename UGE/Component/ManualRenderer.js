class ManualRenderer extends Component {
  constructor(renderIndex = 0) {
    super();
    this.renderIndex = renderIndex;
		this.renderFunc = null;
  }
  
  get type() {
    return ComponentType.ManualRenderer;
  }

  update() {
    
  }
  
	setManualRenderFunc(func) {
		this.renderFunc = func;
	}
	
  render(gCtx, gCvs, selfGameObject, selfComponent) {
		if(this.renderFunc != null)
			this.renderFunc(gCtx, gCvs, selfGameObject, selfComponent);
  }
}