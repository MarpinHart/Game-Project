var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var rectangle = new Player(344, 0, 32, 32, "#ff0000"/* "#ff0000" */);
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
        rectangle.direction = "left"
        break;
      case 38: //Up key
        controller.up = keyState;
        break;
      case 39: //Right key
        controller.right = keyState;
        rectangle.direction = "right"
        break;
      case 32:
        controller.shoot = keyState;
        createBullets();
        // createBullets2();
        break;
    }
  }
};
var enemy = new Enemy("../images/enemy.png", 344, 0, 32, 32);
/* var enemiesArray = []
const createEnemies = () => {
  enemiesArray.push(enemy)
} */
// START of bullets
var bulletArray = [];
var frame = 0;
var bulletArray2 = [];

const createBullets = () => {
  var getPlayerPosX = rectangle.x;
  var getPlayerPosY = rectangle.y;
  var bullet = new Bullets(
    canvas.width,
    canvas.height,
    getPlayerPosY,
    getPlayerPosX,
    "../images/bullet.png"
  );
  var bullet2 = new Bullets(
    canvas.width,
    canvas.height,
    getPlayerPosY,
    getPlayerPosX,
    "../images/bulletLeft.png"
  );
  if(rectangle.direction == "left" || rectangle.color === "blue")
    bulletArray2.push(bullet2);
  if (rectangle.direction =="right" || rectangle.color === "blue")
    bulletArray.push(bullet);
};

// END of bullets

function updateEverything() {}
function drawEverything() {}

var loop = function() {
  

  // PLAYER MOVEMENT

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

  // Resets PLAYER if drops into the pit
  if (rectangle.y > 480 - 32) {
    setTimeout(function() {
      rectangle.jumping = false; //So we can jump again
      rectangle.x = 344;
      rectangle.y = 0; //Bottom of the screen
      rectangle.yVelocity = 0; //Once you hit the wall velocity goes to 0
    }, 500);
  }

  collisionDetection(rectangle);

  // background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 720, 480);

  rectangle.draw(ctx)

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

  //SHOOTING MECHANICS ACCORDING TO CLASS
  if (rectangle.color == "#ff0000") {
    bulletArray.forEach(bullet => bullet.draw(ctx));
    bulletArray.forEach(bullet => bullet.right(ctx));
    bulletArray2.forEach(bullet2 => bullet2.draw(ctx));
    bulletArray2.forEach(bullet2 => bullet2.left(ctx));
  }
  if (rectangle.color == "blue") {
    bulletArray.forEach(bullet => bullet.draw(ctx));
    bulletArray.forEach(bullet => bullet.right(ctx));
    bulletArray2.forEach(bullet2 => bullet2.draw(ctx));
    bulletArray2.forEach(bullet2 => bullet2.left(ctx));
  }

  // ------- ENEMY GRAVITY
  /* setTimeout(function(){
    createEnemies()
  }, 1000)
  enemiesArray.forEach(enemy => enemy.draw(ctx));
  enemiesArray.forEach(enemy => enemy.moveLeft(ctx));
  enemiesArray.forEach(enemy => enemy.gravityPhysics(ctx)); */
  // Checks walls and floors
  collisionDetection(enemy);
  enemy.draw(ctx)
  enemy.moveLeft(ctx)
  enemy.gravityPhysics(ctx)
  // Resets the enemy at the center
  if (enemy.y > 480 - 32) {
    enemy.x = 344;
    enemy.y = 40; //Bottom of the screen
    enemy.vy = 0; //Once you hit the wall velocity goes to 0
  }

  window.requestAnimationFrame(loop);
};


window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);

// COLLISION DETECTION FUNCTION
function collisionDetection(element) {
  if (
    element.y > 250 - 32 &&
    element.y < 250 - 28 &&
    (element.x > 110 - 32 && element.x < 609)
  ) {
    if (element.jumping !== undefined) {
      element.jumping = false; //So we can jump again
    }
    element.y = 250 - 32; //Bottom of the platform
    element.yVelocity = 0; //Once you hit the wall velocity goes to 0
  }
  // Gets on top of the bottom left corner
  if (element.y > 420 - 32 && element.y < 430 - 28 && element.x < 140 - 5) {
    element.jumping = false; //So we can jump again
    element.y = 420 - 32; //Bottom of the platform
    element.yVelocity = 0; //Once you hit the wall velocity goes to 0
  }
  //WALL
  if (element.x < 139 && element.y > 420 - 32) {
    element.x = 140;
  }

  if (
    element.y > 460 - 32 &&
    element.y < 470 - 28 &&
    element.x > 140 - 32 &&
    element.x < 300
  ) {
    if (element.jumping !== undefined) {
      element.jumping = false; //So we can jump again
    }
    element.y = 460 - 32; //Bottom of the platform
    element.yVelocity = 0; //Once you hit the wall velocity goes to 0
  }
  // Gets on top of the bottom right corner

  if (element.y > 420 - 32 && element.y < 430 - 28 && element.x > 570 - 32) {
    if (element.jumping !== undefined) {
      element.jumping = false; //So we can jump again
    }
    element.y = 420 - 32; //Bottom of the platform
    element.yVelocity = 0; //Once you hit the wall velocity goes to 0
  }
  if (element.x > 567 - 32 && element.y > 420 - 32) {
    element.x = 567 - 32;
  }

  if (
    element.y > 460 - 32 &&
    element.y < 470 - 28 &&
    element.x > 410 - 32 &&
    element.x < 570
  ) {
    if (element.jumping !== undefined) {
      element.jumping = false; //So we can jump again
    }
    element.y = 460 - 32; //Bottom of the platform
    element.yVelocity = 0; //Once you hit the wall velocity goes to 0
  }
//From left corner to right
  if (element.x < -32) {
    element.x = 720;
  } else if (element.x > 720) {
    element.x = -32;
  }
}
