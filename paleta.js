export class Paleta {
    constructor(canvas, ctx, y, width, height, color, velocidad=0.2){
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = (canvas.width - width) / 2;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocidad = velocidad;
    }

    dibujarPaleta(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moverIzquierda(){
        if(this.x > 10) this.x -= this.velocidad;
    }

    moverDerecha(){
        if(this.x < this.canvas.width - this.width - 10) this.x += this.velocidad;
    }

    getPosX(){
        return this.x;
    }
}