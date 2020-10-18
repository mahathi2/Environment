var PLAY = 1
var END = 0
var FIRE = 2
var gameState = PLAY;
var deer, ground, dr, iGround, count, deer_running,
log, cloud, cloud1, lg,
fire, fe, bird, bird_running
LogsGroup, CloudsGroup, FireGroup;

function preload(){
 deer_running = loadAnimation("d11.png","d22.png","d33.png","d44.png","d55.png");
 bird_running = loadAnimation("b1.jpg","b2.jpg","b3.jpg","b4.jpg");
 cloud1 = loadImage("cloud.png");
 lg = loadImage("log.png");
 dr = loadImage("dd2.png");
 fe = loadImage("fire.png")
}

function setup() {
  createCanvas(800,400);
  deer = createSprite(400, 300, 50, 50);
deer.addAnimation("running",deer_running);

bird = createSprite(400, 200, 50, 50);
bird.addAnimation("rg",bird_running);
bird.visible=false;

ground = createSprite(400,390,800,20);
iGround = createSprite(400,380,800,20);
iGround.visible = false;

count = 0
LogsGroup = new Group();
CloudsGroup = new Group();
FireGroup = new Group();
}

function draw() {
  background(255,255,255);
  textSize (25);
 text("Score:"+ count, 150, 60);
 deer.collide(iGround);
 
 deer.debug = true;
console.log(gameState);

 if(gameState===PLAY){
  deer.setCollider("rectangle", 0, 0, 70, 75);  
 deer.scale = 0.95

  if (keyDown("space")){
    deer.velocityY = -10;
  }
  deer.velocityY= deer.velocityY + 0.8;
  count = Math.round(frameCount/4);
  spawnLogs();
  spawnClouds();
  

  if(LogsGroup.isTouching(deer)){
    gameState = FIRE;
  }
 }
 
 if (gameState===FIRE){
   deer.velocityX = 0;
   deer.setCollider("rectangle",-50,0,deer.width - 30,150,45);
  deer.addImage("running", dr);
  deer.scale= 0.42;

LogsGroup.destroyEach();
CloudsGroup.destroyEach();
deer.destroy();
bird.x = 400;
bird.y = 300;
bird.visible=true;
ground.visible = false;

if (keyDown("UP_ARROW")){
  bird.y = bird.y - 5;
  console.log(bird.y);
}

if (keyDown("DOWN_ARROW")){
  bird.velocityY = 5
}

spwanFire();
   gameState = FIRE;
 }

 if(gameState===FIRE){

 }
  
 drawSprites();
}

function spawnLogs() {
  if(frameCount%60 === 0){
log = createSprite(800,370,40,40);
log.addImage("l1",lg);
log.velocityX = -5
log.scale = 0.15;
LogsGroup.add(log);
log.lifetime = 160
log.setCollider("rectangle", 0, 0, log.width - 190, log.height- 90);
log.debug = true;
  }
}

function spwanFire(){
  if(frameCount%60===0){
fire = createSprite(800,370,40,40)
fire.addImage("f1",fe);
fire.velocityY = -5
fire.scale = 0.2
fire.x = random(50,750);
fire.lifetime = 160
FireGroup.add(fire);

  }
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
  cloud = createSprite(800,220,40,10);
  cloud.velocityX = -3;
  cloud.addImage("c1", cloud1);
  cloud.scale=0.25;
cloud.lifetime = 267
  cloud.y = random(100,200);
  CloudsGroup.add(cloud);
}
}