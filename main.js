var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var rectangle = new Player(344, 0, 32, 32,"#ff0000");
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
      case 32:
        controller.shoot = keyState
          createBullets()
          createBullets2()
        break;
    }
  }
};

var enemy = new Enemies("../images/enemy.png", 344, 0, 32, 32)
// START of bullets

var bulletArray = []
var frame = 0
var bulletArray2 = []

const createBullets = () => {  
  var getPlayerPosX = rectangle.x
  var getPlayerPosY = rectangle.y
  var bullet = new Bullets (canvas.width,canvas.height,getPlayerPosY,getPlayerPosX, "../images/bullet.png")
  bulletArray.push(bullet)
}
const createBullets2 = () => {  
  var getPlayerPosX = rectangle.x
  var getPlayerPosY = rectangle.y
  var bullet2 = new Bullets (canvas.width,canvas.height,getPlayerPosY,getPlayerPosX, "../images/bulletLeft.png")
  bulletArray2.push(bullet2)
}


// END of bullets

var loop = function() {

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
  ctx.fillStyle = rectangle.color;
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
  
  if (rectangle.color == "#ff0000"){
  bulletArray.forEach(bullet => bullet.draw(ctx))
  bulletArray.forEach(bullet => bullet.right(ctx))
  }
  if (rectangle.color == "blue"){
  bulletArray.forEach(bullet => bullet.draw(ctx))
  bulletArray.forEach(bullet => bullet.right(ctx))
  bulletArray2.forEach(bullet2 => bullet2.draw(ctx))
  bulletArray2.forEach(bullet2 => bullet2.left(ctx)) 
  }

  // ------- ENEMY GRAVITY
    
  enemy.draw(ctx)
  enemy.moveLeft(ctx)
  enemy.gravityPhysics(ctx)

  
  
  if (
    enemy.y > 250 - 32 &&
    enemy.y < 250 - 28 &&
    (enemy.x > 110 - 32 && enemy.x < 609)
  ) {
    enemy.y = 250 - 32; //Bottom of the platform
    enemy.vy = 0; //Once you hit the wall velocity goes to 0
  }
  // Gets on top of the bottom left corner
  if (
    enemy.y > 420 - 32 &&
    enemy.y < 430 - 28 &&
    enemy.x < 140 - 5
  ) {
    enemy.y = 420 - 32; //Bottom of the platform
    enemy.vy = 0; //Once you hit the wall velocity goes to 0
  }
  //WALL
  if (enemy.x < 139 && enemy.y > 420 - 32) {
    enemy.x = 140;
  }

  if (
    enemy.y > 460 - 32 &&
    enemy.y < 470 - 28 &&
    enemy.x > 140 - 32 &&
    enemy.x < 300
  ) {
    enemy.y = 460 - 32; //Bottom of the platform
    enemy.vy = 0; //Once you hit the wall velocity goes to 0
  }
  // Gets on top of the bottom right corner

  if (
    enemy.y > 420 - 32 &&
    enemy.y < 430 - 28 &&
    enemy.x > 570 - 32
  ) {
    enemy.y = 420 - 32; //Bottom of the platform
    enemy.vy = 0; //Once you hit the wall velocity goes to 0
  }
  if (enemy.x > 567 - 32 && enemy.y > 420 - 32) {
    enemy.x = 567 - 32;
  }

  if (
    enemy.y > 460 - 32 &&
    enemy.y < 470 - 28 &&
    enemy.x > 410 - 32 &&
    enemy.x < 570
  ) {
    enemy.y = 460 - 32; //Bottom of the platform
    enemy.vy = 0; //Once you hit the wall velocity goes to 0
  }
  if (enemy.x < -32) {
    //From left corner to right
    enemy.x = 720;
  } else if (enemy.x > 720) {
    enemy.x = -32;
  }
  if (enemy.y > 480 - 32) {
      enemy.x = 344;
      enemy.y = 0; //Bottom of the screen
      enemy.vy = 0; //Once you hit the wall velocity goes to 0
  }


  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
