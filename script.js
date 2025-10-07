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
//--------------------------------------------------------------------------
// Reloj
//--------------------------------------------------------------------------
function mostrarReloj() {
    // Obtiene el elemento <h1> con id="reloj" desde el HTML
    let reloj = document.getElementById("reloj");
    // Variable no usada en el código original, se ha eliminado en esta versión limpia
    let pos = 0;

    // Ejecuta la función "verhora" cada 1000 ms (1 segundo)
    let id = setInterval(verhora, 1000);

    // Función interna que se encarga de obtener y mostrar la hora actual
    function verhora() {
        // Crea un objeto Date para obtener la fecha y hora actual
        let d = new Date();
        let horas = d.getHours();
        let minutos = d.getMinutes();
        let segundos = d.getSeconds();
        //Si las horas < 10 añade un 0 delante (ejm: 09 en vez de 9)
        if(d.getHours()<10){
            horas = "0" + d.getHours();
        }
        //Si los minutos < 10 añade un 0 delante (ejm: 09 en vez de 9)
        if(d.getMinutes()<10){
            minutos = "0" + d.getMinutes();
        }
        //Si los segundos < 10 añade un 0 delante (ejm: 09 en vez de 9)
        if(d.getSeconds()<10){
            segundos = "0" + d.getSeconds();
        }
        let hora = horas + ":" + minutos + ":" + segundos;
        // Actualiza el contenido del elemento <h1> con la hora actual
        reloj.innerHTML = hora;
    }
}

// Asegura que el reloj se inicie al cargar la página
window.addEventListener('load', mostrarReloj);
