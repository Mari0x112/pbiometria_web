//
// LOGIN
//

// Listener para ejecutar el login
document.getElementById("login-form").addEventListener('submit', login);

// Función asincrona ejecutada al cargar la página
(async() => {

    // Comprobamos si hay alguna sesión creada para redirigir directamente a la página del cliente
    const respuesta = await fetch('api/sesion/', {
        method: 'GET',
    });
    if(respuesta.ok){
        const usuario = await respuesta.json();
        const rol = usuario.rol
        switch (rol) {
            // El usuario es administrador
            case '1':
                //location.href = 'app/admin/';
                break;

            // El usuario es cliente
            case '2':
                location.href = 'app/cliente';
                break;
        }
    } else {
        console.log("No hay sesion iniciada");
    }
})();

// -----------------------------------------------------------------
//                         event --> LOGIN()
// -----------------------------------------------------------------
//      Función para realizar el login mediante un formulario
//                          formData json
// -----------------------------------------------------------------
async function login(event){
    const output = document.getElementById("output");
    output.classList.remove("error");

    event.preventDefault();
    const formData = new FormData(event.target);

    // Creamos un post de usuario para intentar crear la sesión
    const respuesta = await fetch('api/sesion/', {
        method: 'post',
        body: formData
    });

    // Si los credenciales existe
    if (respuesta.ok) {
        const usuario = await respuesta.json();

        // ADMINISTRADOR
        if(usuario.rol === "1"){
            //location.href = 'app/admin/';
            console.log("ADMIN");
        }

        // CLIENTE
        if(usuario.rol === "2"){
            location.href = 'app/cliente';
            console.log("CLIENTE");
        }
    } else {
        // Los credenciales no son válidas
        output.innerText = "Credenciales no válidas";
        output.classList.add("error");
    }
}