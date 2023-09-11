import { Bloque } from "./bloque.js";

export class Bloques {
    constructor(canvas, ctx, filas, columnas, x, y, width, height, color, margen){
        this.canvas = canvas;
        this.ctx = ctx;
        this.filas = filas;
        this.columnas = columnas;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.margen = margen;
        this.listaBloques = [];
        this.bloquesInactivos = [];
    }

    dibujarBloques(){
        let bloqueId = 1;
        let bloque = null;
        this.listaBloques = [];
        const from = (this.canvas.width - (this.margen + this.width) * this.columnas) / 2;
        for (let filas = 0; filas < this.filas; filas++) {
            for (let columnas = 0; columnas < this.columnas; columnas++) {
                const bloqueX = from + columnas * (this.width + this.margen);
                const bloqueY = this.y + filas * (this.height + this.margen);   
                bloque = new Bloque(this.ctx, bloqueX, bloqueY, this.width, this.height, this.color);
                bloque.id = bloqueId;
                if(this.bloquesInactivos.includes(bloqueId)){
                    bloque.estado = false;
                }
                bloque.dibujarBloque();
                this.listaBloques.push(bloque);
                bloqueId++;
            }
        }
    }
}