let x = 1;
animacion = document.getElementById("animacion");
function cambiarImagen() {
    setInterval(frames, 2000);
}
function frames() {
    if (x === 3){
        x = 1;
    }else{
        x++;
    }
    animacion.src = "images/" + x + ".jpg";
}
