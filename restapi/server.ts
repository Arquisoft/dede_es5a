import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import promBundle from 'express-prom-bundle';
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
module.exports = app;

const port: number = process.env.PORT != undefined ? parseInt(process.env.PORT) : 5000;
const AZUREWEBAPP_URI = process.env.AZUREWEBAPP_URI != undefined ? process.env.AZUREWEBAPP_URI : "";

//Se indican los hosts a los que permite el acceso, serían localhost, la webapp de heroko y la de azure por orden
const options: cors.CorsOptions = {
    origin: ['http://localhost:3000','https://dede-es5a.herokuapp.com', AZUREWEBAPP_URI]
};

//Sesión de express
var expressSession = require('express-session');
app.use(expressSession({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 15
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

//Rutas a los controladores
require("./routes/products_router");
require("./routes/orders_router");
require("./routes/users_router");
require("./routes/distributioncenter_router");

//El servidor empieza a escuchar
var server = app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

module.exports = server;