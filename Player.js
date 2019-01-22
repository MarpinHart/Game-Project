class Player {
  constructor(x, y, width, height){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.xVelocity = 0
    this.yVelocity = 0
    this.jumping = true
  }
  movingPhysics() {
    this.yVelocity += 1.5; //Simulates gravity so that rectangle falls
    this.x += this.xVelocity; //Add xy velocity to the current position
    this.y += this.yVelocity;
    this.xVelocity *= 0.9; //Simulates friction reducing the velocity
    this.yVelocity *= 0.9; //Let's it slow down when we take up the key

  }
  
  }


/* if (
  rectangle.y > 420 - 32 &&
  rectangle.y < 430 - 28 &&
  rectangle.x > 570 -32 

  rectangle.x < 140 -5
) {
  rectangle.jumping = false; //So we can jump again
  rectangle.y = 420 - 32; //Bottom of the platform
  rectangle.yVelocity = 0; //Once you hit the wall velocity goes to 0
}

if (
  rectangle.y > 460 - 32 &&
  rectangle.y < 470 - 28 &&
  rectangle.x > 410 -32 &&
  rectangle.x < 570

  rectangle.x > 140 - 32 &&
  rectangle.x < 300
) {
  rectangle.jumping = false; //So we can jump again
  rectangle.y = 460 - 32; //Bottom of the platform
  rectangle.yVelocity = 0; //Once you hit the wall velocity goes to 0
}
 */