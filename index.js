import LeftOb from "./Obleft.js";
import RightOb from "./Obright.js";
import Player from "./Player.js";
import Ground from "./Ground.js";
import Ememy from "./Enemy.js";
import Coin from "./Coins.js";

const body = document.getElementsByTagName('body')[0]; 
const score = document.querySelector('.stats')
const reset = document.querySelector('.reset')
const canvas = document.querySelector('.myCanvas')
const startText = document.querySelector('.start-text')
const rules = document.querySelector('.rules')
const close = document.querySelector('.close')
const rulesText = document.querySelector('.rules-text')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
let heightRatio = 2;
canvas.height = canvas.width * heightRatio;

let enemy1 = new Ememy()
let enemy2 = new Ememy()
let enemy3 = new Ememy()
let left1 = new LeftOb()
let right1 = new RightOb()
let left2 = new LeftOb()
let right2 = new RightOb()
let player = new Player()
let ground = new Ground()
let coin1 = new Coin()
let coin2 = new Coin()
let coin3 = new Coin()

let dY = parseInt(canvas.width/150)
function randomize() {
    let rand = Math.floor(Math.random()*3) 

    if(rand === 0) return canvas.width / 2 - enemy1.width/2
    if(rand === 1) return canvas.width / 2 + enemy2.width
    if(rand === 2) return canvas.width / 2 - enemy3.width *2
}

let left1X = parseInt(canvas.width - canvas.width)
let left1Y = parseInt(left1.height*3) 

let right1X = parseInt(canvas.width - canvas.width)
let right1Y = parseInt(right1.height*7)

let left2X = parseInt(canvas.width - canvas.width)
let left2Y = parseInt(left2.height*11)

let right2X =parseInt(canvas.width - canvas.width)
let right2Y = left1.height*15

let enemy1X = canvas.width / 2 - enemy1.width/2
let enemy1Y = canvas.height - canvas.height - enemy1.height

let enemy2X = canvas.width / 2 + enemy2.width
let enemy2Y = canvas.height - canvas.height- enemy2.height - canvas.height

let enemy3X = canvas.width / 2 - enemy3.width *2
let enemy3Y = canvas.height - canvas.height - enemy3.height - canvas.height/2

let coin1X = canvas.width/ 2 + coin1.width/2
let coin1Y = canvas.height - canvas.height - canvas.height/2

let coin2X = canvas.width/ 2 - coin1.width*2
let coin2Y = canvas.height - canvas.height*2

let coin3X = canvas.width/ 2 - coin1.width*2
let coin3Y = canvas.height -canvas.height/2 - canvas.height*2 

let playerX = parseInt(canvas.width/2 - player.width)
let playerY = parseInt(canvas.height/2 + player.height - player.height/10)
let plDy = parseInt(canvas.width/100)
let plDx = parseInt(canvas.width/50)
let switchDX = true
let frameY = 1
let frameEnemy1 = 0
let frameEnemy2 = 0
let frameEnemy3 = 0

let scoreValue = 0
let scorePlus = 1

const playerDX = () => {
    switchDX = !switchDX
}


let animation = () => {

    collision()
    movePlayerY()
    movePlayerX()
    loopForObstacle()
    loopforEnemy()
    collisionEnemy()
    coinColision()
    enemyFrame()


    left1Y -= dY
    right1Y -= dY
    left2Y -= dY
    right2Y -= dY
    enemy1Y += dY
    enemy2Y += dY
    enemy3Y += dY
    coin1Y += dY
    coin2Y += dY
    coin3Y += dY

    player.draw(playerX, playerY, frameY)
    left1.draw(left1X, left1Y)
    right1.draw(right1X, right1Y)
    left2.draw(left2X, left2Y)
    right2.draw(right2X, right2Y)
    enemy1.draw(enemy1X, enemy1Y, frameEnemy1)
    enemy2.draw(enemy2X, enemy2Y, frameEnemy2)
    enemy3.draw(enemy3X, enemy3Y, frameEnemy3)
    coin1.draw(coin1X, coin1Y)
    coin2.draw(coin2X, coin2Y)
    coin3.draw(coin3X, coin3Y)
    ground.draw()

   requestAnimationFrame(animation)
}

function Start() {
    animation()
    startText.style.display = 'none'
    rules.style.display = 'none'
    score.style.display = 'block'
}

startText.addEventListener('click', Start, {once: true})

function loopforEnemy() {
    if(enemy1Y > canvas.height) {
        enemy1Y = canvas.height - canvas.height - enemy1.height- canvas.height/2
        enemy1X = randomize()
    }
    if(enemy2Y > canvas.height) {
        enemy2Y = canvas.height - canvas.height - enemy1.height- canvas.height/2
        enemy2X = randomize()
    }

    if(enemy3Y > canvas.height) {
        enemy3Y = canvas.height - canvas.height - enemy1.height- canvas.height/2
        enemy3X = randomize()
    }

}

