
export default class Enemy {
    constructor(canvasWidth, enemyIndex, width, height, speed, score, life) {
        this.x = Math.floor((Math.random() * canvasWidth) + 1);
        this.y = -10
        this.image = new Image()
        this.speed = speed
        this.dirX = Math.random()>0.5?1:-1
        this.height = height;
        this.width = width
        this.index = enemyIndex
        this.score = score
        this.life =life
    }
    setLife(newLife){
        this.life = newLife
    }
    getLife(){
        return this.life
    }
    move() {
        this.setPosY(this.getPosY() + this.getSpeed())
        this.setPosX(this.getPosX() + this.getSpeed() * this.getDirX())
        if (Math.random() > 0.99) {
            this.getDirX() === 1 ? this.setDirX(-1) : this.setDirX(1)
        }

    }
    shoot(){
        return 
    }
    getScore() {
        return this.score
    }
    setIndex(index) {
        this.index = index
    }
    getIndex() {
        return this.index
    }
    setHeight(height) {
        this.height = height
    }
    setWidth(width) {
        this.width = width
    }
    getHeight() {
        return this.height
    }
    getWidth() {
        return this.width
    }
    getImage() {
        return this.image
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
    getSpeed() {
        return this.speed
    }
    setSpeed(speed) {
        this.speed = speed
    }
    setDirX(direction) {
        this.dirX = direction
    }
    getDirX() {
        return this.dirX
    }
}