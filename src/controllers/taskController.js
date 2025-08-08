//importamos el modelo Task el cual tiene la estructura de la collecions Task en la base de datos
import Task from "../models/Task.js";
//controlador para obtenr todos los registros
export const todasTask = async (req, res) => {
    try{
        //find() devuelve todos los documentos de la colleción
        //await espera a que se resuelva la promesa
        //listaTask es un array de objetos
        //res.json convierte el array a formato JSON y lo envia como respuesta
        //si no se usa await, la respuesta se enviará antes de que se complete la consulta
        //si hay un error, se captura en el bloque catch
        //y se envía un mensaje de error con el estado 500
        //500 es un código de estado HTTP que indica un error interno del servidor
        //message es una propiedad del objeto JSON que contiene el mensaje de error
        //|| es un operador lógico que devuelve el valor de la derecha si el valor de la izquierda es falsy
        //en este caso, si error.message es falsy, se devuelve el mensaje por defecto
        const listaTask = await Task.find();
        res.json(listaTask);
    }catch(error){
        res.status(500).json({
            message: error.message || 'Error al obtener las tareas',
        });
    }
};

//controlador para obtener un registro por id
export const obtenerTaskPorId = async (req, res) =>{
    const id = req.params.id;
    try{
        //findById() busca un documento por su id
        //si no se encuentra el documento, devuelve null
        //si se encuentra, devuelve el documento
        //400 es un código de estado HTTP que indica una solicitud incorrecta
        const respuesta = await Task.findById(id);
        if(!respuesta){
            res.status(400).json({
                message: `la tarea con el id ${id} no existe`
            });
        }
        res.json(respuesta);        
    }catch(error){
        res.status(500).json({
            message: error.message || `Error al devolver la tarea: ${id}`,
        });        
    }
};

//controlador para crear un nuevo registro
export const crearTask = async (req, res) => {
    //req.body.title es el primer campo de la colección Task
    //req.body es el cuerpo de la solicitud que contiene los datos del nuevo registro
    //si no se envía el campo title, se devuelve un error 400
    if(!req.body.title){
        return res.status(400).send({
            message: 'contenido no valido, el campo titulo es requerido',
        });
    }

    try{
        //se crea una nueva tarea con los datos que se envian en la solicitud
        //new Task(req.body) crea una nueva instancia del modelo Task con los datos del cuerpo de la solicitud
        const newTask = new Task(req.body);
        //taskSave es el registro guardado en la base de datos
        //save() guarda el nuevo registro en la base de datos
        const taskSave = await newTask.save();
        //res.json(taskSave) devuelve el registro guardado como respuesta
        res.json(taskSave);
    }catch(error){
        res.status(500).json({
            message: error.message || 'Error al crear la tarea',
        });
    }
};

//controlador para actualizar un requistro por medio en id
export const actualizarTack = async (req, res) =>{
    //req.params.id es el id del registro que se quiere actualizar
    const id = req.params.id;
    try{
        //findById() busca un documento por su id
        const respuesta = await Task.findById(id);
        if(!respuesta){
            res.status(400).json({
                message: `la tarea con el id ${id} no existe`
            });
        }
        //findByIdAndUpdate() busca un documento por su id y lo actualiza con los datos que se envian en la solicitud
        //req.body contiene los datos que se envian en la solicitud
        //si no se envian datos, no se actualiza nada
        await Task.findByIdAndUpdate(id, req.body);
        res.json({ message: 'tarea actualizada con exito' });
    }catch(error){
        res.status(500).json({
            message: `Error al actualizar la tarea: ${id}`,
        });
    }

};

//controlador para eliminar un registro por id
export const borrarTask = async (req, res) =>{
    //req.params.id es el id del registro que se quiere eliminar
    const id = req.params.id;
    try{
        //findByIdAndDelete() busca un documento por su id y lo elimina
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted' });
    }catch(error){
        res.status(500).json({
            message: `Error al borrar la tarea: ${id}`,
        });
    }
;}