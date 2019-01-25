var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var frame = 0;
var bulletArray = [];
var bulletArray2 = [];
var bulletArray3 = [];

var rectangle = new Player(344, 0, 32, 32, "red");
var playerShots = [];
var frame = 0;
var powers = ["blue", "green"];

var enemies = [];
var tookPower = false;
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
        rectangle.direction = "left";
        break;
      case 38: //Up key
        controller.up = keyState;
        break;
      case 39: //Right key
        controller.right = keyState;
        rectangle.direction = "right";
        break;
      case 32:
        controller.shoot = keyState;
        createBullets();
        break;
    }
  }
};


const createBullets = () => {
  var getPlayerPosX = rectangle.x;
  var getPlayerPosY = rectangle.y;
  var bullet = new Bullets(
    canvas.width,
    canvas.height,
    getPlayerPosY,
    getPlayerPosX,
    "images/bullets.png"
  );
  var bullet2 = new Bullets(
    canvas.width,
    canvas.height,
    getPlayerPosY,
    getPlayerPosX,
    "images/bullets.png"
  );
  var bullet3 = new Bullets(
    canvas.width,
    canvas.height,
    getPlayerPosY,
    getPlayerPosX,
    "images/bullets.png"
  );
  if (rectangle.color === "green") bulletArray3.push(bullet3);
  if (rectangle.direction == "left" || rectangle.color === "blue")
    bulletArray2.push(bullet2);
  if (rectangle.direction == "right" || rectangle.color === "blue")
    bulletArray.push(bullet);
};

var power = new Power();

// END of bullets

function updateEverything() {
  frame++;
  if(frame > 800)
  powerUp(power, rectangle);

  takeDamage(enemies, rectangle);

  removeBulletFromScreen();

  removeEnemey(enemies, bulletArray);

  removeEnemey(enemies, bulletArray2);

  removeEnemey(enemies, bulletArray3);
  console.log("ctx", ctx)
  //rectangle.checkLife(loop)




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

  // Creation of potentiel new enemy based of enemies data
  var newEnemyData = enemiesData.find(
    enemyData => enemyData.frameApparation === frame
  );
  if (newEnemyData) {
    enemies.push(
      new Enemy(newEnemyData.x, newEnemyData.y, 32, 32, newEnemyData.direction)
    );
  }
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].move();
    enemies[i].gravityPhysics();
    collisionDetection(enemies[i]);
  }

  //CREATION OF POWERP

  collisionDetection(rectangle);

  power.gravityPhysics();
  collisionDetection(power);
}
function drawEverything() {
  // background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 720, 480);

  rectangle.draw(ctx);
  if (rectangle.life < 0){
  
    }

  ctx.strokeStyle = "#202830";
  ctx.lineWidth = 4;
  ctx.beginPath();
  //TOP FLOOR
  ctx.rect(110, 250, 500, 0);
  // BOTTOM LEFT CORNER
  ctx.rect(-5, 420, 145, 65); //Left rectangle
  ctx.rect(140, 460, 160, 25); //Right rectangle
  // BOTTOM RIGHT CORNER
  ctx.rect(410, 460, 160, 25); // Left rectangle
  ctx.rect(570, 420, 155, 65); //Right rectangle
  ctx.stroke();
  //CIRCLE
  ctx.font = "30px arial";
  ctx.textAlign = "left";
  ctx.fillText("HEALTH: " + rectangle.life, 25, 50);
  ctx.textAlign = "right";
  ctx.fillText("KILLS: " + rectangle.points, 670, 50);
  //SHOOTING MECHANICS ACCORDING TO CLASS AND DIRECTION
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
  if (rectangle.color == "green") {
    bulletArray3.forEach(bullet3 => bullet3.draw(ctx));
    bulletArray3.forEach(bullet3 => bullet3.bottom(ctx));
  }
  if (frame > 800){
  if (!tookPower) {
    power.draw(ctx);
  }
  }
  // DRAWS AND GIVES PHYSICS TO ENEMY
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw(ctx);
  }
}

var loop = function() {
  updateEverything();
  drawEverything();
  window.requestAnimationFrame(loop);
};

/* var menuLoop = function() {
  ctx.fillStyle = "black"
  ctx.font = "29px arial"
  ctx.fillText("PRESS SPACE TO SHOOT AND ARROWS TO JUMP AND MOVE", 10, 250)
  canvas.addEventListener('click', function(event) {
    loop()}
    
  window.requestAnimationFrame(menuLoop);
};
 */

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
//window.requestAnimationFrame(menuLoop);
window.requestAnimationFrame(loop);

// COLLISION DETECTION FUNCTION
function collisionDetection(element) {
  if (
    element.y > 250 - 32 &&
    element.y < 250 - 28 &&
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
    element.x =  Math.floor(Math.random()*450)+110;
    element.y = 40; //Bottom of the screen
    element.yVelocity = 0; //Once you hit the wall velocity goes to 0
    if(element.life){
      element.life -= 15
    }
  }
}

function removeEnemey(enem, bull) {
  if (enem.length && bull.length) {
    for (var ene = 0; ene < enem.length; ene++) {
      for (var bul = 0; bul < bull.length; bul++) {
        if (hitCheck(bull[bul], enem[ene])) {
          enem.splice(ene, 1);
          bull.splice(bul, 1);
          rectangle.points++;
          console.log("kill");
          return;
        }
      }
    }
  }
}

function powerUp(power, player) {
  if (hitCheck(power, player) && !tookPower) {
    tookPower = true;
    player.color = powers[Math.floor(Math.random() * 2)];
  }
}

function takeDamage(enem, player) {
  if (enem.length) {
    for (var ene = 0; ene < enem.length; ene++) {
      if (hitCheck(enem[ene], player)) {
        rectangle.life--;
        rectangle.xVelocity*=0.5
        console.log(rectangle.life);
      }
    }
  }
}

// collision test
function hitCheck(box1, box2) {
  var box1Right = box1.x + box1.width;
  var box1Bottom = box1.y + box1.height;
  var box2Right = box2.x + box2.width;
  var box2Bottom = box2.y + box2.height;

  if (
    box1Right > box2.x &&
    box2Right > box1.x &&
    box1Bottom > box2.y &&
    box2Bottom > box1.y
  )
    return true;
  else return false;
}

function removeBulletFromScreen() {
  if (bulletArray.length) {
    if (bulletArray[0].x > 720) {
      bulletArray.shift();
    }
  }
  if (bulletArray2.length) {
    if (bulletArray2[0].x < 0) {
      bulletArray2.shift();
    }
  }
  if (bulletArray3.length) {
    if (bulletArray3[0].y > 480) {
      bulletArray3.shift();
    }
  }
}

