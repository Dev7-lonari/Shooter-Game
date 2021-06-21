var kratos 
var bullet
var redaliengroup
var greenaliengroup
var bulletgroup
var score = 0
var gameState = "play" 
function preload() {
  bg = loadImage("sprites/cavebackground.jpg")
  gameovertext = loadImage("sprites/Gameovertext.png")
  kratosrun = loadAnimation("sprites/run/Run1.png","sprites/run/Run2.png","sprites/run/Run3.png","sprites/run/Run4.png","sprites/run/Run5.png","sprites/run/Run6.png","sprites/run/Run7.png","sprites/run/Run8.png")
  bulletimage = loadAnimation("sprites/bullet/Bullet_000.png","sprites/bullet/Bullet_001.png","sprites/bullet/Bullet_002.png","sprites/bullet/Bullet_003.png","sprites/bullet/Bullet_004.png")
  kratosidle = loadAnimation("sprites/idle/Idle1.png","sprites/idle/Idle2.png","sprites/idle/Idle3.png","sprites/idle/Idle4.png","sprites/idle/Idle5.png","sprites/idle/Idle6.png","sprites/idle/Idle7.png","sprites/idle/Idle8.png","sprites/idle/Idle9.png","sprites/idle/Idle10.png")
  kratosrunshoot = loadAnimation("sprites/runshoot/RunShoot1.png","sprites/runshoot/RunShoot2.png","sprites/runshoot/RunShoot3.png","sprites/runshoot/RunShoot4.png","sprites/runshoot/RunShoot5.png","sprites/runshoot/RunShoot6.png","sprites/runshoot/RunShoot7.png","sprites/runshoot/RunShoot8.png","sprites/runshoot/RunShoot9.png")
  alienredwalk = loadAnimation("sprites/alien/PNG/alien_red/redwalk1.png","sprites/alien/PNG/alien_red/redwalk2.png","sprites/alien/PNG/alien_red/redwalk3.png","sprites/alien/PNG/alien_red/redwalk4.png","sprites/alien/PNG/alien_red/redwalk5.png","sprites/alien/PNG/alien_red/redwalk6.png")
  alienreddead = loadAnimation("sprites/alien/PNG/alien_red/reddead1.png","sprites/alien/PNG/alien_red/reddead2.png","sprites/alien/PNG/alien_red/reddead3.png","sprites/alien/PNG/alien_red/reddead4.png","sprites/alien/PNG/alien_red/reddead5.png")
  aliengreenwalk = loadAnimation("sprites/alien/PNG/alien_green/greenwalk1.png","sprites/alien/PNG/alien_green/greenwalk2.png","sprites/alien/PNG/alien_green/greenwalk3.png","sprites/alien/PNG/alien_green/greenwalk4.png","sprites/alien/PNG/alien_green/greenwalk5.png","sprites/alien/PNG/alien_green/greenwalk6.png")
  aliengreendead = loadAnimation("sprites/alien/PNG/alien_green/greendead1.png","sprites/alien/PNG/alien_green/greendead2.png","sprites/alien/PNG/alien_green/greendead3.png","sprites/alien/PNG/alien_green/greendead4.png","sprites/alien/PNG/alien_green/greendead5.png")
  shootsound = loadSound("Sounds/fireRelease.wav")
  gameendsound = loadSound("Sounds/end.wav")
  gamestartsound = loadSound("Sounds/start.wav")
  backgroundmusic = loadSound("Sounds/backgroundmusic.wav")
}

function setup(){
    var canvas = createCanvas(displayWidth,displayHeight-160);
    kratos = createSprite(500,300);
    kratos.addAnimation("run",kratosrun)
    kratos.scale = 0.3
    gameover = createSprite(displayWidth/2 , displayHeight/2)
    gameover.addImage("gameover" , gameovertext )
    gameover.visible = false
    kratos.addAnimation("idle",kratosidle)
    kratos.addAnimation("runshoot",kratosrunshoot)
    redaliengroup = new Group()
    greenaliengroup = new Group()
    bulletgroup = new Group()
    backgroundmusic.play(0,1,1)
    backgroundmusic.setVolume(0.3)
}

