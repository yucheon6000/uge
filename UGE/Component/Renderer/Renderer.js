class Renderer extends Component {
  constructor(renderIndex = 0) {
    super();
    this.renderIndex = renderIndex;
  }
  
  get type() {
    return ComponentType.Renderer;
  }

  update() {
    
  }
  
  render(gCtx, gCvs, selfGameObject, selfComponent) {
    
  }
}