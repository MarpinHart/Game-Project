// TODO in this file: create a Platform class
class Platform {
  // If the height is 0, the Platform is just a line 
  constructor(x,y,width,height, border) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height + border
  } 
  draw(ctx) {}
  /* checkCollision(element){
    let pastX = element.formerX + element.width
    let pastY = element.formerY + element.height
    // you need to save element.formerX, element.formerY
    // if you touch the platform that you can see with formerX and formerY, change element.x and element.y
    if(pastX == this.x) element.formerX == pastX
    if(this.y )
  } */
}
/* if pastY > this.y && 
  pastY < this.y + this.border && 
  pastX > this.x && 
  pastX < this.x + this.width */

  element.formerX = pastX - element.width
  element.formerY = pastY - element.height
// TODO in main.js
// var platforms = [new Platform(...),new Platform(...),new Platform(...),new Platform(...),new Platform(...)]

