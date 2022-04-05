import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import promBundle from 'express-prom-bundle';
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
module.exports = app;

const port: number = process.env.PORT != undefined ? parseInt(process.env.PORT) : 5000;

const options: cors.CorsOptions = {
    origin: ['http://localhost:3000','https://dede-es5a.herokuapp.com']
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
        res.redirect(""); //<--------- Probablemente mal
    }
});

//Aplicar RouterAdministrador
app.use("/users/logout",routerUsuarioSession);

//RouterAdministrador
var routerUsuarioAdministrador = express.Router();
routerUsuarioAdministrador.use(function(req, res, next) {
    if(req.session.usuario && req.session.usuario.role == "admin"){
        next();
    } else {
        console.log("Nope");
        //redireccionar al inicio
        res.redirect(""); //<--------- Probablemente mal
    }
});

//Aplicar RouterAdministrador
app.use("/products/add",routerUsuarioAdministrador);
app.use("/products/update",routerUsuarioAdministrador);
app.use("/products/delete",routerUsuarioAdministrador);
app.use("/users/add",routerUsuarioAdministrador);
app.use("/users/update",routerUsuarioAdministrador);
app.use("/users/delete",routerUsuarioAdministrador);

//Encriptación de contraseñas
var crypto = require('crypto');
app.set('clave','abcdefg');
app.set('crypto', crypto);

//Rutas a los controladores
require("./routes/products_router");
require("./routes/orders_router");
require("./routes/users_router");

//El servidor empieza a escuchar
var server = app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

module.exports = server;