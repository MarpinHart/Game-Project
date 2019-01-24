var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var rectangle = new Player(344, 0, 32, 32, "red");
var playerShots = [];
var frame = 0


var enemies = []

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
var enemy = new Enemy(344, 0, 32, 32);
//var platforms = [new Platform(0, 420, 140, 60),new Platform(140, 460, 160, 20),new Platform(410,460, 160, 20),new Platform(570, 420, 150, 60),new Platform(110, 250, 500,)]
var bulletArray = [];
var frame = 0;
var bulletArray2 = [];
var bulletArray3 = [];

const createBullets = () => {
  var getPlayerPosX = rectangle.x;
  var getPlayerPosY = rectangle.y;
  var bullet = new Bullets(
    canvas.width,
    canvas.height,
    getPlayerPosY,
    getPlayerPosX,
    "images/bullet.png"
  );
  var bullet2 = new Bullets(
    canvas.width,
    canvas.height,
    getPlayerPosY,
    getPlayerPosX,
    "images/bullet.png"
  );
  var bullet3 = new Bullets(
    canvas.width,
    canvas.height,
    getPlayerPosY,
    getPlayerPosX,
    "images/burst.png"
  );
  if (rectangle.direction === "left" && rectangle.color ==="green")
    bulletArray3.push(bullet3)
  if(rectangle.direction == "left" || rectangle.color === "blue")
    bulletArray2.push(bullet2);
  if (rectangle.direction =="right" || rectangle.color === "blue")
    bulletArray.push(bullet);
};



// END of bullets

function updateEverything() {
  frame++
  

  
  removeBulletFromScreen()

  removeEnemey(enemies, bulletArray)

  removeEnemey(enemies, bulletArray2)

  

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
  /* if (rectangle.y > 480 - 32) {
    setTimeout(function() {
      rectangle.jumping = false; //So we can jump again
      rectangle.x = 344;
      rectangle.y = 0; //Bottom of the screen
      rectangle.yVelocity = 0; //Once you hit the wall velocity goes to 0
    }, 500);
  } */

  // Creation of potentiel new enemy based of enemies data
  var newEnemyData = enemiesData.find((enemyData) => enemyData.frameApparation === frame)
  if (newEnemyData) {
    enemies.push(new Enemy(newEnemyData.x, newEnemyData.y, 32, 32, newEnemyData.direction))
  }
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].move()
    enemies[i].gravityPhysics()
    collisionDetection(enemies[i]);
  }


  enemy.move()
  enemy.gravityPhysics()

  collisionDetection(rectangle);
  /* collisionDetection(enemy); */

    



}
function drawEverything() {
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
  //CIRCLE

  //SHOOTING MECHANICS ACCORDING TO CLASS
  if (rectangle.color == "red") {
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
  if (rectangle.color == "green")
    bulletArray3.forEach(bullet3 => bullet3.draw(ctx));
    bulletArray3.forEach(bullet3 => bullet3.left(ctx));
    

  

  enemy.draw(ctx)
// DRAWS AND GIVES PHYSICS TO ENEMY
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw(ctx)
  }

}

var loop = function() {
  updateEverything()
  drawEverything()  
  window.requestAnimationFrame(loop);
};




window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);

// COLLISION DETECTION FUNCTION
function collisionDetection(element) {
  if (
    element.y > 250 - 32 &&
    element.y < 250 -28 &&
    element.x > 110 - 32 &&
    element.x < 609
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
  if (element.y > 480 - 32) {
    element.x = 344;
    element.y = 40; //Bottom of the screen
    element.yVelocity = 0; //Once you hit the wall velocity goes to 0
  }
}


function removeEnemey(enem,bull){
  console.log(bull)
  if (enem.length && bull.length){
    for(var ene = 0; ene<enem.length;ene++){
    for(var bul = 0; bul<bull.length;bul++){ 
      if (hitCheck(bull[bul], enem[ene])) {
        enem.pop(enem[ene])
        bull.pop(bull[bul])
        points++        
        }
      }
    }
   }
  }





// collision test
function hitCheck(box1, box2) {
  var box1Right = box1.x /* + box1.width */
  var box1Bottom = box1.y /* + box1.height */  
  var box2Right = box2.x + box2.width 
  var box2Bottom = box2.y  + box2.height  
  
  if(box1Right > box2.x && box2Right > box1.x && 
    box1Bottom > box2.y && box2Bottom > box1.y) return true;
  else return false
}



function removeBulletFromScreen(){
  if (bulletArray.length){
    if (bulletArray[0].x>720){
      bulletArray.shift()
    }
  }
  if (bulletArray2.length){
    if (bulletArray2[0].x<0){
      bulletArray2.shift()
    } 

  }
  }