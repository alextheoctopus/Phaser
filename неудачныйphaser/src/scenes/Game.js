import Phaser from "../lib/phaser.js";
export default class Game extends Phaser.Scene {
    /** @type {Phaser.Physics.Arcade.Sprite} */
    player;//declaration of the player property

    bunnysWalk;

    bunnysJump;

    bunnyFall;

    platforms;

    moveTo;

    constructor() {
        super('game');//Every Scene has to define a unique key

    }

    preload() {// is called to allow us to specify images, audio, or other assets to load before starting the Scene. 
        //this.load.image('background', '../assets/background/backgroundColorForest.png');
        this.load.image('background', '../assets/background/backgroundCastles.png');
        this.load.image('platform', '../assets/platform/ground_wood.png');
        this.load.image('beardman', '../assets/beardman/adventurer_jump.png');
        this.load.image('target', '../assets/target/target.png');
        this.load.image('carrot', '../assets/carrot/carrot.png');
        this.load.plugin('rexmovetoplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmovetoplugin.min.js', true);
        this.load.image('platform2', '../assets/platform/ground_grass.png');
        this.load.image('background1', '../assets/background/foliagePack_038.png');
        this.load.image('background2', '../assets/background/foliagePack_039.png');
        this.load.image('background3', '../assets/background/foliagePack_042.png');
        this.load.image('background4', '../assets/background/foliagePack_043.png');
        this.load.image('background5', '../assets/background/foliagePack_052.png');
        this.load.image('background6', '../assets/background/foliagePack_053.png');
        this.load.image('bunnyfall', '../assets/bunnys/bunny2_jump.png')
        this.load.spritesheet('bunnyswalk', '../assets/bunnys/walk.png', {
            frameWidth: 123,
            frameHeight: 202
        });
        this.load.spritesheet('bunnysjump', '../assets/bunnys/spritesheet.png', {
            frameWidth: 140,
            frameHeight: 191
        });
    }

    create() {
        this.add.image(512, 356, 'background');
        this.add.image(130, 650, 'platform').setScale(0.6);
        this.add.image(890, 460, 'target').setScale(0.8, 1);
        this.add.image(610, 590, 'platform2').setScale(0.6, 0.3);
        this.add.image(35, 740, 'background1').setScale(0.5);
        this.add.image(100, 720, 'background2').setScale(0.3);
        this.add.image(165, 690, 'background3').setScale(0.3);
        this.add.image(230, 680, 'background4').setScale(0.3);
        this.add.image(295, 690, 'background5');
        this.add.image(360, 690, 'background6');
        this.add.image(230 + 200, 680, 'background4').setScale(0.3);
        this.add.image(35 + 450, 740, 'background1').setScale(0.5);
        this.add.image(100 + 450, 720, 'background2').setScale(0.3);
        this.add.image(165 + 450, 690, 'background3').setScale(0.3);
        this.add.image(230 + 450, 680, 'background4').setScale(0.3);
        this.add.image(295 + 450, 690, 'background5').setScale(0.7);
        this.add.image(360 + 450, 690, 'background6').setScale(0.7);
        this.add.image(35 + 900, 740, 'background1').setScale(0.5);
        this.add.image(100 + 900, 720, 'background2').setScale(0.3);
        this.add.image(165 + 900, 690, 'background3').setScale(0.3);

        this.movingCarrot();

        this.player = this.physics.add.sprite(150, 574, 'beardman').setScale(0.9);

        this.bunnysWalkF();
        setTimeout(
            () => {
                this.spriteDestroy(this.bunnysWalk);
                this.bunnysJumpF();
            },
            2000);
        setTimeout(
            () => {
                this.bunnysFallF();
            },
            2520
        )
        //this.bunnyReincarnationF();

    }// is called once all the assets for the Scene have been loaded.



    movingCarrot() {
        var carrot = this.physics.add.sprite(210, 570, 'carrot').setScale(0.7);

        carrot.moveTo = this.plugins.get('rexmovetoplugin').add(carrot).on('complete', function () {
            console.log('Reach target');
        });

        const g = 400;
        this.input.on('pointerdown', function (pointer) {
            //carrot.setGravity(100);
            let v0 = 600;
            let alpha = Math.atan((570 - pointer.y) / (pointer.x - 210));
            // let tFlight = 0;
            let velocityX = 0;
            let velocityY0 = 0;
            console.log(pointer.x, pointer.y)

            if (pointer.y < 570 && pointer.x > 210) {
                /// tFlight = (2 * v0 * Math.sin(alpha)) / g;
                velocityX = v0 * Math.cos(alpha);
                velocityY0 = - v0 * Math.sin(alpha);

            } else if (pointer.x <= 210) {
                //tFlight = (2 * v0 * Math.sin(Math.PI / 2)) / g;
                velocityX = v0 * Math.cos(Math.PI / 2);
                velocityY0 = - v0 * Math.sin(Math.PI / 2);
            } else if (pointer.y >= 570 && pointer.x >= 210) {
                //tFlight = (2 * v0) / g;
                velocityX = v0 * Math.cos(0);
                velocityY0 = 0;
            }

            carrot.setVelocity(
                velocityX,
                velocityY0
            );
            carrot.setGravityY(g);

        });
    }

    bunnysWalkF() {
        this.anims.create({
            key: "walk",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers("bunnyswalk", { start: 1, end: 0 }),
        });
        this.bunnysWalk = this.add.sprite(540, 540, 'bunnyswalk').setScale(0.38);
        this.bunnysWalk.play({ key: 'walk', repeat: 4 })

        this.tweens.add({
            targets: this.bunnysWalk,
            x: 700,
            duration: 2000,
            ease: 'Linear'
        });

    }

    bunnysJumpF() {

        this.anims.create({
            key: "jump",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers("bunnysjump", { start: 0, end: 1 }),
        });
        this.bunnysJump = this.add.sprite(700, 540, "bunnysjump").setScale(0.38);
        this.bunnysJump.play({ key: 'jump', repeat: 0 })


        this.tweens.add({
            targets: this.bunnysJump,
            y: 480,
            x: 710,
            duration: 500,
            ease: 'Linear'
        });
    }

    bunnysFallF() {
        this.bunnyFall = this.physics.add.sprite(710, 480, 'bunnyfall').setScale(0.38);
        this.spriteDestroy(this.bunnysJump);
        this.bunnyFall.setVelocity(
            60, -80
        );
        this.bunnyFall.setGravityY(200);
    }

   /*  bunnyReincarnationF() {
        this.spriteDestroy(this.bunnyFall);
        this.bunnyFall = this.physics.add.sprite(710, 480, 'bunnyfall').setScale(0.38);
        
    } */

    spriteDestroy(sprite) {
        sprite.destroy();
    }
}

