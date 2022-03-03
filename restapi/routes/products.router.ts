// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/products.service";
import Product from "../models/product";

// Global Config
export const productsRouter = express.Router();

productsRouter.use(express.json());

// GET (todos los productos)
productsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const products = (await collections.products!.find({}).toArray()) as unknown as Product[]; //Se obtienen los datos del servicio

        res.status(200).send(products); //Envía los datos como respuesta en json
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//ByID
productsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const product = (await collections.products!.findOne(query)) as unknown as Product;

        if (product) {
            res.status(200).send(product);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST (Add)
productsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newGame = req.body as Product;
        const result = await collections.products!.insertOne(newGame); //Añade a la collección

        result
            ? res.status(201).send(`Successfully created a new product with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new product.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT (update)
productsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedProduct: Product = req.body as Product;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.products!.updateOne(query, { $set: updatedProduct });

        result
            ? res.status(200).send(`Successfully updated product with id ${id}`)
            : res.status(304).send(`Product with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
productsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.products!.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed product with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove product with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Product with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});