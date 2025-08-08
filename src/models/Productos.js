import { Schema, model } from "mongoose";
//schema y model sirven para definir la estructura de los documentos y crear modelos basados en esos esquemas
const empleado = new Schema({
    rfc: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    paterno: {
        type: String,
        required: true,
        trim: true,
    },
    materno: {
        type: String,
        required: true,
        trim: true,
    },
    fechaNacimiento: {
        type: Date
    },
    sexo: String,
    direccion: String,
    celular: String,
},{
    versionKey: false,
    timestamps: true,
});
// Establecemos un campo virtual
/*UserSchema.virtual('fecha_nacimiento')
  .set(function(fecha) {
    // El formato esperado es 'yyyy-mm-dd' que es el devuelto por el campo input
    // el valor recibido se almacenará en el campo fechaNacimienti de nuestro documento
    this.fechaNacimienti = new Date(fecha);
  })
  .get(function(){
    // el valor devuelto será un string en formato 'yyyy-mm-dd'
    return this.fechaNacimienti.toISOString().substring(0,10);
  });
*/

//empleado en el nombre de la caolleción en la base de datos
export default model('empleado', empleado);