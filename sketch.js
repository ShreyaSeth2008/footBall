
var net;
var ball;
var ground
var wall1, wall2
var score=0
var life=3
var gameState="play"
function preload() {
    footballImg = loadImage("football.png")
    netImg = loadImage("football net.png")
    overImg= loadImage("game over img.jpg")
    groundImg=loadImage("ground image.jpg")
    sound=loadSound("kick sound.mp3")
    font=loadFont("font.ttf")
    win=loadSound("you win.mp3")
    overSound=loadSound("game over.wav")
    cheering=loadSound("cheering sound.mp3")
}

function setup() {
    createCanvas(1500, 700)
    
    net=createSprite(850,125,100,100);
    net.addImage("net",netImg)
    net.scale=1.2
    net.velocityX=4

    ball=createSprite(850,600,100,100)
    ball.addImage("football",footballImg)
    ball.scale=0.08

    over=createSprite(850,600,100,100)
    over.addImage("over",overImg)
    over.visible=false

    leftboundary=createSprite(300,350,10,700);
    leftboundary.visible=false;
    
    rightboundary=createSprite(1200,350,10,700);
    rightboundary.visible=false

    topboundary=createSprite(750,5,2000,5);
    topboundary.visible=false


    edges=createEdgeSprites()

    ball.setCollider("circle", 0, 0, 600);
    ball.debug = false;

    net.setCollider("rectangle", 0, 0, 15,15);
    net.debug = true;

}


function draw() {
    background(groundImg)
    textSize(20)
    fill('yellow')
    textFont('font')
    text("SCORE- "+score,1400,680)
    text("<3 life <3- "+life,20,680)

    if(gameState==="play"){

    

    net.bounceOff(leftboundary)
    net.bounceOff(rightboundary)
    ball.bounceOff(edges);
    ball.bounceOff(net);

    if(ball.isTouching(net)) {
    score=score+1
    ball.x=850
    ball.y=600
    ball.velocityX=0;
    ball.velocityY=0;
    cheering.play()
   }


   if(ball.isTouching(topboundary)){
    life=life-1
    ball.x=850
    ball.y=600
    ball.velocityX=0;
    ball.velocityY=0;
        }

        if(life===0){
            gameState="end"
      
        }
    

    if(keyDown("left")){
        ball.setSpeed (20,120)
        sound.play();
    }

    if(keyDown("right")){
        ball.setSpeed (20,60)
        sound.play();
    }
}

if(gameState==="end"){
    net.velocityX=0
   overSound.play()
   time(5);
    over.visible=true
   
    

}
    drawSprites();

}