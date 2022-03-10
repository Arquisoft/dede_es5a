// External Dependencies
import { Request, Response } from "express";
import * as mongodb  from "mongodb";
import * as service from "../services/DB_manager";
import Product from "../models/product";
import sanitizeHtml from "sanitize-html";
import { findAllDocuments } from "./operations/find_all";
import { updateDocument } from "./operations/update";
import { deleteDocument } from "./operations/delete";

var app = require("../server");

// GET (todos los productos)
app.get("/product/", async (_req: Request, res: Response) => {
    findAllDocuments("Producto", res)
});

//ByID
app.get("/product/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

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

// POST (Add)
app.post("/product/", async (req: Request, res: Response) => {
    try {
        var newProduct = req.body as Product;
        var result = await service.addProduct(newProduct); //Añade a la collección

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
    updateDocument(req, res,  //Llama a operations/update
        async (id: string) =>{
            var updatedProduct: Product = req.body;
            var query = { _id: new mongodb.ObjectId(id) };
            var result = await service.updateProduct(query,updatedProduct);

            result
                ? res.status(200).send(sanitizeHtml(`Successfully updated product with id ${id}`))
                : res.status(304).send(sanitizeHtml(`Product with id: ${id} not updated`));
        })
    
});

// DELETE
app.delete("/product/:id", async (req: Request, res: Response) => {
    deleteDocument(req, res, 
        async (query:string) => { console.log(query)
            return service.removeProduct(query);})
});
