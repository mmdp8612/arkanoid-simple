const direcciones = [
    'LEFT',
    'RIGHT'
];

export class Pelota {
    constructor(canvas, ctx, paleta, bloques, x, y, radio, color, velocidad=0.2){
        this.lanza = false;
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = paleta.x + paleta.width / 2; //((canvas.width-paleta.width) / 2)+(paleta.width/2);
        this.y = y;
        this.radio = radio;
        this.color = color;
        this.velocidad = velocidad;
        this.paleta = paleta;
        this.bloques = bloques;
        this.colision = '';
        this.direccion = '';
        this.sentidoAscendente = true;
    }

    dibujar(){

        if(!this.lanza){
            this.x = this.paleta.x + this.paleta.width / 2;
        }

        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    mover(){
        if(this.lanza){
            switch(this.colision){
                case 'BORDER_TOP':
                    this.y += this.velocidad;
                    break;

                case 'BORDER_LEFT':
                    if(this.sentidoAscendente){
                        this.y += this.velocidad;
                    }else{
                        this.y -= this.velocidad;
                    }
                    break;
                
                case 'BORDER_RIGHT':
                    if(this.sentidoAscendente){
                        this.y += this.velocidad;
                    }else{
                        this.y -= this.velocidad;
                    }
                    break;

                case 'BLOQUE':
                    this.y += this.velocidad;
                    break;

                case 'BORDER_BOTTOM':
                    mensaje.innerHTML = "HAS PERDIDO MENSO!";
                    bloqueo.style.display = "flex";
                    break;

                default: 
                    this.y -= this.velocidad;
            }

            if(this.direccion === 'LEFT') this.x -= this.velocidad;
            else if(this.direccion === 'RIGHT') this.x += this.velocidad;
        }
    }

    lanzar(){
        if(!this.lanza){
            this.x = (this.paleta.getPosX() + this.paleta.width / 2);
            this.lanza = true;
        }
    }

    detectaColision(){

        if(this.y === 0){
            this.colision = 'BORDER_TOP';
            this.direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
            this.sentidoAscendente = true;
        }

        if(this.x <= 0){
            this.colision = 'BORDER_LEFT';
            this.direccion = 'RIGHT';
        }

        if(this.x >= this.canvas.width){
            this.colision = 'BORDER_RIGHT';
            this.direccion = 'LEFT';
        }

        if(this.y >= this.canvas.height){
            this.colision = 'BORDER_BOTTOM';
            this.sentidoAscendente = false;
        }

        this.bloques.listaBloques.forEach((bloque, index) => {
            if(bloque.estado && (this.y >= bloque.y && this.y <= (bloque.y + bloque.height)) && (this.x >= bloque.x && this.x <= (bloque.x + bloque.width))){
                this.colision = 'BLOQUE';
                this.direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
                this.bloques.bloquesInactivos.push(bloque.id);
                this.sentidoAscendente = true;
            }
        });

        if((this.y >= this.paleta.y && this.y <= (this.paleta.y + this.paleta.height)) && (this.x >= this.paleta.x && this.x <= (this.paleta.x + this.paleta.width))){
            this.colision = 'PALETA';
            this.direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
            this.sentidoAscendente = false;
        }       
    }

    buscarGanador(){
        if(this.bloques.listaBloques.length === this.bloques.bloquesInactivos.length){
            mensaje.innerHTML = "HAS GANADO BIEN HECHO!";
            bloqueo.style.display = "flex";           
        }
    }
    
}