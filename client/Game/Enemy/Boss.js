
import Enemy from "./Enemy";
import bossImage from "./boss.png"
import Explosion from "../Explosions/Explosion.js";
import explosion from "../Explosions/bigExplosion.png"
import HandGunBullet from "../Bullet/HandGun.js"
import BulletImage from "../Bullet/BossBullet.png"
let image = new Image()
image.src = explosion
export default class BasicEnemy extends Enemy {
    constructor(canvasWidth, enemyIndex, life) {
        super(canvasWidth, enemyIndex, 90, 95, 3, 60, life)
        this.image.src = bossImage
        this.canvasWidth = canvasWidth
        this.backtrackTime = 1000
        this.backtrackTimeLimit = 0
        this.strafingTime = 1500
        this.strafingTimeLimit = 0
        this.shotInterval = 2000
        this.nextShotTime = this.shotInterval
    }
    shoot(currentTime, index) {
        if (currentTime > this.nextShotTime) {
            this.nextShotTime = currentTime + this.shotInterval
            return [
                new HandGunBullet({
                    spawnPosX: this.getPosX() + this.getWidth() / 2,
                    spawnPosY: this.getPosY() + this.getHeight()
                }, index, 1, this.shotInterval, BulletImage, 28, 28, 3, -2),
                new HandGunBullet({
                    spawnPosX: this.getPosX() + this.getWidth() / 2,
                    spawnPosY: this.getPosY() + this.getHeight()
                }, index+1, 1, this.shotInterval, BulletImage, 28, 28, 3, -1),
                new HandGunBullet({
                    spawnPosX: this.getPosX() + this.getWidth() / 2,
                    spawnPosY: this.getPosY() + this.getHeight()
                }, index+2, 1, this.shotInterval, BulletImage, 28, 28, 3, 0),
                new HandGunBullet({
                    spawnPosX: this.getPosX() + this.getWidth() / 2,
                    spawnPosY: this.getPosY() + this.getHeight()
                }, index+3, 1, this.shotInterval, BulletImage, 28, 28, 3, 1),
                new HandGunBullet({
                    spawnPosX: this.getPosX() + this.getWidth() / 2,
                    spawnPosY: this.getPosY() + this.getHeight()
                }, index+4, 1, this.shotInterval, BulletImage, 28, 28, 3, 2)
            ]
        }
    }
    move(currentTime) {
        if (currentTime < this.backtrackTimeLimit) {
            this.setSpeed(5)
            this.setPosY(this.getPosY() - this.getSpeed())
        } else {
            if (currentTime < this.strafingTimeLimit) {
                this.setSpeed(8)
            } else {
                this.setSpeed(3)
                this.setPosY(this.getPosY() + this.getSpeed())
            }

            if (Math.random() > 0.99)
                this.strafingTimeLimit = currentTime + this.strafingTime
        }
        if (this.getPosY() > this.canvasWidth / 3) {
            this.backtrackTimeLimit = currentTime + this.backtrackTime
        }
        this.setPosX(this.getPosX() + this.getSpeed() * this.getDirX())
    }
    getExplosion(posX, posY, explosionIndex) {

        return new Explosion({
            rows: 4,
            cols: 4,
            width: 128,
            height: 128,
            tickPerFrame: 3,
            tickCount: 0,
            posX: posX,
            posY: posY,
            image: image,
            explosionIndex: explosionIndex
        })

    }

}