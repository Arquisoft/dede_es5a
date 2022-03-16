import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import promBundle from 'express-prom-bundle';
import dotenv from "dotenv";


dotenv.config();

const app: Application = express();
module.exports = app;

const port: number = process.env.PORT != undefined ? parseInt(process.env.PORT) : -1;


const options: cors.CorsOptions = {
    origin: ['http://localhost:3000']
};

const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

app.use(cors(options));
app.use(express.json()); //El servidor trabaja con json

//Rutas a los controladores
require("./routes/products_router");
require("./routes/orders_router");
require("./routes/users_router");

//El servidor empieza a escuchar
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

