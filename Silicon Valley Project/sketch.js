var outerspacebackground
var playbuttonimg, playerplaneimg, enemyplanesimg, meteorsimg, laserbulletimg
var score = 0

var gameState = "start"



function preload() {
  outerspacebackground = loadImage("Images/outerspaceeeeee.jpg")
  playbuttonimg = loadImage("Images/Omgomgomgomg.png")
  playerplanesimg = loadImage("Images/planesssss-removebg-preview.png")
  enemyplanesimg = loadImage("Images/planes2-removebg-preview.png")
  meteorsimg = loadImage("Images/meteors-removebg-preview.png")
  laserbulletimg = loadImage("Images/lasers-removebg-preview.png")
}


function setup() {
  createCanvas(windowWidth, windowHeight)



  playerplanes = createSprite(100, windowHeight / 2, 30, 30)
  playerplanes.addImage(playerplanesimg)
  playerplanes.visible = false
  playerplanes.rotation = 90


  playbutton = createSprite(windowWidth / 2, windowHeight / 2 + 100, 20, 20)
  playbutton.addImage(playbuttonimg)
  playbutton.visible = false
  playbutton.scale = 0.35

  enemyplanes = createSprite(1000, windowHeight / 2, 30, 30)
  enemyplanes.addImage(enemyplanesimg)
  enemyplanes.visible = false

  meteorpack = new Group()

  laserspewpew = new Group()
}


function draw() {
  background("grey")


  drawSprites()
  fill("purple")
  text("score: " + score,windowWidth-200,50)

  if (gameState === "start") {
    //background(outerspacebackground)
    playbutton.visible = true
    if (mousePressedOver(playbutton)) {
      gameState = "Level 1"




    }



  }
  if (gameState === "Level 1") {
    //background(outerspacebackground)

    if (keyWentDown("SPACE")) {
      laserroulette()
    }

    playerplanes.visible = true
    playbutton.visible = false
    enemyplanes.visible = false

    meteorshower()

    playerplanes.x = World.mouseX
    playerplanes.y = World.mouseY





    if (meteorpack.isTouching(playerplanes)) {
      gameState = "Game Over"
    }

    if (laserspewpew.isTouching(meteorpack)) {
      meteorpack[0].destroy()
      laserspewpew[0].lifetime = 0
      
      score += 27

    }

  }

  if (gameState == "Game Over") {
    playerplanes.destroy()
    meteorpack.destroyEach()
    laserspewpew.destroyEach()
    textSize(75)
    stroke("Teal")
    strokeWeight(5)
    text("Game Over, bozo.",windowWidth/2 - 300,windowHeight/2 - 100)
    

  }
}

function meteorshower() {
  if (frameCount % 35 === 0) {
    meteors = createSprite(windowWidth, windowHeight, 10, 10)
    meteors.y = random(20, windowHeight - 75)
    meteors.addImage(meteorsimg)
    meteors.velocityX = -25
    meteors.scale = 0.75
    meteors.lifetime = width / 10
    meteorpack.add(meteors)
  }
}

function laserroulette() {
  lasers = createSprite(100, windowHeight / 2, 50, 10)
  lasers.addImage(laserbulletimg)
  lasers.rotation = 90
  lasers.shapeColor = "yellow"
  lasers.x = playerplanes.x + 100
  lasers.y = playerplanes.y
  laserspewpew.add(lasers)
  lasers.velocityX = 30
  lasers.scale = 0.5


}