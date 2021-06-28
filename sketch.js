var gameState;
var ground,groundImg;
var spaceSprite;
var x,y;
var obstacle,obstacleGroup;
var obstacle1,obstacle2,obstacle3,obstacle4;
var replayBtn,replayImg;
var score;
var life;

function preload()
{
    getImages();
}
function setup()
{
    canvas = createCanvas(windowWidth,windowHeight);
    obstacleGroup = createGroup();
    gameState = 0;
    score = 0;
    life = 3;


    spawnMeteors();

    spaceSprite = createSprite(windowWidth/4,windowHeight+1000,100,100);
    spaceSprite.scale = 0.5;
    spaceSprite.addAnimation("Ship5",shipImg1);
    spaceSprite.addAnimation("Explosion",shipBlast);
    spaceSprite.debug = "true";

    replayBtn = createSprite(windowWidth/4,camera.position.y +100,50,50);
    replayBtn.addImage("replay",replayImg);
    replayBtn.visible = false;    
 

}
function draw()
{
    background(0);
    
    if(gameState === 0)
    {
        showinfo();
    }
    else if(gameState === 1)
    {
        clear();
        //spaceTrack.play();
        
        play();
        
    }else if (gameState === 2)
    {
        console.log("gamestate is now 2 from  draw next calling end");
        end();
    }else
    {
         console.log("hello")
    }
    
}


function play()
{
    background(rgb(198,135,103));
    
    image(groundImg, 0,-displayHeight*2,displayWidth, displayHeight*5);
    
    fill(255);
    textSize(30);
    text("SCORE : "+score, camera.position.x +300, camera.position.y -300);
    text("Life : "+life, camera.position.x +300, camera.position.y -350);
    
    //Navigate the plane
    if(keyIsDown(UP_ARROW))
    {
        spaceSprite.y = spaceSprite.y - 15;
        score += 10;
    }
    if(keyIsDown(LEFT_ARROW))
    {
        spaceSprite.x = spaceSprite.x - 5;
    }
    if(keyIsDown(RIGHT_ARROW))
    {
        spaceSprite.x = spaceSprite.x + 5;
    }
    
    camera.position.x = displayWidth/2;
    camera.position.y = spaceSprite.y;
    
    
    if(obstacleGroup.isTouching(spaceSprite))
    {
        gameState = 2;
        
    }
    drawSprites();
}

function showinfo()
{
    fill ("orange");
    textSize(40);
    text("Welcome to SPACE SHOOT MISSION",windowWidth/3,100);
    textSize(30);
    text("READ this before you start the MISSION",windowWidth/3+100,200);
    
    text("UP ARROW TO START",windowWidth/2 -300,400);
    text("LEFT-RIGHT ARROW TO MOVE LEFT RIGHT",windowWidth/3,500);
    text("SPACE BAR TO PLAY",windowWidth/2 -300,800);
    if(keyDown("SPACE"))
    {
        gameState = 1;
    }
}
function spawnMeteors()
{
    for (var i =0; i<8;i++)
    {
        x = random(100,1500);
        y = random(windowHeight-100,windowHeight-3000);
        obstacle = createSprite(x,y);
        obstacleGroup.add(obstacle);
        var ranObstacle = Math.round(random(1,4));
        switch (ranObstacle)
        {
            case 1 : obstacle.addImage("M1",obstacle1);
                     obstacle.scale = 0.3;
                     break;
            case 2 : obstacle.addImage("M2",obstacle2);
                     obstacle.scale = 0.3;
                     break;
            case 3 : obstacle.addImage("M3",obstacle3);
                     obstacle.scale = 0.3; 
                     break;
            case 4 : obstacle.addImage("M4",obstacle4);
                     obstacle.scale = 0.3;         
                     break;
            default: break;
        }
    }
}

function end()
{
    life = life - 1;
        //spaceTrack.stop();
        //spaceExplode.play();

        console.log("gamestate is now 2 from inside end ");
        spaceSprite.changeAnimation("Explosion",shipBlast);
        replayBtn.visible = true;
        if (mousePressedOver(replayBtn)) 
        {
            if (life > 0) 
            {
                console.log("mylife= "+life);
            }
        }
}
    
    




function getImages()
{
    groundImg = loadImage("images/LongBg.jpg");
    obstacle1 = loadImage("images/Meteor_01.png");
    obstacle2 = loadImage("images/Meteor_02.png");
    obstacle3 = loadImage("images/Meteor_03.png");
    obstacle4 = loadImage("images/Meteor_04.png");
    shipImg1  = loadAnimation("images/Ship_Icon.png");
    shipBlast = loadAnimation("images/Ship5/Explosion/Vertical/Ship1_3.png",
                              "images/Ship5/Explosion/Vertical/Ship5_4.png",
                              "images/Ship5/Explosion/Vertical/Ship5_5.png",
                              "images/Ship5/Explosion/Vertical/Ship5_6.png",
                              "images/Ship5/Explosion/Vertical/Ship5_7.png",
                              "images/Ship5/Explosion/Vertical/Ship5_8.png",
                              "images/Ship5/Explosion/Vertical/Ship5_9.png",
                              "images/Ship5/Explosion/Vertical/Ship5_10.png");
    spaceTrack = loadSound("Sound/spaceshiptrack.wav");
    spaceExplode = loadSound("Sound/bossDeath.wav");
    replayImg = loadImage("images/Replay.png");
}