function draw(){
           background(bg);
           textSize(40)
           textFont("jokerman")
           fill("pink")
           stroke("blue")
           text("score : " +score , 1150,45)
           kratos.changeAnimation("idle",kratosidle)
           //kratos.mirrorX(kratos.mirrorX() * -1)
           if(gameState === "play"){
            
            
           
           if(keyDown("left")){
               kratos.x = kratos.x-8
               kratos.mirrorX(kratos.mirrorX() * -1)
               kratos.changeAnimation("runshoot",kratosrunshoot)
           }
           if(keyDown("right")){
            kratos.changeAnimation("runshoot",kratosrunshoot)
            //kratos.mirrorY(kratos.mirrorY() * -1)
               kratos.x = kratos.x+8
           }
           if(keyDown("up")){
            kratos.changeAnimation("runshoot",kratosrunshoot)
               kratos.y = kratos.y-8
           }
           if(keyDown("down")){
            kratos.changeAnimation("runshoot",kratosrunshoot)
               kratos.y = kratos.y+8
           }
           if(keyWentDown("space")||touches.length>0){
               createBullet()
               shootsound.play()
               touches = []
           }
           aliengreen()
           alienred()    
           if(greenaliengroup.isTouching(kratos) || redaliengroup.isTouching(kratos)){
               gameState = "end"
               
           }
           for(var i = 0; i < redaliengroup.length; i++){
               if(redaliengroup.get(i).isTouching(bulletgroup)){
                   redaliengroup.get(i).changeAnimation("dead",alienreddead)
                   redaliengroup.get(i).animation.looping = false
                   redaliengroup.get(i).velocityX = 0 
                   bulletgroup.destroyEach()
                   redaliengroup.get(i).destroy()
                   score = score + 1
               }
               
           }
           for(var i = 0; i < greenaliengroup.length; i++){
            if(greenaliengroup.get(i).isTouching(bulletgroup)){
                greenaliengroup.get(i).changeAnimation("dead",aliengreendead)
                greenaliengroup.get(i).animation.looping = false
                greenaliengroup.get(i).velocityX = 0 
                bulletgroup.destroyEach()
                greenaliengroup.get(i).destroy() 
                score = score + 1
            }
            
        }
    } else if(gameState === "end"){
        greenaliengroup.destroyEach()
        redaliengroup.destroyEach()
        gameover.visible = true 
        kratos.changeAnimation("idle",kratosidle)
        kratos.animation.looping = false
        gameendsound.play()
        gameendsound.setVolume(0)
        backgroundmusic.stop()
        bulletgroup.destroyEach()
            
    }
      drawSprites();
}
function createBullet(){
    if(frameCount % 1 === 0){ 
    bullet = createSprite(kratos.x+10,kratos.y-5)
    bullet.scale = 0.3
    bullet.addAnimation("bullet",bulletimage)
    bullet.velocityX = 10
    bulletgroup.add(bullet)
    }
}
function alienred(){
    if(frameCount % 50 === 0){ 
    redalien = createSprite(displayWidth,300) 
    redalien.mirrorX(redalien.mirrorX() * -1)
    redalien.scale = 0.25
    redalien.x = random(displayWidth/2,displayWidth)
    redalien.y = random(displayHeight/2,displayHeight-300)
    redalien.addAnimation("walk",alienredwalk)
    redalien.addAnimation("dead",alienreddead)
    redalien.velocityX = -6
    redaliengroup.add(redalien)
    }
}
 function aliengreen(){
    if(frameCount % 70 === 0){ 
        greenalien = createSprite(displayWidth,300) 
        greenalien.mirrorX(greenalien.mirrorX() * -1)
        greenalien.scale = 0.25
        greenalien.x = random(displayWidth/2,displayWidth)
        greenalien.y = random(displayHeight/2,displayHeight-300)
        greenalien.addAnimation("walk",aliengreenwalk)
        greenalien.addAnimation("dead",aliengreendead)
        greenalien.velocityX = -6
        greenaliengroup.add(greenalien)
 }
 }






