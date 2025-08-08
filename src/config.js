// Importa la función config de dotenv para cargar las variables de entorno
import { config } from "dotenv";
//cuando la aplicación se inicia, carga las variables de entorno desde el archivo .env
config();
//conectate a la base de datos utilizando la variable MONGODB_URL y si no esta definia entonces una la conexion por defecto
export default {
  mongodbURL: process.env.MONGODB_URL || 'mongodb://localhost:27017/Dulceria',
};
