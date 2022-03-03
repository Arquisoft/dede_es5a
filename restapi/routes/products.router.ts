// External Dependencies
import express, { Request, Response } from "express";
import  mongodb  from "mongodb";
import { collections } from "../services/products.service";
import Product from "../models/product";
import sanitizeHtml from "sanitize-html";


// Global Config
export const productsRouter = express.Router();
productsRouter.use(express.json()); //Usará json

let collectionProducts : mongodb.Collection; //Almacenará la collección del servicio
if(collections.products !== undefined){  //Se comprueba que existe una colección
    collectionProducts = collections.products; //Se obtiene la colección del servicio
}


// GET (todos los productos)
productsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const products = (await collectionProducts.find({}).toArray()); //Se obtienen los datos del servicio

        res.status(200).send(products); //Envía los datos como respuesta en json
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//ByID
productsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new mongodb.ObjectId(id) };
        const product = (await collectionProducts.findOne(query));

        if (product) {
            res.status(200).send(product);
        }
    } catch (error) {
        res.status(404).send(sanitizeHtml(`Unable to find matching document with id: ${req.params.id}`));
    }
});

// POST (Add)
productsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newGame = req.body as Product;
        const result = await collectionProducts.insertOne(newGame); //Añade a la collección

        result
            ? res.status(201).send(sanitizeHtml(`Successfully created a new product with id ${result.insertedId}`))
            : res.status(500).send(sanitizeHtml("Failed to create a new product."));
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT (update)
productsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedProduct: Product = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
      
        const result = await collectionProducts.updateOne(query, { $set: updatedProduct });

        result
            ? res.status(200).send(sanitizeHtml(`Successfully updated product with id ${id}`))
            : res.status(304).send(sanitizeHtml(`Product with id: ${id} not updated`));
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
productsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collectionProducts.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(sanitizeHtml(`Successfully removed product with id ${id}`));
        } else if (!result) {
            res.status(400).send(sanitizeHtml(`Failed to remove product with id ${id}`));
        } else if (!result.deletedCount) {
            res.status(404).send(sanitizeHtml(`Product with id ${id} does not exist`));
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});