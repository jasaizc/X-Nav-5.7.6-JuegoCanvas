// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";

//stone image
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function(){
  stoneReady = true;  
}
stoneImage.src = "images/stone.png"
//Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
  monsterReady = true;  
}
monsterImage.src = "images/monster.png"
// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {
  speed: 50 // movement in pixels per second
};
var princess = {};
var princessesCaught = 0;
var stones = [];
var totalpiedras
var numeroPiedras = 3;
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a princess

var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
  var Aparecer = parseInt(Math.random() * 4);
  if(Aparecer == 2 || Aparecer == 3)
  {
    monster.x = 32 + (Math.random() * (canvas.width - 96));
    monster.y = 32;
  }
  else{
    monster.x = 32;
    monster.y = 32 + (Math.random() * (canvas.width - 96));
  }
  stones = [];
	// Throw the princess somewhere on the screen randomly
	princess.x = 32 + (Math.random() * (canvas.width - 96));
	princess.y = 32 + (Math.random() * (canvas.height - 96));
  for (var i = 0; i < numeroPiedras; i++) 
  {
    var stone = {};
    do
    {
      var piedra = CoordenadasPiedras(stone);
    }while(piedra == false)
    stones[i] = piedra;
  }
};
var CoordenadasPiedras = function(stone)
{
    stone.x = parseInt(32 + (Math.random() * (canvas.width - 96)));
    stone.y = parseInt(32 + (Math.random() * (canvas.height - 96))); 

    
    for (var i = 0; i < stones.length; i++) 
    {
      if(stone.x <= (stones[i].x + 32)
         && stones[i].x <= (stone.x + 32)
         && stone.y <= (stones[i].y + 32)
		     && stones[i].y <= (stone.y + 32))
      {      
        return false;
      }       
    }
    if(stone.x <= parseInt(hero.x + 32)
         && parseInt(hero.x) <= (stone.x + 32)
  	     && stone.y <= parseInt(hero.y + 32)
		     && parseInt(hero.y) <= (stone.y + 32))
        {
          return false;
    }
    if(
            stone.x <= parseInt(princess.x + 32)
         && parseInt(princess.x) <= (stone.x + 32)
		     && stone.y <= parseInt(princess.y + 32)
		     && parseInt(princess.y) <= (stone.y + 32))
      {
        return false;
      }
      if(
            stone.x <= parseInt(monster.x + 32)
         && parseInt(monster.x) <= (monster.x + 32)
  	     && stone.y <= parseInt(princess.y + 32)
		     && parseInt(monster.y) <= (monster.y + 32))
      {
        return false;
      }
    return stone;
}
var colision = function ()
{
  for (var i = 0; i < stones.length; i++) 
    {
      if(stones[i].x <= parseInt(hero.x + 28)
         && parseInt(hero.x) <= (stones[i].x + 28)
  	     && stones[i].y <= parseInt(hero.y + 28)
		     && parseInt(hero.y) <= (stones[i].y + 28))
        {
          return true;
        }
    }  
  return false;
}
var colisionMonster = function ()
{
  for (var i = 0; i < stones.length; i++) 
    {
      if(stones[i].x <= parseInt(monster.x + 28)
         && parseInt(monster.x) <= (stones[i].x + 28)
         && stones[i].y <= parseInt(monster.y + 28)
		     && parseInt(monster.y) <= (stones[i].y + 28))
        {
          return true;
        }
    }  
  return false;
}
var movimientomonster = function(modifier)
{
  restax = parseInt(monster.x - hero.x);
  restay = parseInt(monster.y - hero.y);
  if(restax > 0)
  {
    monster.x -= monster.speed * modifier;
    if(colisionMonster())
      {
        monster.x += monster.speed * modifier;
      }  
  }
  if(restay > 0)
  {
    monster.y -= monster.speed * modifier;
    if(colisionMonster())
      {
        monster.y += monster.speed * modifier;
      } 
  }
    if(restax < 0)
  {
    monster.x += monster.speed * modifier;
    if(colisionMonster())
      {
        monster.x -= monster.speed * modifier;
      }  
  }
  if(restay < 0)
  {
    monster.y += monster.speed * modifier;
    if(colisionMonster())
      {
        monster.y -= monster.speed * modifier;
      } 
  }
}
// Update game objects
var update = function (modifier) {
    movimientomonster(modifier);
    if (38 in keysDown && hero.y > 32 ) { // Player holding up
  	  hero.y -= hero.speed * modifier;
      if(colision())
      {
        hero.y += hero.speed * modifier;
      }    
	}
	if (40 in keysDown && hero.y < (canvas.height - 64) ) { // Player holding down
		hero.y += hero.speed * modifier;
    if(colision())
      {
        hero.y -= hero.speed * modifier;
      }
    }
	if (37 in keysDown && hero.x > 32 ) { // Player holding left
		hero.x -= hero.speed * modifier;
    if(colision())
      {
        hero.x += hero.speed * modifier;
      }
	}
	if (39 in keysDown && hero.x < (canvas.width - 64)) { // Player holding right
		hero.x += hero.speed * modifier;
    if(colision())
      {
        hero.x -= hero.speed * modifier;
      }
	}
	// Are they touching?
	if (
		hero.x <= (princess.x + 25)
		&& princess.x <= (hero.x + 25)
		&& hero.y <= (princess.y + 25)
		&& princess.y <= (hero.y + 25)
	) {
		++princessesCaught;
    if (princessesCaught%10 == 0)
    {
      numeroPiedras = numeroPiedras + 3;
      monster.speed = monster.speed + 20;
    }
		reset();
	}
    if (
		hero.x <= (monster.x + 25)
		&& monster.x <= (hero.x + 25)
		&& hero.y <= (monster.y + 25)
		&& monster.y <= (hero.y + 25)
	) {
		princessesCaught = 0;
    numeroPiedras = 3;
    monster.speed = 50;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}
    if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
    if (stoneReady) {
    for (var i = 0; i < numeroPiedras; i++) 
  {
    ctx.drawImage(stoneImage, stones[i].x, stones[i].y);
  }
	}
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses caught: " + princessesCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible
