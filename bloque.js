export class Bloque {
    constructor(ctx, x, y, width, height, color){
        this.id = 0;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.estado = true;
    }

    dibujarBloque(){
        if(this.estado){
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}