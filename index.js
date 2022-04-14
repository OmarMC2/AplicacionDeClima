require('dotenv').config()
const { leerInput, inquirerMenu, inquirerPausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require('colors');






const main = async () =>{

    const busquedas = new Busquedas();
    let option; 



    do {
        
        option = await inquirerMenu();
        switch (option) {
            case 1:
                //Mostrar mensaje
               
                const termino = await leerInput();
               
                //Buscar lugares
               
                const lugares =await busquedas.ciudad( termino );
                
                //Seleccionar lugar
                
                const idSelected = await listarLugares(lugares);
                
                //verificas que la opción no sea "salir"
                
                if (idSelected === '0') continue
                const lugarSel = lugares.find( l => l.id === idSelected );
                
                //guardas en la DB
                busquedas.agregarHistorial(lugarSel.nombre)

                //Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);



                //Mostrar resultados
                console.log('\n Información de la ciudad \n'.yellow);
                console.log(`Ciudad: `.green + `${lugarSel.nombre}`.white);
                console.log(`Lat: `.green + `${lugarSel.lat}`.white);
                console.log(`Lng: `.green + `${lugarSel.lng}`.white);
                
                console.log(`Temperatura: `.green + `${clima.temp}`.white);
                console.log(`Mínima: `.green + `${clima.min}`.white);
                console.log(`Máxima: `.green + `${clima.max}`.white);
                console.log(`El clima es: `.green + `${clima.desc}`.white)


                break;
            case 2:
                console.log("Historial".yellow);

                busquedas.historialCapitalizado.forEach( ( lugar, i ) => {
                    const idx = `${i + 1}`. green;
                    console.log(`${idx} ${lugar}`);
                } )
                
                
                
                
                break;        
            default:
                break;
        }

        await inquirerPausa();

    } while (option !== 0 );

   
}


main();


