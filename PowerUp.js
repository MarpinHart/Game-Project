class Power {
  constructor(){
    this.x = Math.floor(Math.random()*610)+110;
    this.y = 40
    this.img = new Image()
    this.img.src = "images/powerup.png"
    this.width = 32
    this.height = 32
    this.left = function(){return this.x}
    this.right = function(){return (this.x + this.width)}
    this.top = function () {return this.y}
    this.bottom = function() {return (this.y + this.height)}
}
gravityPhysics() {
  this.yVelocity += 1.5; //Simulates gravity so that rectangle fallss
  this.y += this.yVelocity;
  this.yVelocity *= 0.9; //Let's it slow down when we take up the key
}
draw(ctx){
  ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
}
checkCollusion(player){
  if(this.x ){}
}
powerUp(player){
  
}
}