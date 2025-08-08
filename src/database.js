// Importa la función connect de mongoose para conectarse a la base de datos MongoDB
import {connect} from "mongoose";

// Importa el archivo de configuración que contiene la URL de MongoDB
import config from "./config.js";
(async () =>{
    try{
        // Intenta conectarse a la base de datos utilizando la URL definida en config
        // Imprime un mensaje en la consola indicando que se ha conectado a la base de datos
        const db = await connect(config.mongodbURL);
        console.log('connected to Data base', db.connection.name);
    }catch(error){
        console.error(error);
    }
})();