//
// Clase para gestionar mediciones
//

class MedicionesClass {

    // URL para solicitudes
    url = '../../api/mediciones/'

    // Array con valores de salida
    mediciones = [];

    // Obtener todas las mediciones
    // getAllMediciones() -> array
    async getAllMediciones(){
        const respuesta = await fetch(this.url, {
            method: 'GET'
        });
        if(!respuesta.ok){
            return false;
        }
        this.mediciones = await respuesta.json();
        return this.mediciones;
    }

    // Obtener las mediciones de un sensor específico
    //        int -> getMedicionSensor -> array
    async getMedicionSensor(id_sensor){
        const respuesta = await fetch(this.url + id_sensor, {
            method: 'GET'
        });
        if(!respuesta.ok){
            return false;
        }
        this.mediciones = await respuesta.json();
        return this.mediciones[this.mediciones.length-1];
    }
}