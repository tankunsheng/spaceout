
import Enemy from "./Enemy";
import basicEnemyImage from "./basicEnemy.png"
import Explosion from "../Explosions/Explosion.js";
import explosion from "../Explosions/test.png"
let image = new Image()
image.src = explosion

export default class BasicEnemy extends Enemy {
    constructor(canvasWidth, enemyIndex, life) {
        super(canvasWidth, enemyIndex, 45, 60, 1.5, 5, life)
        this.image.src = basicEnemyImage
    }
    
    getExplosion(posX, posY, explosionIndex) {
        
        return new Explosion({
            rows: 4,
            cols: 4,
            width: 64,
            height: 64,
            tickPerFrame: 3,
            tickCount: 0,
            posX: posX,
            posY: posY,
            image:image,
            explosionIndex: explosionIndex
        })

    }

}