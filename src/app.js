import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './Routes/indexRoutes.js';
import rutasEmpleados from './Routes/rutasEmpleados.js';

const app = express();
//settings
app.set('port', process.env.PORT || 3000);
//middewarare
//cors permite el acceso a la API desde otros dominios
app.use(cors({}));
//morgan es un middleware que permite ver las peticiones que se hacen a la API
app.use(morgan('dev'));
//express.json() permite parsear el cuerpo de la solicitud a formato JSON
app.use(express.json());
//express.urlencoded() permite parsear el cuerpo de la solicitud a formato URL-encoded
//extended: false permite usar el formato URL-encoded sin objetos anidados
//si se usa true, se permite el uso de objetos anidados en el cuerpo de la solicitud
//esto es útil si se envían datos complejos en el cuerpo de la solicitud
app.use(express.urlencoded({extended: false}));

//routes
//ruta por defecto
app.get('/', (req, res) =>{
    res.json({ message: 'Welcome to the Dulces API' });
});

//acceso a rutas de task
/*
GET/api/tasks/
GET/api/tasks/:id
POST/api/tasks/
DELETE/api/tasks/:id
PUT/api/tasks/:id
*/
app.use('/api/tasks', indexRoutes);
//acceso a rutas de dulceria
/*
GET/api/empleados/
GET/api/empleados/:rfc
POST/api/empleados/
PUT/api/empleados/:rfc
DELETE/api/empleados/:rfc
*/
app.use('/api/empleados', rutasEmpleados);

export default app;