class ComponentType {
	// 0000 Default
	static get Component() {return 0;}
	
	// 1000 Transform
	static get Transform() {return 1000;}
	
	// 2000 Renderer
	static get Renderer() {return 2000;}
	static get SpriteRenderer() {return 2100;}
	static get ManualRenderer() {return 2200;}
	
	// 3000 Collider
	static get Collider() {return 3000;}
	static get CircleCollider() {return 3100;}
	static get BoxCollider() {return 3200;}
	
	// 4000 Camera
	static get Camera() {return 4000;}
	
	// 5000 Sound
	static get Sound() {return 5000;}
	
	// Sprite
}