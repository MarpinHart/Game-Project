var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var rectangle = {
  height: 32,
  jumping: true,
  width: 32,
  x: 304, //Center the canvas
  xVelocity: 0,
  y: 0,
  yVelocity: 0 //Speed of the square
};

var controller = {
  //Keep track of the state of the key pressed
  left: false,
  right: false,
  up: false,

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
    }
  }
};

var loop = function() {
  //Controller with physics

  if (controller.up && rectangle.jumping == false) {
    rectangle.yVelocity -= 40; //Send the rectangle shooting upwards
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

  if (rectangle.y > 480 - 32) {
    rectangle.jumping = false; //So we can jump again
    rectangle.y = 480 - 32; //Bottom of the screen
    rectangle.yVelocity = 0; //Once you hit the wall velocity goes to 0
  }

  if (rectangle.x < -32) {
    //From left corner to right
    rectangle.x = 640;
  } else if (rectangle.x > 640) {
    rectangle.x = -32;
  }
  ctx.fillStyle = "white";
  ctx.fillRect(0,0, 640, 480)
  ctx.fillStyle = "#ff0000";
  ctx.beginPath();
  ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  ctx.fill();

  ctx.strokeStyle = "#202830";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 300);
  ctx.lineTo(280, 300);
  ctx.stroke();

  ctx.strokeStyle = "#202830";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(400, 150);
  ctx.lineTo(640, 150);
  ctx.stroke();
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
