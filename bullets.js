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
    /* this.radius = 10
    this.startAngle = 0
    this.endAngle = Math.PI*2; */
  }
  draw(ctx){
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    /* ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true)
    ctc */
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