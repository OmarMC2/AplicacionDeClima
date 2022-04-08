require('dotenv').config()
const { leerInput, inquirerMenu, inquirerPausa } = require("./helpers/inquirer");
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
                const lugar = await leerInput();
                await busquedas.ciudad(lugar);
                //Buscar lugares

                //Seleccionar lugar

                //Clima

                //Mostrar resultados
                console.log('\n Información de la ciudad \n');
                console.log('Ciudad:');
                console.log('Lat:');
                console.log('Lng:');
                console.log('Temperatura:');
                console.log('Mínima:');
                console.log('Máxima:');



                break;
            case 2:
                console.log("Historial")
        
            default:
                break;
        }

        await inquirerPausa();

    } while (option !== 0 );

   
}


main();


