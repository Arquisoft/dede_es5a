// External Dependencies
import { Request, Response } from "express";
import * as mongodb  from "mongodb";
import * as service from "../services/DB_manager";
import Product from "../models/product";
import sanitizeHtml from "sanitize-html";

var app = require("../server");

// GET (todos los productos)
app.get("/product/", async (_req: Request, res: Response) => {
    try {
        var documents = await service.getCollection("Producto"); //Se obtienen los datos del servicio
        
        res.status(200).send(documents); //Envía los datos como respuesta en json
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//ByID
app.get("/product/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var query = { _id: new mongodb.ObjectId(id) };
        var product = await service.findBy("Producto", query);

        if (product) {
            res.status(200).send(product);
        }
    } catch (error) {
        res.status(404).send(sanitizeHtml(`Unable to find matching document with id: ${req.params.id}`));
    }
});

// POST (Add)
app.post("/product/", async (req: Request, res: Response) => {
    try {
        var newProduct = req.body as Product;
        var result = await service.addElement("Producto", newProduct); //Añade a la collección

        result
            ? res.status(201).send(sanitizeHtml(`Successfully created a new product with id ${result.insertedId}`))
            : res.status(500).send(sanitizeHtml("Failed to create a new product."));
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT (update)
app.put("/product/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var updatedProduct: Product = req.body;
        
        var query = { _id: new mongodb.ObjectId(id) };
        var result = await service.updateElement("Producto", query,updatedProduct);
            result
                ? res.status(200).send(sanitizeHtml(`Successfully updated product with id ${id}`))
                : res.status(304).send(sanitizeHtml(`Product with id: ${id} not updated`));

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }

    
});

// DELETE
app.delete("/product/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var query = { _id: new mongodb.ObjectId(id) };
        var result = await service.removeElement("Producto", query);

        if (result && result.deletedCount) {
            res.status(202).send(sanitizeHtml(`Successfully removed product with id ${id}`));
        } else if (!result) {
            res.status(400).send(sanitizeHtml(`Failed to remove product with id ${id}`));
        } else if (!result.deletedCount) {
            res.status(404).send(sanitizeHtml(`product with id ${id} does not exist`));
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
