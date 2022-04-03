import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import promBundle from 'express-prom-bundle';
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
module.exports = app;

const port: number = process.env.PORT != undefined ? parseInt(process.env.PORT) : 5000;


const options: cors.CorsOptions = {
    origin: ['http://localhost:3000']
};

//Sesión de express
var expressSession = require('express-session');
app.use(expressSession({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true
}));

declare global {
    namespace Express {
      interface Request {
        // currentUser might not be defined if it is not logged in
        session: typeof expressSession;
      }
    }
  }
//---------------------------------------------------------------

const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

app.use(cors(options));
app.use(express.json()); //El servidor trabaja con json

//RouterSession
var routerUsuarioSession = express.Router();
routerUsuarioSession.use(function(req, res, next) {
    if(req.session.usuario){
        next();
    } else {
        console.log("Nope");
        //redireccionar al inicio
    }
});

//Aplicar RouterAdministrador
app.use("/desconectarse",routerUsuarioSession);

//RouterAdministrador
var routerUsuarioAdministrador = express.Router();
routerUsuarioAdministrador.use(function(req, res, next) {
    if(req.session.usuario && req.session.usuario.role == "admin"){
        next();
    } else {
        console.log("Nope");
        //redireccionar al inicio
    }
});

//Aplicar RouterAdministrador
app.use("/product/add",routerUsuarioAdministrador);
app.use("/product/update",routerUsuarioAdministrador);
app.use("/product/delete",routerUsuarioAdministrador);
app.use("/user/add",routerUsuarioAdministrador);
app.use("/user/update",routerUsuarioAdministrador);
app.use("/user/delete",routerUsuarioAdministrador);

//Encriptación de contraseñas
var crypto = require('crypto');
app.set('clave','abcdefg');
app.set('crypto', crypto);

//Rutas a los controladores
require("./routes/products_router");
require("./routes/orders_router");
require("./routes/users_router");

//El servidor empieza a escuchar
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

