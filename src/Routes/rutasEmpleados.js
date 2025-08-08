// Importamos el Router de Express y los controladores necesarios
// para manejar las solicitudes HTTP relacionadas con empleados.
import { Router } from "express";
import * as productosControllers from "../controllers/productoController.js";

//route contiene 
const router = Router();

router.get("/", productosControllers.todosEmpleados);

router.get('/:rfc', productosControllers.obtenerEmpeladoPorRFC);

router.post('/', productosControllers.agregarEmpleado);

router.put('/:rfc', productosControllers.actualziarEmpleadoPorRFC);

router.delete('/:rfc', productosControllers.borrarEmpleadoPorRFC);

export default router;