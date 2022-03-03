import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import dotenv from "dotenv"; 
import { connectToDatabase } from "./services/products.service"
import { productsRouter } from "./routes/products.router";

dotenv.config();

const app: Application = express();
const port: number = process.env.PORT != undefined ? parseInt(process.env.PORT) : -1;

const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors(options));
app.use(bp.json());

connectToDatabase()
    .then(() => {
        app.use("/products", productsRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

