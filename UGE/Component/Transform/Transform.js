class Transform extends Component {
  // Init
  constructor() {
    super();
    this.position = new Vector2();
    this.rotation = 0;
    this.scale = new Vector2(1, 1);
  } 

  get type() {
    return ComponentType.Transform;
  }
}