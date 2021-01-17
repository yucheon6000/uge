class Transform extends Component {
  // Init
  constructor() {
    super();
    this.position = new Vector2();
    this.rotation = new Vector2();
    this.scale = new Vector2();
  }

  get type() {
    return 'Transform';
  }
  
  get typeIndex() {
    return 1000;
  }

  // Method
}