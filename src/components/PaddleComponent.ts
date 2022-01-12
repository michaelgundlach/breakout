// You can write more code here
/// <reference path="./UserComponent.ts" />

/* START OF COMPILED CODE */

class PaddleComponent extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__PaddleComponent"] = this;

		/* START-USER-CTR-CODE */
		gameObject.scene.physics.add.existing(gameObject);
		(gameObject.body as Phaser.Physics.Arcade.Body).immovable = true
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image): PaddleComponent {
		return (gameObject as any)["__PaddleComponent"];
	}

	private gameObject: Phaser.GameObjects.Image;
	public ball: any;

	/* START-USER-CODE */

	// Write your code here.
	awake() {
		this.gameObject.scene.physics.add.collider(this.ball, this.gameObject, this.hitBall, undefined, this)
	}

	update() {
		const input = this.gameObject.scene.input
		input.on('pointermove', () => {
			this.gameObject.x = input.activePointer.x
		})
	}

	hitBall(ball: Phaser.Types.Physics.Arcade.GameObjectWithBody, gameObject: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
		// How far from our center were we hit?
		const offset = (ball as Phaser.GameObjects.Image).x - (gameObject as Phaser.GameObjects.Image).x
		ball.body.velocity.x = offset * 10
		const Between = () => Phaser.Math.Between(0, 0xffffff)
		this.gameObject.setTint(Between(), Between(), Between(), Between())
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
