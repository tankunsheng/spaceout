import Enemy from "./Enemy";
import advanceEnemyImage from "./advanceEnemy.png"
import Explosion from "../Explosions/Explosion.js";
import HandGunBullet from "../Bullet/HandGun.js"
import BulletImage from "../Bullet/EnemyLaser.png"
import explosion from "../Explosions/test.png"
let image = new Image()
image.src = explosion
export default class advanceEnemy extends Enemy {
    constructor(canvasWidth, enemyIndex, life) {
        super(canvasWidth, enemyIndex, 45, 60, 1.5, 10, life)
        this.image.src = advanceEnemyImage
        this.canvasWidth = canvasWidth
        this.backtrackTime = 1000
        this.backtrackTimeLimit = 0
        this.shotInterval = 1000
        this.nextShotTime = this.shotInterval
    }
    move(currentTime){
        if(currentTime<this.backtrackTimeLimit){
            this.setSpeed(4)
            this.setPosY(this.getPosY() - this.getSpeed())
        }else{
            this.setSpeed(3)
            this.setPosY(this.getPosY() + this.getSpeed())
        }
        if(this.getPosY()> this.canvasWidth/3){
            this.backtrackTimeLimit = currentTime + this.backtrackTime
        }
        this.setPosX(this.getPosX() + this.getSpeed() * this.getDirX())
    }
    shoot(currentTime, index){
        if(currentTime>this.nextShotTime){
            this.nextShotTime = currentTime + this.shotInterval
            return [new HandGunBullet({
                spawnPosX : this.getPosX() + this.getWidth() / 2,
                spawnPosY: this.getPosY() + this.getHeight() 
            }, index, 1, this.shotInterval, BulletImage, 5, 28.5, 7,0)]
        }
        
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