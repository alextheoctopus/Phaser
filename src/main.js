import Phaser from './lib/phaser.js';
import Game from './scenes/Game.js';


export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 2000,
    height: 712,
    scene: Game,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y:0
            },
            debug: true
        }
    }
});
