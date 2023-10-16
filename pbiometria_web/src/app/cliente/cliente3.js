//
// CLIENTE
//

const medicionesClass = new MedicionesClass();

const bienvenidaBox = document.getElementById("bienvenida");
const temperaturaBox = document.getElementById("temperatura");
const ppmO3Box = document.getElementById("ppmO3");
const cerrarSesionButton = document.getElementById("cerrar-sesion");

let ultimaMedicion = [];

(async() => {
    // Compruebo si existe una sesión iniciada o no para permitir el acceso
    const respuesta = await fetch('../../api/sesion/', {
        method: 'GET',
    });
    if(respuesta.ok){

        // Usuario autorizado
        const usuario = await respuesta.json();
        bienvenidaBox.textContent = "Bienvenido " + usuario.name;
        await cargarUltimaMedicion();
    } else {

        // Usuario NO autorizado
        alert("No autorizado");
        location.href = '../../index.html';
    }
})();

// ---------------------------------------------------------------------------------------
// ------------------------------- CERRAR SESION -----------------------------------------
// ---------------------------------------------------------------------------------------
cerrarSesionButton.addEventListener('click', async () => {
    const respuesta = await fetch('../../api/sesion/', {
        method: 'delete'
    });
    if (respuesta.ok) {
        clearInterval(intervalId);
        location.href = '../../index.html';
    }
})

// ---------------------------------------------------------------------------------------
// --------------------------- CARGAR ULTIMA MEDICION ------------------------------------
// ---------------------------------------------------------------------------------------
//              Carga la última medición de un sensor a partir de su ID
// ---------------------------------------------------------------------------------------
async function cargarUltimaMedicion(){
    ultimaMedicion = await medicionesClass.getMedicionSensor(3);
    console.log(ultimaMedicion);
    ppmO3Box.textContent = "Cantidad O3 = "+ ultimaMedicion.ppmO3+ " ppm";
    temperaturaBox.textContent = "Temperatura = " + ultimaMedicion.temp + " ºC";
}
let intervalId = setInterval(cargarUltimaMedicion, 10000);