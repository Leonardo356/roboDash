const canvas = document.querySelector('.myCanvas')
const ctx = canvas.getContext('2d')
let img = document.getElementById('ground')

canvas.width = window.innerWidth;
let heightRatio = 2;
canvas.height = canvas.width * heightRatio;

export default class Ground {
    constructor(x, y, width, height) {
        this.x = canvas.width - canvas.width
        this.width = canvas.width
        this.height = canvas.height/8
        this.y = canvas.height - this.height
    }

    draw() {
        ctx.beginPath()
        ctx.rect(this.x, this.y , this.width, this.height)
        ctx.drawImage(img, this.x, this.y , this.width, this.height)
        ctx.closePath()
    }
}