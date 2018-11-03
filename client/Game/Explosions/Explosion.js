
import explosion from "./test.png"
// import explosion from "./bigExplosion.png"

export default class Explosion{
  
    constructor(explodeOptions){
        this.image = new Image()
        this.image.src = explosion
        this.explodeOptions =  explodeOptions
        this.index = 0
        this.frameIndexCol = 0
        this.frameIndexRow = 0
    }
    getIndex(){
        return this.index
    }
    getWidth(){
        return this.explodeOptions.width
    }
    getHeight(){
        return this.explodeOptions.height
    }
    getImage(){
        return this.explodeOptions.image
    }
    restTickCount(){
        this.explodeOptions.tickCount = 0
    }
    incrementTickCount(){
        this.explodeOptions.tickCount ++
        if(this.explodeOptions.tickCount>this.explodeOptions.tickPerFrame){
            this.explodeOptions.tickCount = 0
            if(this.frameIndexCol>this.explodeOptions.cols-2 && this.frameIndexRow<this.explodeOptions.rows){
                this.frameIndexCol=0
                this.frameIndexRow++
            }else if(this.frameIndexCol<this.explodeOptions.cols){
                
                this.frameIndexCol++
            }
           
        }
    }
    getTickCount(){
        return this.explodeOptions.tickCount
    }
    getFrameIndexCol(){
        return this.frameIndexCol
    }
    getFrameIndexRow(){
        return this.frameIndexRow
    }
    setFrameIndexCol(frameIndexCol){
        this.frameIndexCol = frameIndexCol
    }
    getPosX(){
        return this.explodeOptions.posX
    }
    getPosY(){
        return this.explodeOptions.posY
    }
    getIndex(){
        return this.explodeOptions.explosionIndex
    }
}
