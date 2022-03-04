import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import promBundle from 'express-prom-bundle';
import dotenv from "dotenv";

dotenv.config();

export const app: Application = express();
const port: number = 5000 /*process.env.PORT != undefined ? parseInt(process.env.PORT) : -1*/;


const options: cors.CorsOptions = {
    origin: ['http://localhost:3000']
};

const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

app.use(cors(options));
app.use(express.json()); //El servidor trabaja con json

//Ruta al controlador
require("./routes/products.router");

//El servidor empieza a escuchar
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

