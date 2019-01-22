var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var rectangle = new Player(344, 0, 32, 32);
/* var bullet = {
  height: 2,
  width: 2,
  x: rectangle.x+10,
  y: rectangle.y+10,
  xVelocity: 0,
} */
var playerShots = [];

var controller = {
  //Keep track of the state of the key pressed
  left: false,
  right: false,
  up: false,
  /* shoot:false, */

  keyListener: function(event) {
    //Key state returned to check event type and stops from moving
    var keyState = event.type == "keydown" ? true : false;
    switch (event.keyCode) {
      case 37: //Left key
        controller.left = keyState;
        break;
      case 38: //Up key
        controller.up = keyState;
        break;
      case 39: //Right key
        controller.right = keyState;
        break;
      /* case 32:
        controller.shoot = keyState;
        break; */
    }
  }
};

/* var bulletsArray = []

function drawBullets() {
  bulletsArray.forEach(element => {
    element.x -= element.xVelocity
    ctx.rect(element.x, element.y, element.width, element.height)
  })
} */

var loop = function() {
  /* if(controller.shoot){
    console.log("shoot")
    let bullet = {
      y: rectangle.y,
      x: rectangle.x,
      xVelocity: 0,
      yVelocity:0,
      width: 2,
      height: 2,
    }
    bullet.xVelocity = 0.7
    bullet.x += bullet.xVelocity
    bulletsArray.push(bullet)
    drawBullets()
    console.log(bulletsArray)
  } */

  if (controller.up && rectangle.jumping == false) {
    rectangle.yVelocity -= 38; //Send the rectangle shooting upwards
    rectangle.jumping = true; //So that doesn't jump again when is in the air
  }
  if (controller.left) {
    rectangle.xVelocity -= 0.5;
  }

  if (controller.right) {
    rectangle.xVelocity += 0.5;
  }
  // Gives friction and gravity
  rectangle.movingPhysics();

  // Resets if drops into the pit

  if (rectangle.y > 480 - 32) {
    setTimeout(function() {
      rectangle.jumping = false; //So we can jump again
      rectangle.x = 344;
      rectangle.y = 0; //Bottom of the screen
      rectangle.yVelocity = 0; //Once you hit the wall velocity goes to 0
    }, 500);
  }
  // GETS ON TOP OF THE FIRST floor
  if (
    rectangle.y > 250 - 32 &&
    rectangle.y < 250 - 28 &&
    (rectangle.x > 110 - 32 && rectangle.x < 609)
  ) {
    rectangle.jumping = false; //So we can jump again
    rectangle.y = 250 - 32; //Bottom of the platform
    rectangle.yVelocity = 0; //Once you hit the wall velocity goes to 0
  }
  // Gets on top of the bottom left corner
  if (
    rectangle.y > 420 - 32 &&
    rectangle.y < 430 - 28 &&
    rectangle.x < 140 - 5
  ) {
    rectangle.jumping = false; //So we can jump again
    rectangle.y = 420 - 32; //Bottom of the platform
    rectangle.yVelocity = 0; //Once you hit the wall velocity goes to 0
  }
  //WALL
  if (rectangle.x < 139 && rectangle.y > 420 - 32) {
    rectangle.x = 140;
  }

  if (
    rectangle.y > 460 - 32 &&
    rectangle.y < 470 - 28 &&
    rectangle.x > 140 - 32 &&
    rectangle.x < 300
  ) {
    rectangle.jumping = false; //So we can jump again
    rectangle.y = 460 - 32; //Bottom of the platform
    rectangle.yVelocity = 0; //Once you hit the wall velocity goes to 0
  }
  // Gets on top of the bottom right corner

  if (
    rectangle.y > 420 - 32 &&
    rectangle.y < 430 - 28 &&
    rectangle.x > 570 - 32
  ) {
    rectangle.jumping = false; //So we can jump again
    rectangle.y = 420 - 32; //Bottom of the platform
    rectangle.yVelocity = 0; //Once you hit the wall velocity goes to 0
  }
  if (rectangle.x > 567 - 32 && rectangle.y > 420 - 32) {
    rectangle.x = 567 - 32;
  }

  if (
    rectangle.y > 460 - 32 &&
    rectangle.y < 470 - 28 &&
    rectangle.x > 410 - 32 &&
    rectangle.x < 570
  ) {
    rectangle.jumping = false; //So we can jump again
    rectangle.y = 460 - 32; //Bottom of the platform
    rectangle.yVelocity = 0; //Once you hit the wall velocity goes to 0
  }

  if (rectangle.x < -32) {
    //From left corner to right
    rectangle.x = 720;
  } else if (rectangle.x > 720) {
    rectangle.x = -32;
  }
  // background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 720, 480);
  ctx.fillStyle = "#ff0000";
  ctx.beginPath();
  ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  ctx.fill();

  ctx.strokeStyle = "#202830";
  ctx.lineWidth = 4;
  ctx.beginPath();
  //TOP FLOOR
  ctx.rect(110, 250, 500, 0);
  // BOTTOM LEFT CORNER
  ctx.rect(0, 420, 140, 60); //Left rectangle
  ctx.rect(140, 460, 160, 20); //Right rectangle
  // BOTTOM RIGHT CORNER
  ctx.rect(410, 460, 160, 20); // Left rectangle
  ctx.rect(570, 420, 150, 60); //Right rectangle
  ctx.stroke();
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
