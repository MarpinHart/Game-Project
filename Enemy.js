class Enemy {
  constructor(x, y, width, height, direction = "left"){
    this.img = new Image()
    this.img.src = "images/enemy.png"
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.direction = direction
    this.xVelocity = 4 
    this.yVelocity = 0
  }
  draw(ctx){
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
  }
  move(){
    this.x += this.xVelocity * (this.direction === "right" ? 1 : -1)
  }
  gravityPhysics() {
    this.yVelocity += 1.5; //Simulates gravity so that rectangle fallss
    this.y += this.yVelocity;
    this.yVelocity *= 0.9; //Let's it slow down when we take up the key
  }


}