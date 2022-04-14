const fs = require('fs');

const axios = require('axios');



class Busquedas{

     historial = [];

     dBPath = './db/database.json';

    constructor(){
        this.leerDB();
    }
    get paramsMapBox(){
        return {
            proximity: 'ip',
            language: 'es',
            'access_token' : process.env.MAPBOX_KEY
        }

        
    }
    get paramsOpenWeather(){
        return{
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es' 
        }
    }

    get historialCapitalizado(){
        return this.historial.map( lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );
            
            return palabras.join(' ');

        } )
    }
    async ciudad( lugar = '' ){

        try {
            
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            })

            const response = await instance.get()
            
            return response.data.features.map( lugar =>({
                id: lugar.id,
                nombre: lugar.place_name,
                lng:lugar.center[0],
                lat:lugar.center[1],
            })); 
            
        } catch (error) {
            console.error(error);
            return [];
        }
        //petición http


        //retornar arreglo con todas las ciudades
        

    }

    async climaLugar(lat, lon){

        try {
            //instance axios.create
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ... this.paramsOpenWeather, lat, lon }
            })

            const response = await instance.get()
            //response data
            //console.log(response.data)
            return {
                desc: response.data.weather[0].description,
                min: response.data.main.temp_min,
                max: response.data.main.temp_max,
                temp: response.data.main.temp
            }
            
        } catch (error) {
            console.error(error)
        }


    } 

    agregarHistorial( lugar = '' ){
        //Prevenir duplicados
        if (this.historial.includes( lugar.toLocaleLowerCase() ) ){
           return; 
        }

        
        //Grabar en DB
        this.historial.unshift( lugar.toLocaleLowerCase() )

        this.guardarDB( );

    }

    guardarDB(){

        const payload = {
            historial: this.historial
        };

        fs.writeFileSync( this.dBPath, JSON.stringify( payload ) );

    }

    leerDB(){
        if ( !fs.existsSync( this.dBPath ) ) return;
        const info = fs.readFileSync( this.dBPath, {encoding: 'utf-8'});
        const data = JSON.parse( info );

        this.historial = data.historial;

    }
}

module.exports = Busquedas;
