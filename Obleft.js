const canvas = document.querySelector('.myCanvas')
const ctx = canvas.getContext('2d')
let img = document.getElementById('imgleft')

canvas.width = window.innerWidth;
let heightRatio = 2;
canvas.height = canvas.width * heightRatio;

export default class LeftOb {
    constructor(x, y, width, height) {
        this.x = parseInt(canvas.width/5)
        this.y = y
        this.width = parseInt(canvas.width)
        this.height = parseInt(canvas.height/15)
    }

    draw(x, y) {
        ctx.beginPath()
        ctx.rect(x - this.x, y, this.width , this.height)
        ctx.drawImage(img, x - parseInt(canvas.width/5), y, this.width, this.height)
        ctx.closePath()
    }
}