import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import promBundle from 'express-prom-bundle';
import dotenv from "dotenv";
import { connectToProductsDatabase } from "./services/products.service"
import { productsRouter } from "./routes/products.router";

dotenv.config();

const app: Application = express();
const port: number = process.env.PORT != undefined ? parseInt(process.env.PORT) : -1;

const options: cors.CorsOptions = {
    origin: ['http://localhost:3000']
};

const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

app.use(cors(options));
app.use(express.json()); //El servidor trabaja con json

connectToProductsDatabase() //Nos conectamos a la base de datos DeDe (collección de productos)
    .then(() => {
        app.use("/products", productsRouter); //Las rutas de la api de productos serán http://localhost:5000/products/
    })
    .catch((error: Error) => {
        console.error("Products connection failed", error); //Captura si se produce algún error al conectarse a mongoDB
        process.exit();
    });



//El servidor empieza a escuchar
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

