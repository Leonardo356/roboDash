const canvas = document.querySelector('.myCanvas')
const ctx = canvas.getContext('2d')
const img = document.getElementById('player')
const spriteWidth = 409
const spriteHeight  = 522
let frameX = 0
let frameY = 0
let gameFrame = 0
canvas.width = window.innerWidth;
let heightRatio = 2;
canvas.height = canvas.width * heightRatio;

export default class Player {
    constructor(x, y, width, height, space) {
        this.width = parseInt(canvas.width/5)
        this.height = parseInt(canvas.height/8)
        this.x = x
        this.y = y
    }
    draw(x, y, frameY) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.rect(x, y, this.width, this.height)
        ctx.drawImage(img, frameX *spriteWidth,frameY* spriteHeight, spriteWidth, spriteHeight, x, y - this.height/20, this.width, this.height)
       if(gameFrame % 4 == 0) {
           if(frameX < 15) frameX++
           else frameX = 0  
       }
       
       gameFrame ++
    }
}