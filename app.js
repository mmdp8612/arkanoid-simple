import { Bloques } from "./bloques.js";
import { Paleta } from "./paleta.js";
import { Pelota } from "./pelota.js";

const mensaje = document.querySelector("#mensaje");
const btnJugar = document.querySelector("#btnJugar");

btnJugar.addEventListener("click", (e) => {
    location.reload();
});

const bloqueo = document.querySelector("#bloqueo");
const canvas = document.querySelector("#lienzo");
const ctx = canvas.getContext("2d");

const bloques = new Bloques(canvas, ctx, 4, 10, 10, 50, 50, 20, "red", 20);
const paleta = new Paleta(canvas, ctx, 550, 100, 20, "white", 0.1);
const pelota = new Pelota(canvas, ctx, paleta, bloques, 400, 540, 8, "white", 4.5);

const animar = () => {
    
    ctx.fillStyle = "black"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height); 

    document.addEventListener("keydown", function (e) {
        console.log(e.key);
        switch(e.key){
            case 'ArrowLeft':
                paleta.moverIzquierda();
                break;
            case 'ArrowRight':
                paleta.moverDerecha();
                break;
            case 'Enter':
                pelota.lanzar();
                break;
        }
    });

    pelota.dibujar();
    pelota.mover();
    pelota.detectaColision();
    paleta.dibujarPaleta();
    bloques.dibujarBloques();

    requestAnimationFrame(animar);
}

requestAnimationFrame(animar);