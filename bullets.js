class Bullets {
  constructor (canvasWidth,canvasHeight,getPlayerPosY,getPlayerPosX){
    this.img = new Image()
    this.img.src = "../images/bullet.png"
    this.width = 200
    this.height = 200
    this.y = getPlayerPosY
    this.x = getPlayerPosX
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.vx = -2
  }
  draw(ctx){
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
  }
  update(){
    this.x += this.vx
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }


}