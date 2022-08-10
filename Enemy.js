const canvas = document.querySelector('.myCanvas')
const ctx = canvas.getContext('2d')
const img = document.getElementById('enemy')
const spriteWidth = 396
const spriteHeight  = 582

let frameX = 0
let frameY = 0
let gameFrame = 0
canvas.width = window.innerWidth;
let heightRatio = 2;
canvas.height = canvas.width * heightRatio;

export default class Ememy {
    constructor(x, y, width, height, space) {
        this.width = parseInt(canvas.width/5)
        this.height = parseInt(canvas.height/7)
        this.x = x
        this.y = y
    }
    draw(x, y, frameY) {
        ctx.beginPath()
        ctx.rect(x, y, this.width, this.height)
        ctx.closePath()
        ctx.drawImage(img, frameX *spriteWidth,frameY* spriteHeight, spriteWidth, spriteHeight, x, y, this.width, this.height)
     if(gameFrame % 10 == 0) {
         if(frameX < 10) frameX++
         else frameX = 0
     }
       
       gameFrame ++
    }
}