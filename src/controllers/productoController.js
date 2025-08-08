import Productos from "../models/Productos.js";
import { getPagination } from "../libs/getPagination.js";

//controlador para obtener todoso los reqistros de empelado
export const todosEmpleados = async (req, res) => {
    try{
        const {size, page, rfc} = req.query;

        const condicion = rfc ?{
            rfc: { $regex: new RegExp(req.query.rfc || ''), $options: "i" }
        } : {};
        const {limit, offset} = getPagination(page, size);
        //find devuelve todos los documentos que coincidan con la consulta
        const listadoEmpelado = await Productos.paginate(condicion, {offset, limit});
        //res.jon devuelve el listado de empleados
        res.json({
            total: listadoEmpelado.totalDocs,
            empleados: listadoEmpelado.docs,
            totalPages: listadoEmpelado.totalPages,
            currentPage: listadoEmpelado.page - 1,
        });
    //si no hay empleados, se devuelve un mensaje
    }catch(error){
        res.status(500).json({
            message: error.message || 'Error al obtener todos los empleados',
        });
    }
};

//controlador para obtener un empelado por RFC
export const obtenerEmpeladoPorRFC = async (req, res) =>{
    const rfc = req.params.rfc;
    try{
        //buscar el empleado por RFC
        //findOne devuelve el primer documento que coincida con la consulta
        const respuesta = await Productos.findOne({ rfc: rfc });
        //si no se encuentra el empleado, se devuelve un error 400
        if(!respuesta){
            res.status(400).json({
                message: `El RFC ${rfc} no existe`
            });
        }
        //si se encuentra el empleado, se devuelve el empleado
        res.json(respuesta);
    }catch(error){
        res.status(500).json({
            message: `Error al devolver el empleado con RFC: ${rfc}`
        })
    }
};

//controlador para crear un empleado
export const agregarEmpleado = async (req, res) =>{
    //validar que el cuerpo de la solicitud contenga los campos requeridos
    if(!req.body.rfc){
        return res.status(400).send({
            message: 'contenido no valido, los campos rfc, nombre, paterno, materno son requeridos',
        });
    }
    try{
        //crear un nuevo empleado con los datos del cuerpo de la solicitud
        const newEmpleado = new Productos(req.body);
        //guardar el nuevo empleado en la base de datos
        const empleadoSave = await newEmpleado.save();
        //devolver el empleado guardado
        res.json(empleadoSave);
    }catch(error){
        res.status(5000).json({
            message: error.message || 'error al crear el empleado'
        });
    }
};

//controlador para actuzaliar por RFC
export const actualziarEmpleadoPorRFC = async (req, res) =>{
    //rfc guarda el RFC del empleado a actualizar
    const rfc = req.params.rfc;
    try{
        //findOne busca el primer documento que conicida con el RFC
        const respuesta = await Productos.findOne({ rfc: rfc });
        //si no se encuentra el empleado, se devuelve un error 400
        if(!respuesta){
            res.status(400).json({
                message: `El RFC ${rfc} no existe`
            });
        }
        //si se encuentra el empleado, se actualiza con los datos del cuerpo de la solicitud
        //updateOne actualiza el primer documento que coincida con la consulta
        //req.body contiene los datos a actualizar
        await Productos.updateOne({ rfc: rfc }, req.body);
        res.json({
            message: 'empleado actualizado con exito'
        })
    }catch(error){
        res.status(500).json({
            message: `Error al actualizar al empleado: ${rfc}`,
        });
    }
};

//controlador para eliminar empleado por RFC
export const borrarEmpleadoPorRFC = async (req, res) =>{
    const rfc = req.params.rfc;
    try{
        //findOneAndDelete busca el primer documento que coincida con la consulta y lo elimina
        //si no se encuentra el empleado, se devuelve un error 400
        const respuesta = await Productos.findOne({ rfc: rfc });
        if(!respuesta){
            return res.status(400).json({
                message: `El RFC ${rfc} no existe`
            });
        }
        //si se encuentra el empleado, se elimina
        await Productos.findOneAndDelete({ rfc: rfc});
        res.json({
            message: 'Empelado eliminado con exito'
        });
    }catch(error){
        res.status(500).json({
            message: `Error al emininar el empleado con RFC ${rfc}`
        });
    }
};