class Bullets {
  constructor (canvasWidth,canvasHeight,getPlayerPosY,getPlayerPosX, src){
    this.img = new Image()
    this.img.src = src
    this.width = 20
    this.height = 30
    this.y = getPlayerPosY +2
    this.x = getPlayerPosX +2
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.vx = -8
  }
  draw(ctx){
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)    
  }
  right(){
    this.x -= this.vx
  }
  left() {
    this.x += this.vx;
  }
  both() {
    this.x -= this.vx
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }


}