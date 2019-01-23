class Player {
  constructor(x, y, width, height, color){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.xVelocity = 0
    this.yVelocity = 0
    this.jumping = true
    this.color = color
    this.direction = "right"
    this.life = 3
  }
  movingPhysics() {
    this.yVelocity += 1.5; //Simulates gravity so that rectangle falls
    this.x += this.xVelocity; //Add xy velocity to the current position
    this.y += this.yVelocity;
    this.xVelocity *= 0.9; //Simulates friction reducing the velocity
    this.yVelocity *= 0.9; //Let's it slow down when we take up the key
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

}