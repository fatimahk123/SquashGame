var SERVE=0;
var PLAY=1;
var WIN=2;
var END=3;
var gameState=SERVE;

var playButton, playButtonImg;
var court, courtImg;
var iconImg;
var player, person1Img;
var player2, person2Img;
var target, targetImg;
var ball,ballImg;
var win, winImg;
var gameover, gameoverImg;
var restart, restartImg;
var edges;

var score=0;



function preload(){
playButtonImg=loadImage("assets/playbtn.png");
courtImg=loadImage("assets/Court.png");
iconImg=loadImage("assets/GameSquash.jpg");
person1Img=loadImage("assets/Person1.png");
person2Img=loadImage("assets/Person2.png");
targetImg = loadImage("assets/Target.png");
ballImg=loadImage("assets/Ball1.png");
winImg=loadImage("assets/Win.png");
gameoverImg=loadImage("assets/GameOver.png");
restartImg=loadImage("assets/Restart.png");
}


function setup(){
canvas = createCanvas(windowWidth, windowHeight);


playButton=createSprite(450,400,40,40);
playButton.addImage(playButtonImg);
playButton.scale=0.4;

player = createSprite(100,550,40,70);
player.addImage(person1Img);
player.scale=0.5;
player.visible=false;

player2 = createSprite(100,550,40,70);
player2.addImage(person2Img);
player2.visible=false;
player2.scale=1.5;

target = createSprite(450,250);
target.addImage(targetImg);
target.visible=false;
target.velocityY=4;
target.velocityX=4;

ball = createSprite(100,200);
ball.addImage(ballImg);
ball.visible=false;
ball.scale=0.25;
ball.velocityY=5;
ball.velocityX=5;

player.debug=true;
player.setCollider("circle",0,0,40);

player2.debug=true;
player2.setCollider("circle",0,0,40);

ball.setCollider("circle",0,0,30);
ball.debug=true;

target.setCollider("circle",0,0,30);
target.debug=true;

win = createSprite(300,350,20,20);
win.addImage(winImg);
win.visible=false;

gameover = createSprite(300,350,20,20);
gameover.addImage(gameoverImg);
gameover.visible=false;
gameover.scale=0.5;

restart = createSprite(400,350,20,20);
restart.addImage(restartImg);
restart.visible=false;
restart.scale=0.3

}


function draw(){
 //gamestate is serve
  if(gameState===SERVE){
    background(iconImg);
    textSize(40);
    fill("red");
    text("Click Play Button to Start",windowWidth/2, windowHeight/2);
    
    if(mousePressedOver(playButton)){
      gameState=PLAY;
    
      playButton.destroy();
    }
  }
  //gamestate is play
  if(gameState===PLAY){

    background(courtImg)
    ball.visible=true;
    player.visible=true;
    player.x=World.mouseX;
    player.y=World.mouseY;

    player.depth = player.depth+1;
    player2.depth = player2.depth+1;

    if(keyDown("space")){
      player.visible=false;
      player2.visible=true;
      player2.x=World.mouseX;
      player2.y=World.mouseY;
      if(ball.isTouching(player2)){
        ball.bounceOff(player2);
        }
      }
      
      if(keyWentUp("space")){
        player2.visible=false;
      }
      target.visible=true;
      ball.visible=true;
      ball.depth=player2.depth;
      player2.depth=player2.depth+1;
      edges=createEdgeSprites();
      topEdge=createEdgeSprites();
      ball.bounceOff(edges);
      if(ball.isTouching(topEdge)){
        score=score-1;
      }
      target.bounceOff(edges);
      
      if(score === -20){
        gameState=END;
      }
      if(score === 20){
        gameState=WIN;
      }
      if(ball.isTouching(player)){
      gameState=END;
      }
      if(ball.isTouching(target)){
        score=score+1
      }
     
  }

  if(gameState===WIN){
    ball.velocityX=0;
    ball.velocityY=0;
    restart.visible=true;
    win.visible=true;
    win.scale=1;
    textSize(20);
    fill("aqua");
    text("You Won the Game",350,350);
    player.visible=false;
    player2.visible=false;
    target.visible=false;
    ball.visible=false;
//if(mousePressedOver(restart)){
//reset();
//}
  }

  if(gameState===END){
    gameover.visible=true;
    restart.visible=true;
    ball.velocityX=0;
    ball.velocityY=0;
    player.visible=false;
    player2.visible=false;
    ball.visible=false;
    target.visible=false;
    if(mousePressedOver(restart)){
      reset();
    }
  
  }
 
drawSprites();

Score();
}

