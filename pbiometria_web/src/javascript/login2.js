//
// LOGIN
//

document.getElementById("login-form").addEventListener('submit', login);

(async() => {
    const respuesta = await fetch('api/sesion/', {
        method: 'GET',
    });
    if(respuesta.ok){
        const usuario = await respuesta.json();
        const rol = usuario.rol
        switch (rol) {
            case '1':
                //location.href = 'app/admin/';
                break;
            case '2':
                location.href = 'app/cliente';
                break;
        }
    } else {
        console.log("No hay sesion iniciada");
    }
})();

async function login(event){
    const output = document.getElementById("output");
    output.classList.remove("error");

    event.preventDefault();
    const formData = new FormData(event.target);

    const respuesta = await fetch('api/sesion/', {
        method: 'post',
        body: formData
    });

    if (respuesta.ok) {
        const usuario = await respuesta.json();
        if(usuario.rol === "1"){
            //location.href = 'app/admin/';
            console.log("ADMIN");
        }
        if(usuario.rol === "2"){
            location.href = 'app/cliente';
            console.log("CLIENTE");
        }
    } else {
        output.innerText = "Credenciales no válidas";
        output.classList.add("error");
    }
}