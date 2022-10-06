import Phaser from "../lib/phaser.js";
export default class Game extends Phaser.Scene {
    /** @type {Phaser.Physics.Arcade.Sprite} */
    player;//declaration of the player property

    //carrot;

    platforms;

    moveTo;
    constructor() {
        super('game');//Every Scene has to define a unique key
    }

    preload() {// is called to allow us to specify images, audio, or other assets to load before starting the Scene. 
        this.load.image('background', '../assets/background/backgroundColorForest.png');
        this.load.image('platform', '../assets/platform/ground_wood.png');
        this.load.image('beardman', '../assets/beardman/adventurer_jump.png');
        this.load.image('target', '../assets/target/target.png');
        this.load.image('carrot', '../assets/carrot/carrot.png');
        this.load.plugin('rexmovetoplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmovetoplugin.min.js', true);

    }

    create() {
        this.add.image(512, 356, 'background');
        this.add.image(130, 650, 'platform').setScale(0.6);
        this.add.image(820, 400, 'target').setScale(0.35);
        this.player = this.physics.add.sprite(150, 574, 'beardman').setScale(0.9);
        
        var carrot = this.physics.add.sprite(210, 570, 'carrot').setScale(0.7);

        carrot.moveTo = this.plugins.get('rexmovetoplugin').add(carrot, {
            speed: 800,
            rotateToTarget: false
        }).on('complete', function () {
            console.log('Reach target');
        });

        const g = 400;
        this.input.on('pointerdown', function (pointer) {

            let tFlight = (2 * 800 * Math.sin(Math.atan((570 - pointer.y) / (pointer.x - 210)))) / g;

            for (let t = 0; t <= tFlight; t++) {

                var touchX = 800 * t * Math.cos(Math.atan((570 - pointer.y) / (pointer.x - 210)));
                var touchY = 800 * t * Math.sin(Math.atan((570 - pointer.y) / (pointer.x - 210))) - g * t * t / 2;

                carrot.moveTo.moveTo(touchX - 210, 570 - touchY);

            }

            console.log((570 - pointer.y), (pointer.x - 210), Math.atan((570 - pointer.y) / (pointer.x - 210)),touchX - 210);
        });
    }// is called once all the assets for the Scene have been loaded.

    update(t, dt) {

    }
}