function reset()
{
  gameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
  ball.velocityY=5;
  ball.velocityX=5;
  score= 0;
}

function Score()
{
       if(ball.isTouching(target)){
        ball.bounceOff; 
        score=score+1;
       }
        text("Score:"+score, 900,5,20,20)
        textFont("algerian");
        textSize(50);
        fill("red");
        //Display the score 
       
  
}







































/* THIS IS YOUR CODE//
var SERVE = 0
var PLAY = 1;
var END = 2;
var gameState = SERVE;
var target, targetImg;
var bg, backgroundImg;
var player;
var score =0;
var ball, ball1Img, ball2Img;
var gameOver, gameOverImg;
var restartImg, restart;
var person1Img, person2Img;
var racket, racketImg;
var border;



function preload() {
  targetImg = loadImage("assets/Target.png");
  ball1Img = loadImage("assets/Ball1.png");
  ball2Img = loadImage("assets/Ball2.png");
  backgroundImg = loadImage("assets/Court.png");
  winImg = loadImage("assets/Win.png");
  gameOverImg = loadImage("assets/GameOver.png");
  racketImg = loadImage("assets/Racket.png");
  restartImg = loadImage("assets/Restart.png");
  person1Img = loadImage("assets/Person1.png");
  person2Img = loadImage("assets/Person2.png");
  startImg = loadImage("assets/GameSquash.jpg");
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
start = createSprite(windowWidth,windowHeight);
start.addImage(startImg);
start.visible=true;
  bottomGround = createSprite(windowWidth, windowHeight/5+400);
  bottomGround.visible = false;

  topGround = createSprite(windowWidth, windowHeight/5-100);
  topGround.visible = false;
  
  ball = createSprite(20,20,20,20);
  ball.addImage("ball",ball1Img);
  ball.scale = 0.2;
  ball.debug = false;

  target = createSprite(200,200,30,30);
  target.visible = true;
  target.addImage("target",targetImg);

  racket = createSprite(200,200,20,20);
  racket.visible = false;
  racket.addImage("racket",racketImg);

  bg = createSprite(windowWidth, windowHeight);
  bg.visible = false;
  bg.addImage("bg",backgroundImg)

  rightBorder = createSprite(500,windowHeight,20);
  rightBorder.visible = false;

  leftBorder = createSprite(0,windowHeight,20);
  leftBorder.visible = false;

  win = createSprite(windowWidth,windowHeight);
  win.addImage("win", winImg);
  win.visible = false;

  gameOver = createSprite(windowWidth, windowHeight);
  restart = createSprite(220,240);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  restart.addImage(restartImg);
  restart.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;
  
}

function draw() {
 background(startImg);  
 textSize(30);
 textFont("impact");
 fill("black");
 text("Press Enter to Play!",200,200)
 
if(gameState===SERVE){
  if(keyDown("enter")){

    gameState=PLAY;
  }
}
  if(gameState === PLAY){
    start.visible=false
    bg.visible = true;
    target.visible = true;
    racket.visible = true;
    ball.visible = true;
    bottomGround.visible=true;
    topGround.visible=true;
    leftBorder.visible=true;
    rightBorder.visible=true;
    if(keyDown("space")){
      player = createSprite(random(100,700),random(400,900) )
      player.scale = 0.25;
      player.addImage("player", person2Img);
    }
    if(ball.isTouching(racket)){
      ball.bounceOff(racket);
      ball.addImage("ball",ball2Img);
    }
  
    if(ball.isTouching(target)){
      ball.bounceOff(target);
      score=score+1;
    }
  
    

    target.velocityX = 10;
    target.velocityY = 2; 

  
    

    if(score=20){
      win.visible = true;
    }

    if(ball.isTouching(bottomGround)||ball.isTouching(topGround)||ball.isTouching(leftBorder)||ball.isTouching(rightBorder)){
      gameState=END
      ball.destroy();
      target.destroy();
      player.destroy();
      gameOver.visible=true;
    }
  }

   if(gameState === END) 
    {
          gameOver.visible = true;
          restart.visible = true;
          
          //resetting the game
          if(mousePressedOver(restart)) 
          {
                reset();
          }

          drawSprites();
          text("Score:"+score, 400,20,20,20);
    } 
  }

  function reset()
    {
    gameState=PLAY;
    gameOver.visible=false;
    restart.visible=false;

    score=0;
  }
*/
    
