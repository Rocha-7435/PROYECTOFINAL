


const preciosServicios = {
    'revision': 50,
    'limpieza': 80,
    'blanqueamiento': 200,
    'ortodoncia': 3000,
    'implantes': 1500,
    'odontopediatria': 60
};


const descuentos = {
    1: 0,      // Sin descuento
    2: 0.05,   // 5% de descuento
    3: 0.10,   // 10% de descuento
    4: 0.15,   // 15% de descuento
    5: 0.20    // 20% de descuento
};

function inicializarCotizador() {
    const cotizadorForm = document.getElementById('cotizador-form');
    const resultadoDiv = document.getElementById('resultado-cotizacion');
    
    if (cotizadorForm) {
        cotizadorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calcularCotizacion();
        });
    }
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calcularCotizacion);
    });
}

function calcularCotizacion() {
    const serviciosSeleccionados = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        serviciosSeleccionados.push(checkbox.value);
    });
    
    if (serviciosSeleccionados.length === 0) {
        mostrarResultado('Por favor, selecciona al menos un servicio.', 'warning');
        return;
    }
    
   
    let subtotal = 0;
    serviciosSeleccionados.forEach(servicio => {
        subtotal += preciosServicios[servicio] || 0;
    });
    
   
    const cantidadServicios = serviciosSeleccionados.length;
    const porcentajeDescuento = descuentos[cantidadServicios] || 0;
    const montoDescuento = subtotal * porcentajeDescuento;
    
 
    const total = subtotal - montoDescuento;
    
   
    mostrarResultadoDetallado(subtotal, montoDescuento, total, serviciosSeleccionados);
}

//se usaron las comillas simples invertidas para poder usar variables dentro del string
function mostrarResultado(mensaje, tipo = 'info') {
    const resultadoDiv = document.getElementById('resultado-cotizacion');
    resultadoDiv.innerHTML = `
        <div class="resultado-mensaje ${tipo}">
            <i class="fas fa-${tipo === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${mensaje}</span>
        </div>
    `;
    resultadoDiv.style.display = 'block';
}


function mostrarResultadoDetallado(subtotal, descuento, total, servicios) {
    const resultadoDiv = document.getElementById('resultado-cotizacion');
    const cantidadServicios = servicios.length;
    const porcentajeDescuento = descuentos[cantidadServicios] * 100;
    
    resultadoDiv.innerHTML = `
        <div class="resultado-detallado">
            <h3><i class="fas fa-calculator"></i> Cotización Detallada</h3>
            
            <div class="servicios-seleccionados">
                <h4>Servicios Seleccionados:</h4>
                <ul>
                    ${servicios.map(servicio => `
                        <li>
                            <i class="fas fa-check-circle"></i>
                            ${obtenerNombreServicio(servicio)} - BS${preciosServicios[servicio]}
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="resumen-costos">
                <div class="costo-item">
                    <span>Subtotal:</span>
                    <span>BS${subtotal.toFixed(2)}</span>
                </div>
                
                   
                ${descuento > 0 ? `/
                        <span>Descuento (${porcentajeDescuento}%):</span>
                        <span>-${descuento.toFixed(2)}BS</span>
                    </div>
                ` : ''}
                
                <div class="costo-item total">
                    <span><strong>Total:</strong></span>
                    <span><strong>${total.toFixed(2)}BS</strong></span>
                </div>
            </div>
            
            <div class="acciones-cotizacion">
                <button type="button" class="btn-imprimir" onclick="imprimirCotizacion()">
                    <i class="fas fa-print"></i> Imprimir Cotización
                </button>
                <button type="button" class="btn-agendar" onclick="agendarCita()">
                    <i class="fas fa-calendar-plus"></i> Agendar Cita
                </button>
            </div>
            
            <div class="nota-cotizacion">
                <p><i class="fas fa-info-circle"></i> 
                <strong>Nota:</strong> Esta cotización es estimativa. Los precios finales pueden variar según la complejidad del tratamiento y evaluación individual.</p>
            </div>
        </div>
    `;
    resultadoDiv.style.display = 'block';
}

function obtenerNombreServicio(codigo) {
    const nombresServicios = {
        'revision': 'Revisión Dental',
        'limpieza': 'Limpieza Dental',
        'blanqueamiento': 'Blanqueamiento Dental',
        'ortodoncia': 'Ortodoncia',
        'implantes': 'Implantes Dentales',
        'odontopediatria': 'Odontopediatría'
    };
    return nombresServicios[codigo] || codigo;
}


function imprimirCotizacion() {
    const resultadoDiv = document.getElementById('resultado-cotizacion');
    const ventanaImpresion = window.open('', '_blank');
    
    ventanaImpresion.document.write(`
        <html>
        <head>
            <title>Cotización - Paz Dental</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .logo { font-size: 24px; font-weight: bold; color: #0077B6; }
                .fecha { color: #666; margin-top: 10px; }
                .contenido { margin: 20px 0; }
                .servicios { margin: 20px 0; }
                .costo-item { display: flex; justify-content: space-between; margin: 5px 0; }
                .total { border-top: 2px solid #0077B6; padding-top: 10px; font-weight: bold; }
                .nota { margin-top: 30px; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">🦷 PAZ DENTAL</div>
                <div class="fecha">Cotización generada el ${new Date().toLocaleDateString()}</div>
            </div>
            <div class="contenido">
                ${resultadoDiv.innerHTML}
            </div>
            <div class="nota">
                <p>Esta cotización es válida por 30 días desde la fecha de emisión.</p>
                <p>Para más información, contacta con nosotros al (591) 123-456-78</p>
            </div>
        </body>
        </html>
    `);
    
    ventanaImpresion.document.close();
    ventanaImpresion.print();
}

function agendarCita() {
   
    window.location.href = 'citas.html';
}

function limpiarCotizador() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    const resultadoDiv = document.getElementById('resultado-cotizacion');
    resultadoDiv.style.display = 'none';
    resultadoDiv.innerHTML = '';
}


document.addEventListener('DOMContentLoaded', function() {
    inicializarCotizador();
});


function mostrarInfoServicio(servicio) {
    const infoServicios = {
        'revision': 'Incluye examen completo, radiografías básicas y evaluación de salud bucal.',
        'limpieza': 'Limpieza profesional con ultrasonido, pulido y aplicación de flúor.',
        'blanqueamiento': 'Tratamiento con gel blanqueador profesional para resultados duraderos.',
        'ortodoncia': 'Incluye consulta inicial, plan de tratamiento y seguimiento mensual.',
        'implantes': 'Precio por implante individual. Incluye cirugía y corona básica.',
        'odontopediatria': 'Consulta especializada para niños con técnicas adaptadas a su edad.'
    };
    
    return infoServicios[servicio] || 'Información no disponible.';
}
