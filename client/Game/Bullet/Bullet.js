
export default class Bullet {
    constructor(spawnShot, bulletIndex, width, height, yDir, rate, xDir) {
        this.x = spawnShot.spawnPosX
        this.y = spawnShot.spawnPosY
        this.image = new Image()
        this.width = width
        this.height = height
        this.bulletIndex = bulletIndex
        this.yDir = yDir
        this.rate = rate
        this.xDir = xDir
    }
    getRate() {
        return this.rate
    }
    move() {
        this.setPosX(this.getPosX() + this.getSpeed() * this.xDir)
        this.setPosY(this.getPosY() + this.getSpeed() * this.yDir)
    }
    getIndex() {
        return this.bulletIndex
    }
    getHeight() {
        return this.height
    }
    getWidth() {
        return this.width
    }
    setPosX(newX) {
        this.x = newX
    }
    setPosY(newY) {
        this.y = newY
    }
    getPosX() {
        return this.x
    }
    getPosY() {
        return this.y
    }
    setImage(image) {
        this.image.src = image
    }
    getImage(image) {
        return this.image
    }

}