class ComponentType {
	// 0000 Default
	static get Component() {return 0;}
	
	// 1000 Transform
	static get Transform() {return 1000;}
	static get TransformMax() {return 1999;}
	
	// 2000 Renderer
	static get Renderer() {return 2000;}
	static get SpriteRenderer() {return 2100;}
	static get AtlasRenderer() {return 2110;}
	static get ManualRenderer() {return 2200;}
	static get RendererMax() {return 2999;}
	
	// 3000 Collider
	static get Collider() {return 3000;}
	static get CircleCollider() {return 3100;}
	static get BoxCollider() {return 3200;}
	static get ColliderMax() {return 3999;}
	
	// 4000 Camera
	static get Camera() {return 4000;}
	static get CameraMax() {return 4999;}
	
	// 5000 Sound
	static get Sound() {return 5000;}
	static get SoundMax() {return 5999;}
	
	// Sprite
}