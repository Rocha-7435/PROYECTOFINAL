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
    let reloj = document.getElementById("reloj");
    let pos = 0;


    let id = setInterval(verhora, 1000);

   
    function verhora() {
        let d = new Date();
        let horas = d.getHours();
        let minutos = d.getMinutes();
        let segundos = d.getSeconds();
        if(d.getHours()<10){
            horas = "0" + d.getHours();
        }
        if(d.getMinutes()<10){
            minutos = "0" + d.getMinutes();
        }
        if(d.getSeconds()<10){
            segundos = "0" + d.getSeconds();
        }
        let hora = horas + ":" + minutos + ":" + segundos;
        reloj.innerHTML = hora;
    }
}

// Asegura que el reloj se inicie al cargar la página
window.addEventListener('load', mostrarReloj);

// FAQ functionality (moved from contactos.js)
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});
