const canvas = document.querySelector('.myCanvas')
const ctx = canvas.getContext('2d')
let img = document.getElementById('imgright')

canvas.width = window.innerWidth;
let heightRatio = 2;
canvas.height = canvas.width * heightRatio;

export default class RightOb {
    constructor(x, y, width, height, space) {
        this.x = parseInt(canvas.width/5)
        this.y = y
        this.width = parseInt(canvas.width) - parseInt(canvas.height/15)
        this.height = canvas.height/15
    }

    draw(x, y) {
        ctx.beginPath()
        ctx.rect(x + this.x , y, this.width, this.height)
        ctx.drawImage(img, x + this.x, y, this.width - canvas.height/30, this.height)
        ctx.closePath()
    }
}