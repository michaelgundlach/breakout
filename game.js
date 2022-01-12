"use strict";
window.addEventListener('load', function () {
    var game = new Phaser.Game({
        width: 800,
        height: 600,
        type: Phaser.AUTO,
        backgroundColor: "#242424",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
            default: 'arcade',
            arcade: {
                checkCollision: { up: true, left: true, right: true, down: false },
                debug: false,
            }
        }
    });
    game.scene.add("Preload", Preload);
    game.scene.add("Level", Level);
    game.scene.add("Boot", Boot, true);
});
class Boot extends Phaser.Scene {
    preload() {
        this.load.pack("pack", "assets/preload-asset-pack.json");
    }
    create() {
        this.scene.start("Preload");
    }
}
class UserComponent {
    /**
     * @param gameObject The entity.
     */
    constructor(gameObject) {
        this.scene = gameObject.scene;
        const listenAwake = this.awake !== UserComponent.prototype.awake;
        const listenStart = this.start !== UserComponent.prototype.start;
        const listenUpdate = this.update !== UserComponent.prototype.update;
        const listenDestroy = this.destroy !== UserComponent.prototype.destroy;
        if (listenAwake) {
            this.scene.events.once("scene-awake", this.awake, this);
        }
        if (listenStart) {
            this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
        }
        if (listenUpdate) {
            this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        }
        if (listenStart || listenUpdate || listenDestroy) {
            gameObject.on(Phaser.GameObjects.Events.DESTROY, () => {
                this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.start, this);
                this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
                if (listenDestroy) {
                    this.destroy();
                }
            });
        }
    }
    scene;
    awake() {
        // override this
    }
    start() {
        // override this
    }
    update() {
        // override this
    }
    destroy() {
        // override this
    }
}
// You can write more code here
/// <reference path="./UserComponent.ts" />
/* START OF COMPILED CODE */
class BallComponent extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.gameObject = gameObject;
        gameObject["__BallComponent"] = this;
        /* START-USER-CTR-CODE */
        gameObject.scene.physics.add.existing(gameObject);
        const body = gameObject.body;
        body.collideWorldBounds = true;
        body.setBounce(1, 1);
        body.setVelocity(200, 400);
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__BallComponent"];
    }
    gameObject;
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/// <reference path="./UserComponent.ts" />
/* START OF COMPILED CODE */
class PaddleComponent extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.gameObject = gameObject;
        gameObject["__PaddleComponent"] = this;
        /* START-USER-CTR-CODE */
        gameObject.scene.physics.add.existing(gameObject);
        gameObject.body.immovable = true;
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__PaddleComponent"];
    }
    gameObject;
    ball;
    /* START-USER-CODE */
    // Write your code here.
    awake() {
        this.gameObject.scene.physics.add.collider(this.ball, this.gameObject, this.hitBall, undefined, this);
    }
    update() {
        const input = this.gameObject.scene.input;
        input.on('pointermove', () => {
            this.gameObject.x = input.activePointer.x;
        });
    }
    hitBall(ball, gameObject) {
        // How far from our center were we hit?
        const offset = ball.x - gameObject.x;
        ball.body.velocity.x = offset * 10;
        const Between = () => Phaser.Math.Between(0, 0xffffff);
        this.gameObject.setTint(Between(), Between(), Between(), Between());
    }
}
/* END OF COMPILED CODE */
// You can write more code here
/// <reference path="./UserComponent.ts"/>
/* START OF COMPILED CODE */
class PreloadText extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.gameObject = gameObject;
        gameObject["__PreloadText"] = this;
        /* START-USER-CTR-CODE */
        this.scene.load.on(Phaser.Loader.Events.PROGRESS, (p) => {
            this.gameObject.text = Math.floor(p * 100) + "%";
        });
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__PreloadText"];
    }
    gameObject;
}
/* END OF COMPILED CODE */
// You can write more code here
/// <reference path="./UserComponent.ts"/>
// You can write more code here
/* START OF COMPILED CODE */
class PushOnClick extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.gameObject = gameObject;
        gameObject["__PushOnClick"] = this;
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__PushOnClick"];
    }
    gameObject;
    /* START-USER-CODE */
    awake() {
        this.gameObject.setInteractive().on("pointerdown", () => {
            this.scene.add.tween({
                targets: this.gameObject,
                scaleX: 0.8,
                scaleY: 0.8,
                duration: 80,
                yoyo: true
            });
        });
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class Level extends Phaser.Scene {
    constructor() {
        super("Level");
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    editorCreate() {
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
    ball;
    /* START-USER-CODE */
    // Write your code here.
    create() {
        this.editorCreate();
        this.createBricks();
    }
    createBricks() {
        const brickPic = this.add.image(400, 400, "brick");
        const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffffff, 0xffff00, 0xff00ff, 0x00ffff];
        let count = 0;
        for (let column = 0; column < 10; column++) {
            for (let row = 0; row < 5; row++) {
                count++;
                const brick = this.physics.add.image(column * brickPic.displayWidth, row * brickPic.height, "brick");
                brick.setImmovable();
                brick.setTint(colors[count % colors.length]);
                this.physics.add.collider(brick, this.ball, () => {
                    brick.destroy();
                });
            }
        }
        brickPic.destroy();
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    editorPreload() {
        this.load.pack("asset-pack", "assets/asset-pack.json");
    }
    editorCreate() {
        // progress
        const progress = this.add.text(400, 349, "", {});
        progress.setOrigin(0.5, 0.5);
        progress.text = "0%";
        progress.setStyle({ "fontSize": "30px" });
        // progress (components)
        new PreloadText(progress);
        this.events.emit("scene-awake");
    }
    /* START-USER-CODE */
    // Write your code here
    preload() {
        this.editorCreate();
        this.editorPreload();
        this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level"));
    }
}
/* END OF COMPILED CODE */
// You can write more code here
