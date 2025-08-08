//importar mongoose 
//schema y model sirven para definir la estructura de los documentos y crear modelos basados en esos esquemas
import { Schema, model } from "mongoose";
import mongoosePagination from "mongoose-paginate-v2";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    done:{
        type: Boolean,
        default: false
    },
},{
    versionKey: false,
    timestamps: true
});
//exportar el modelo con el nombre 'Task' y el esquema taskSchema
//Task en el nombre de la caolleción en la base de datos
taskSchema.plugin(mongoosePagination);
export default model('Task', taskSchema);