
var PLAY = 1;
var END = 0;
var gameState;

var counter = 0;

var bananaImg,monkeyImg,obstacleImg,obstacleGroup,backgroundImg,score,bananaGroup,monkey,ground,jungle,banana,obstacle;


function preload(){
  monkeyImg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backgroundImg = loadImage("jungle.jpg");
  
  bananaImg = loadImage("banana.png");
  
  obstacleImg = loadImage("stone.png");
  
  bananaGroup = new Group;
  
  obstacleGroup = new Group;  
 
}

function setup() {
 createCanvas(800, 400);
     
  jungle = createSprite(400,200,10,20);
  jungle.addImage(backgroundImg);
  jungle.scale = 1;
  jungle.x = 400;
  jungle.velocityX = -6;
  
  monkey= createSprite(80,380,20,20);
  monkey.addAnimation("monkeyAnimation",monkeyImg);
  monkey.scale = 0.2;
  
  ground = createSprite(400,395,800,20);
  ground.visible = false;
  
  score = 0;
  
  gameState = 1;
  
}

function draw() {
  background(220);
  
  if(gameState === 1){
    
     //monkey.visible = true;
     jungle.visible = true;
     banana.visible = true;
     obstacle.visible = true;
    
    if(monkey.y >= 280 && keyDown("space")){

    monkey.velocityY = -20;

    }

    monkey.velocityY = monkey.velocityY + 1;

    if(jungle.x < 400){
    jungle.x = 500;
     }

    monkey.collide(ground);

    banana();
    obstacle(); 

    if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score = score = score + 2; 
     }

    switch(score){      
      case 10:
        monkey.scale = 0.22;
        break;
      case 20:
        monkey.scale = 0.24;
        break;
      case 30:
        monkey.scale = 0.26;
        break;
      case 40:
        monkey.scale = 0.28;
        break;
      case 50:
        monkey.scale = 0.3;
        break;  
      default:
        break; 
    }


    if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.destroyEach();
    monkey.scale = 0.2;
    score = score - 10;
    counter = counter + 1;

      if(counter === 2){
    gameState = 0;
    counter = 0;
    } 
  }

}
  
  if(gameState === 0){
     //monkey.visible = false;
     jungle.visible = false;
     banana.visible = false;
     obstacle.visible = false;
     ground.visible = false;
     score = 0;
     monkey.collide(ground);
     textSize(64);
     fill("blue");
     text("Press 'SPACE' To Restart",30,200);
     }
  
  if(keyDown("space")){
     gameState = 1;
     }
  
 drawSprites();
  
 textSize(32);
 fill("red");
 text("Score : " + score,620,50);

}

function banana(){
  if(World.frameCount % 80 === 0){
    var banana = createSprite(Math.round(random(200,700)),Math.round(random(120,200)));
    banana.addImage(bananaImg);
    banana.scale = 0.06;
    banana.velocityX = -7;
    banana.lifetime = 105;
    bananaGroup.add(banana);
  }
}

function obstacle(){
  if(World.frameCount % 300 === 0){
    var obstacle = createSprite(Math.round(random(400,600)),360);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.2;
    obstacle.velocityX = -10;
    obstacle.lifetime = 65;
    obstacleGroup.add(obstacle);
  }
} 








