class Enemy {
  constructor(src, x, y, width, height){
    this.img = new Image()
    this.img.src = src
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.xVelocity = -4 
    this.yVelocity = 0
  }
  draw(ctx){
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
  }
  moveLeft(){
    this.x += this.xVelocity
  }
  gravityPhysics() {
    this.yVelocity += 1.5; //Simulates gravity so that rectangle fallss
    this.y += this.yVelocity;
    this.yVelocity *= 0.9; //Let's it slow down when we take up the key
  }


}