// External Dependencies
import express, { Request, Response } from "express";
import * as mongodb  from "mongodb";
import * as service from "../services/products.service";
import Product from "../models/product";
import sanitizeHtml from "sanitize-html";
import {app} from "../server";

/*
app.get("/abc", async (req: Request, res: Response) => {
    res.send("aaaaaa");
    console.log(await test.getCollection("Producto"));
});
*/


// GET (todos los productos)
app.get("/", async (_req: Request, res: Response) => {
    try {
       var products = await service.getCollection("Producto"); //Se obtienen los datos del servicio

        res.status(200).send(products); //Envía los datos como respuesta en json
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//ByID
app.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        var query = { _id: new mongodb.ObjectId(id) };
        var product = await service.findProductBy(query);

        if (product) {
            res.status(200).send(product);
        }
    } catch (error) {
        res.status(404).send(sanitizeHtml(`Unable to find matching document with id: ${req.params.id}`));
    }
});
/*
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
});*/
