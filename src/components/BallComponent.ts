// You can write more code here
/// <reference path="./UserComponent.ts" />

/* START OF COMPILED CODE */

class BallComponent extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__BallComponent"] = this;

		/* START-USER-CTR-CODE */
		gameObject.scene.physics.add.existing(gameObject);
		const body = (gameObject.body as Phaser.Physics.Arcade.Body);
		body.collideWorldBounds = true;
		body.setBounce(1, 1)
		body.setVelocity(200, 400)

		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image): BallComponent {
		return (gameObject as any)["__BallComponent"];
	}

	private gameObject: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here