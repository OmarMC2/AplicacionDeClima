const axios = require('axios');




class Busquedas{

    historial = [
        'Teggucigalpa',
        'Madrid',
        'México'
    ];

    constructor(){

    }
    get paramsMapBox(){
        return {
            proximity: 'ip',
            language: 'es',
            'access_token' : process.env.MAPBOX_KEY
        }

        
    }
    async ciudad( lugar = '' ){

        try {
            
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            })

            const response = await instance.get()
            console.log("🚀 ~ file: busquedas.js ~ line 21 ~ Busquedas ~ ciudad ~ response", response.data);
            return [];
            
        } catch (error) {
            console.error(error);
            return [];
        }
        //petición http


        //retornar arreglo con todas las ciudades
        return []

    }

}

module.exports = Busquedas;