function movePlayerX(){
    playerX += plDx
if(switchDX === false){
    plDx = -canvas.width/100
    frameY = 0
} 

if(switchDX === true) {
    plDx = +canvas.width/100
    frameY = 1
}

if ( playerX > parseInt(canvas.width - player.width)) {
    plDx = 0 
}
if ( playerX < parseInt(canvas.width - canvas.width)) {
    playerX = canvas.width - canvas.width
}
    
if(plDx === 0) {
    if(switchDX === false) plDx = parseInt(-canvas.width/100) 
    frameY = 0
}
if( playerX === parseInt(canvas.width - canvas.width)) {
    if(switchDX === true) plDx = parseInt(+canvas.width/100)
    frameY = 1
}

}

function movePlayerY() {
    //playerY += plDy
    if(playerY + player.height > canvas.height - ground.height) {
        plDy = 0
    } else {
        plDy = canvas.width/100
    }

    if(playerY < canvas.height - canvas.height - player.height/2) {
        plDx = 0
        dY = 0
        switchDX = 2
        canvas.style.filter = `blur(${10}px)`
        body.removeEventListener('click', playerDX)
        reset.style.display = 'block'
    }
}

function loopForObstacle() {
    if(
        left1Y  < parseInt(canvas.height - canvas.height - left1.height)
    ) {
        left1Y = canvas.height
    }

    if(
        left2Y  < parseInt(canvas.height - canvas.height - left2.height)
    ) {
        left2Y = canvas.height
    }

    if(
        right1Y  < parseInt(canvas.height - canvas.height - right1.height)
    ) {
        right1Y = canvas.height
    }

    if(
        right2Y  < parseInt(canvas.height - canvas.height - right2.height)
    ) {
        right2Y = canvas.height
    }

}

function collision() {
    if(
        playerY + player.height > left1Y &&
        playerX + player.width < left1X + left1.width &&
        playerY > left1Y + left1.height === false
    ) {
        playerY -= dY
        movePlayerX()
    }else if (
        playerY + player.height > right1Y &&
        playerX > right1X &&
        playerY > right1Y + right1.height === false
    ) {
        playerY -= dY
       movePlayerX()
    } else if(
        playerY + player.height > left2Y &&
        playerX + player.width < left2X + left2.width &&
        playerY > left2Y + left2.height === false
    ) {
        playerY -= dY
        movePlayerX()
    } else if (
        playerY + player.height > right2Y &&
        playerX > right2X &&
        playerY > right2Y + right2.height === false
    ){
        playerY -= dY
        movePlayerX()
    } else if (
        playerX + player.width > left1X + left1.width &&
        playerY > left1Y + left1.height === false
      ) {
        plDx = 0
        playerY += plDy
      } else if (
        playerX < right1X + player.width  &&
        playerY > right1Y + right1.height === false
        ) {
        plDx = 0
        playerY += plDy
       } else if (
        playerX + player.width > left2X + left2.width &&
        playerY > left2Y + left2.height === false
       ) {
        plDx = 0
        playerY += plDy
       } else if (
        playerX < right2X + player.width &&
        playerY > right2Y + right2.height === false
        ) {
        plDx = 0
        playerY += plDy 
        }else if (
            playerY > left1Y + left1.height === true
        ) {
        movePlayerX()
        playerY += plDy
       }
       else if (
        playerY > right1Y + right1.height === true
        ) {
        movePlayerX()
        playerY += plDy
        }

       else if (
        playerY > left2Y + left2.height === true
        ) {
        movePlayerX()
        playerY += plDy
        }

       else if (
        playerY > right2Y + right2.height === true
        ) {
        movePlayerX()
        playerY += plDy
        } 
}

function collisionEnemy() {
    if(
        playerX > enemy1X + enemy1.width - enemy1.width/3 ||
        playerX + player.width - player.width/3 < enemy1X ||
        playerY > enemy1Y + enemy1.height - enemy1.height/3 ||
        playerY + player.height - player.height/3 < enemy1Y
    ) {
        // no collision
    } else {
       plDx = 0
       dY = 0
       switchDX = 2
       canvas.style.filter = `blur(${10}px)`
body.removeEventListener('click', playerDX)
reset.style.display = 'block'
    }

    if(
        playerX > enemy2X + enemy2.width - enemy2.width/3 ||
        playerX + player.width - player.width/3 < enemy2X ||
        playerY > enemy2Y + enemy2.height - enemy2.height/3 ||
        playerY + player.height - player.height/3 < enemy2Y
    ) {
        // no collision
    } else {
        plDx = 0
        dY = 0
        switchDX = 2
        canvas.style.filter = `blur(${10}px)`
body.removeEventListener('click', playerDX)
reset.style.display = 'block'
    }

    if(
        playerX > enemy3X + enemy3.width - enemy3.width/3 ||
        playerX + player.width - player.width/3 < enemy3X ||
        playerY > enemy3Y + enemy3.height - enemy2.height/3 ||
        playerY + player.height - player.height/3 < enemy3Y
    ) {
        // no collision
    } else {
        plDx = 0
        dY = 0
        switchDX = 2
        canvas.style.filter = `blur(${10}px)`
body.removeEventListener('click', playerDX)
reset.style.display = 'block'
    }
}

