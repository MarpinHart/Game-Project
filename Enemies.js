class Enemies {
  constructor(src, x, y, width, height){
    this.img = new Image()
    this.img.src = src
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.vx = -5
    this.vy = 0
  }
  draw(){
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
  }
  moveLeft(){
    this.x += this.vx
  }
  gravityPhysics() {
    this.vy += 1.5; //Simulates gravity so that rectangle fallss
    this.y += this.vy;
    this.vy *= 0.9; //Let's it slow down when we take up the key
  }

}