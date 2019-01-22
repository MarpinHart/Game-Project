var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var rectangle = {
  height: 32,
  jumping: true,
  width: 32,
  x: 344, //Center the canvas
  xVelocity: 0,
  y: 0,
  yVelocity: 0 //Speed of the square
};

var controller = {
  //Keep track of the state of the key pressed
  left: false,
  right: false,
  up: false,
  //shoot:false,

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


var loop = function() {
  console.log("y", rectangle.y);
  console.log("x", rectangle.x);
  console.log("xvelocity", rectangle.xVelocity);
  console.log("yvelocity", rectangle.yVelocity);

  //Controller with physics

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

  rectangle.yVelocity += 1.5; //Simulates gravity so that rectangle falls
  rectangle.x += rectangle.xVelocity; //Add xy velocity to the current position
  rectangle.y += rectangle.yVelocity;
  rectangle.xVelocity *= 0.9; //Simulates friction reducing the velocity
  rectangle.yVelocity *= 0.9; //Let's it slow down when we take up the key
  // Resets if drops into the pit
  if (rectangle.y > 480 - 32) {
    setTimeout(function(){
      rectangle.jumping = false; //So we can jump again
    rectangle.x = 344
    rectangle.y = 0; //Bottom of the screen
    rectangle.yVelocity = 0; //Once you hit the wall velocity goes to 0
    }, 500)
    
  }
  // GETS ON TOP OF THE FIRST floor
  if (
    rectangle.y > 250 - 32 &&
    rectangle.y < 250 - 28 &&
    (rectangle.x > 110 -32 && rectangle.x < 609)
  ) {
    rectangle.jumping = false; //So we can jump again
    rectangle.y = 250 - 32; //Bottom of the platform
    rectangle.yVelocity = 0; //Once you hit the wall velocity goes to 0
  }
  // Gets on top of the bottom left corner
  if (
    rectangle.y > 420 - 32 &&
    rectangle.y < 430 - 28 &&
    rectangle.x < 140 -5
  ) {
    rectangle.jumping = false; //So we can jump again
    rectangle.y = 420 - 32; //Bottom of the platform
    rectangle.yVelocity = 0; //Once you hit the wall velocity goes to 0
  }
  if (
    rectangle.x < 139 &&
    rectangle.y > 420 -32
  ) {
    rectangle.x = 140
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
    rectangle.x > 570 -32
  ) {
    rectangle.jumping = false; //So we can jump again
    rectangle.y = 420 - 32; //Bottom of the platform
    rectangle.yVelocity = 0; //Once you hit the wall velocity goes to 0
  }
  if (
    rectangle.x > 567 - 32 &&
    rectangle.y > 420 -32
  ) {
    rectangle.x = 567-32
  }

  if (
    rectangle.y > 460 - 32 &&
    rectangle.y < 470 - 28 &&
    rectangle.x > 410 -32 &&
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

  /* const level1 =
  {
    y:480,
    x:700
  } */

  //TOP FLOOR
  ctx.strokeStyle = "#202830";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(110, 250);
  ctx.lineTo(610, 250);
  ctx.stroke();
  // BOTTOM LEFT CORNER
  ctx.beginPath();
  ctx.moveTo(0, 420);
  ctx.lineTo(140, 420);
  ctx.lineTo(140, 460);
  ctx.lineTo(300, 460);
  ctx.lineTo(300, 480);
  ctx.stroke();
  // BOTTOM RIGHT CORNER
  ctx.beginPath();
  ctx.moveTo(410, 480);
  ctx.lineTo(410, 460);
  ctx.lineTo(570, 460);
  ctx.lineTo(570, 420);
  ctx.lineTo(720, 420);
  ctx.stroke();

  ctx.strokeRect(rectangle.x+ 10, rectangle.y+10, 2, 2 )
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
