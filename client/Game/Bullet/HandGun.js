import Bullet from "./Bullet.js"


export default class HandGun extends Bullet{
    constructor(spawnPos, bulletIndex, yDir, rate, handgunBulletImg, width, height, speed, xDir){
        super(spawnPos, bulletIndex, width, height, yDir, rate, xDir)
        this.damage = 1
        this.speed = speed
        this.setImage(handgunBulletImg)
    }
   
    getSpeed(){
        return this.speed
    }
    
}