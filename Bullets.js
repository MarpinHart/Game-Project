class Bullets {
  constructor (canvasWidth,canvasHeight,getPlayerPosY,getPlayerPosX, src){
    this.img = new Image()
    this.img.src = src
    this.width = 10
    this.height = 10
    this.y = getPlayerPosY +11
    this.x = getPlayerPosX +11
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.vx = -8
    this.vy = -8
  }


  //hello from debugging
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
  bottom() {
    this.y -= this.vy;
  }

}