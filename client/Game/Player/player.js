import canvas from "../game.js"
import playerImg from "./player1.png"
import HandGun from '../Bullet/HandGun.js'
import handgunBulletImg from "../Bullet/handgun.png"
// import test from "../Assets/Audio/laser5.ogg";
var myAudio = document.createElement("audio");
// var myAudio = new Audio();
// console.log(test)
// myAudio.src = test;
myAudio.src = "./Assets/Audio/laser5.ogg";
myAudio.playbackRate = 10
let img = new Image();
img.src = playerImg

export default class player {
    constructor() {

        this.height = 45
        this.width = 60
        this.posX
        this.posY
        this.img = img
        this.life = 3
        this.nonInvulnerableTime = 0
        this.draw = true
        this.fireRate = 175
        this.gunLevel = 0
    }
    increaseGunLevel() {
        this.gunLevel++
    }
    getGunLevel() {
        return this.gunLevel
    }
    buyFireRate() {
        this.fireRate -= 25
    }
    getFireRate() {
        return this.fireRate
    }
    decreaseLife(currentTimer) {
        if (currentTimer > this.nonInvulnerableTime) {
            this.life--
            this.nonInvulnerableTime = currentTimer + 3000
        }
    }
    getFlicker() {
        this.draw = !this.draw
        return this.draw
    }
    setDraw() {
        this.draw = true
    }
    getNonInvulnerableTime() {
        return this.nonInvulnerableTime
    }
    setLife(newLife) {
        this.life = newLife
    }
    getLife() {
        return this.life
    }
    getImage() {
        return this.img
    }
    getWidth() {
        return this.width
    }
    getHeight() {
        return this.height
    }
    getPosX() {
        return this.posX
    }
    getPosY() {
        return this.posY
    }
    setPos(evt) {
        this.posX = evt.x - this.getWidth() / 2
        this.posY = evt.y - this.getHeight() / 2
    }
    getCurrentGun(bulletIndex) {

        // myAudio.play();
        // return new HandGun(this, bulletIndex, -1, 200, handgunBulletImg, 10, 15, 10)
        switch (this.gunLevel) {
            case 0:
                return [new HandGun({
                    spawnPosX: this.getPosX() + this.getWidth() / 2,
                    spawnPosY: this.getPosY() - this.getHeight() / 2
                }, bulletIndex, -1, this.fireRate, handgunBulletImg, 10, 15, 10, 0)]
            case 1:
                return [
                    new HandGun({
                        spawnPosX: this.getPosX(),
                        spawnPosY: this.getPosY()
                    }, bulletIndex, -1, this.fireRate, handgunBulletImg, 10, 15, 10, 0),
                    new HandGun({
                        spawnPosX: this.getPosX() + this.getWidth(),
                        spawnPosY: this.getPosY()
                    }, bulletIndex + 1, -1, this.fireRate, handgunBulletImg, 10, 15, 10, 0)
                ]
            case 2:
                return [
                    new HandGun({
                        spawnPosX: this.getPosX(),
                        spawnPosY: this.getPosY()
                    }, bulletIndex, -1, this.fireRate, handgunBulletImg, 10, 15, 10, 0),
                    new HandGun({
                        spawnPosX: this.getPosX() + this.getWidth() / 2,
                        spawnPosY: this.getPosY() - this.getHeight() / 2
                    }, bulletIndex + 1, -1, this.fireRate, handgunBulletImg, 10, 15, 10, 0),
                    new HandGun({
                        spawnPosX: this.getPosX() + this.getWidth(),
                        spawnPosY: this.getPosY()
                    }, bulletIndex + 2, -1, this.fireRate, handgunBulletImg, 10, 15, 10, 0)
                  
                ]
        }
        // return new HandGun({
        //     spawnPosX: this.getPosX() + this.getWidth() / 2,
        //     spawnPosY: this.getPosY() - this.getHeight() / 2
        // }, bulletIndex, -1, this.fireRate, handgunBulletImg, 10, 15, 10, 0)
    }


}