
import Enemy from "./Enemy.js"
import Explosion from "../Explosions/Explosion.js";
import meteor1 from "./meteorBig1.png"
import meteor2 from "./meteorBig2.png"
import {getRandomInt} from "../util.js"
import explosion from "../Explosions/test.png"
let image = new Image()
image.src = explosion
export default class meteorEnemy extends Enemy {
    constructor(canvasWidth, enemyIndex, life) {
        super(canvasWidth, enemyIndex, 60, 80, getRandomInt(4)+0.5, 3, life)
        
        this.image.src = Math.random() > 0.5 ? meteor1 : meteor2
    }
    move(gameCanvas,currentTime) {
        //refer to https://www.youtube.com/watch?v=I3Ik81Ku3lA
        // https://stackoverflow.com/questions/50045930/javascript-canvas-continuously-rotating-a-canvas-drawn-image
        // https://stackoverflow.com/questions/16536879/html5-canvas-rotate-and-move-issue
        // gameCanvas.setTransform(0.5, 0, 0, 0.5, this.getPosX(), this.getPosY());
        gameCanvas.setTransform(0.5, 0, 0, 0.5, this.getPosX()+(this.getWidth() / 2), this.getPosY()+(this.getHeight() / 2));
        gameCanvas.rotate(currentTime / 500);
        gameCanvas.drawImage(this.getImage(), -(this.getWidth() / 2), -(this.getHeight() / 2));
        gameCanvas.setTransform(1, 0, 0, 1, 0, 0);

        this.setPosY(this.getPosY() + this.getSpeed())
        this.setPosX(this.getPosX() + this.getSpeed() * this.getDirX())

    }
    getExplosion(posX, posY, explosionIndex) {

        return new Explosion({
            rows: 4,
            cols: 4,
            width: 64,
            height: 64,
            tickPerFrame: 3,
            tickCount: 0,
            posX: posX-20,
            posY: posY-20,
            image:image,
            explosionIndex: explosionIndex
        })

    }

}