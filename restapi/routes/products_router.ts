// External Dependencies
import { Request, Response } from "express";
import * as mongodb  from "mongodb";
import * as service from "../services/DB_manager";
import Product from "../models/product";
import sanitizeHtml from "sanitize-html";

var app = require("../server");

// GET (todos los productos)
app.get("/products", async (_req: Request, res: Response) => {
    try {
        var documents = await service.getCollection("Producto"); //Se obtienen los datos del servicio
        
        res.status(200).send(documents); //Envía los datos como respuesta en json
    } catch (error) {
        res.status(500).send(error.message);
    }
});

/**
 * Añadir producto al carrito
 */
 app.post("/products/addCart", async (req: Request, res: Response) => {
    var newProduct = {
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        quantity: req.body.quantity,
        image: req.body.image,
        _id: req.body._id,
    }
    
    if(req.session.cart == undefined)
        req.session.cart = new Array<any>();

    req.session.cart.push(newProduct);

    res.status(200).send();
});

/**
 * Actualizar producto al carrito
 */
 app.post("/products/updateCart", async (req: Request, res: Response) => {
    var newProduct = {
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        quantity: req.body.quantity,
        image: req.body.image,
        _id: req.body._id,
    }
   
    req.session.cart = req.session.cart.filter((el: { _id: any; size: any; }) => (el._id != newProduct._id && el.size != newProduct.size));
    req.session.cart.push(newProduct);
    
    res.status(200).send();
});

/**
 * Borrar del carrito
 */
app.delete("/products/deleteCart", async (req: Request, res: Response) => {
    var id = req.body._id;
    var size = req.body.size;

    req.session.cart = req.session.cart.filter((el: { _id: any; size: any; }) => (el._id != id && el.size != size));

    res.status(200).send();
});

/**
 * Limpiar carrito
 */
 app.get("/products/cleanCart", async (req: Request, res: Response) => {
    req.session.cart = new Array<any>();
    
    res.status(200).send();
});

//ByID
app.get("/products/:id", async (req: Request, res: Response) => {
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

//By filter
app.get("/products/:field/:value", async (req: Request, res: Response) => {
    var field = req.params.field;
    var value = req.params.value;

    try {
        var query = { [field] : value };
        
        var product = await service.findBy("Producto", query);

        if (product) {
            res.status(200).send(product);
        }
    } catch (error) {
        res.status(404).send(sanitizeHtml(`Unable to find matching document`));
    }
});

// POST (Add)
app.post("/products/add", async (req: Request, res: Response) => {
    try {
        var newProduct = new Product(
            req.body.name,
            req.body.price,
            req.body.type,
            req.body.brand,
            req.body.disponibility,
            req.body.description 
        );
       
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
app.put("/products/update/:id", async (req: Request, res: Response) => {
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
app.delete("/products/delete/:id", async (req: Request, res: Response) => {
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
        res.status(400).send(error.message);
    }
});

// DELETE by filter
app.delete("/products/delete/:field/:value", async (req: Request, res: Response) => {
    var field = req?.params?.field;
    var value = req?.params?.value;

    try {
        var query = { [field]: value };
        var result = await service.removeElement("Producto", query);

        if (result && result.deletedCount) {
            res.status(202).send(sanitizeHtml(`Successfully removed product`));
        } else if (!result) {
            res.status(400).send(sanitizeHtml(`Failed to remove product`));
        } else if (!result.deletedCount) {
            res.status(404).send(sanitizeHtml(`product does not exist`));
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});


