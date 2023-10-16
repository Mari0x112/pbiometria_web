//
// Clase para gestionar los sensores
//

class SensoresClass {

    // URL para solicitudes
    url = '../../api/sensores/'

    sensores = [];

    // Obtengo todos los sensores
    async getAllSensores(){
        const respuesta = await fetch(this.url, {
            method: 'GET'
        });
        if(!respuesta.ok){
            return false;
        }
        this.usuarios = await respuesta.json();
        return this.usuarios;
    }

    // Obtengo los sensores de un usuario
    async getSensoresUsuario(name_usuario){
        const respuesta = await fetch(this.url + name_usuario, {
            method: 'GET'
        });
        if(!respuesta.ok){
            return false;
        }
        this.usuario = await respuesta.json();
        return this.usuario;
    }
}