function coinColision () {
    if(
        playerX > coin1X + coin1.width - coin1.width/3 ||
        playerX + player.width - player.width/3 < coin1X ||
        playerY > coin1Y + coin1.height - coin1.height/3 ||
        playerY + player.height - player.height/3 < coin1Y
    ) {
        // no collision
    } else {
        coin1Y = canvas.height - canvas.height*2
        coin1X = randomize()
        scoreValue += scorePlus
        score.innerHTML = scoreValue
    }

    if(coin1Y > canvas.height) {
        coin1Y = canvas.height - canvas.height*2
        coin1X = randomize()
    }

    if(
        playerX > coin2X + coin2.width - coin2.width/3 ||
        playerX + player.width - player.width/3 < coin2X ||
        playerY > coin2Y + coin2.height - coin2.height/3 ||
        playerY + player.height - player.height/3 < coin2Y
    ) {
        // no collision
    } else {
        coin2Y = canvas.height - canvas.height*2
        coin2X = randomize()
        scoreValue += scorePlus
        score.innerHTML = scoreValue
    }
    if(coin2Y > canvas.height) {
        coin2Y = canvas.height - canvas.height*2
        coin2X = randomize()
    }

    if(
        playerX > coin3X + coin3.width - coin3.width/3 ||
        playerX + player.width - player.width/3 < coin3X ||
        playerY > coin3Y + coin3.height - coin3.height/3 ||
        playerY + player.height - player.height/3 < coin3Y
    ) {
        // no collision
    } else {
        coin3Y = canvas.height - canvas.height*2
        coin3X = randomize()
        scoreValue += scorePlus
        score.innerHTML = scoreValue
    }
    if(coin3Y > canvas.height) {
        coin3Y = canvas.height - canvas.height*2
        coin3X = randomize()
    }
}

function enemyFrame() {

    if(playerY > enemy1Y ) {
        if(playerX > enemy1X + enemy1.width 
            ) {
            frameEnemy1 = 1
        } else {
            frameEnemy1 = 0
        }
    }

    if(playerY > enemy2Y ) {
        if(playerX > enemy2X + enemy2.width 
            ) {
            frameEnemy2 = 1
        } else {
            frameEnemy2 = 0
        }
    }

    if(playerY > enemy3Y ) {
        if(playerX > enemy3X + enemy3.width 
            ) {
            frameEnemy3 = 1
        } else {
            frameEnemy3 = 0
        }
    }
}

function resetLogic() {
     plDx = parseInt(canvas.width/50)
     dY =  parseInt(canvas.width/150)
     switchDX = true
     scoreValue = 0
     score.innerHTML = 0
     canvas.style.filter = `blur(${0}px)`
     body.addEventListener('click', playerDX)
     reset.style.display = 'none'

     left1X = parseInt(canvas.width - canvas.width)
     left1Y = parseInt(left1.height*3) 

     right1X = parseInt(canvas.width - canvas.width)
     right1Y = parseInt(right1.height*7)

     left2X = parseInt(canvas.width - canvas.width)
     left2Y = parseInt(left2.height*11)

     right2X =parseInt(canvas.width - canvas.width)
     right2Y = left1.height*15

     enemy1X = canvas.width / 2 - enemy1.width/2
     enemy1Y = canvas.height - canvas.height - enemy1.height

     enemy2X = canvas.width / 2 + enemy2.width
     enemy2Y = canvas.height - canvas.height- enemy2.height - canvas.height

     enemy3X = canvas.width / 2 - enemy3.width *2
     enemy3Y = canvas.height - canvas.height - enemy3.height - canvas.height/2

     coin1X = canvas.width/ 2 + coin1.width/2
     coin1Y = canvas.height - canvas.height - canvas.height/2

     coin2X = canvas.width/ 2 - coin1.width*2
     coin2Y = canvas.height - canvas.height*2

     coin3X = canvas.width/ 2 - coin1.width*2
     coin3Y = canvas.height -canvas.height/2 - canvas.height*2 

     playerX = parseInt(canvas.width/2 - player.width)
     playerY = parseInt(canvas.height/2 + player.height - player.height/10)
}

reset.addEventListener('click', resetLogic)

body.addEventListener('click', playerDX)


function display() {
    rulesText.style.display = 'flex'
}

function closeBtn() {
    rulesText.style.display = 'none'
}

close.addEventListener('click', closeBtn)
rules.addEventListener('click', display)
