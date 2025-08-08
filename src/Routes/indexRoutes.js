//se importar ROute de express y los controladores de tareas
// para manejar las solicitudes HTTP relacionadas con tareas.
import { Router } from "express";
import * as taskController from "../controllers/taskController.js";

const router = Router();

//ruta de todas las tareas
router.get('/', taskController.todasTask);
//ruta para buscar una tarea por id
router.get('/:id', taskController.obtenerTaskPorId);
//ruta para crear una tarea
router.post('/', taskController.crearTask);
//ruta para acutualizar una tarea por id
router.put('/:id', taskController.actualizarTack);
//rut apaea elimiar una tarea
router.delete('/:id', taskController.borrarTask);


export default router;