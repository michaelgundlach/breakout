
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// ball
		const ball = this.add.image(423, 536, "ball");

		// paddle
		const paddle = this.add.image(422, 579, "paddle");

		// ball (components)
		new BallComponent(ball);

		// paddle (components)
		const paddlePaddleComponent = new PaddleComponent(paddle);
		paddlePaddleComponent.ball = ball;

		this.ball = ball;

		this.events.emit("scene-awake");
	}

	private ball: Phaser.GameObjects.Image | undefined;

	/* START-USER-CODE */

	// Write your code here.

	create() {

		this.editorCreate();
		this.createBricks();
	}

	createBricks() {
		const brickPic = this.add.image(400, 400, "brick");
		const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffffff, 0xffff00, 0xff00ff, 0x00ffff]
		let count = 0
		for (let column = 0; column < 10; column++) {
			for (let row = 0; row < 5; row++ ) {
				count++
				const brick = this.physics.add.image(column * brickPic.displayWidth, row * brickPic.height, "brick");
				brick.setImmovable()
				brick.setTint(colors[count % colors.length])
				this.physics.add.collider(brick, this.ball!, () => { 
					brick.destroy()
				})
			}
		}
		brickPic.destroy()
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
