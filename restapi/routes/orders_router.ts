import { Request, Response } from "express";
import * as mongodb  from "mongodb";
import * as service from "../services/DB_manager";
import * as Order from "../models/order";
import sanitizeHtml from "sanitize-html";

var app = require("../server");

// GET (todos los productos)
app.get("/orders", async (_req: Request, res: Response) => {
    try {
        var documents = await service.getCollection("Pedido"); //Se obtienen los datos del servicio
        
        res.status(200).send(documents); //Envía los datos como respuesta en json
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//ByID
app.get("/orders/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var query = { _id: new mongodb.ObjectId(id) };
        var order = await service.findBy("Pedido",query);

        if (order) {
            res.status(200).send(order);
        }
    } catch (error) {
        res.status(404).send(sanitizeHtml(`Unable to find matching document with id: ${req.params.id}`));
    }
});

// POST (Add)
app.post("/order/add", async (req: Request, res: Response) => {
    try {
        //Todavía podría cambiarse para que la empresa de distribución calcule las fechas  (calculateShipping)
        var newOrder = new Order.default(new Date(req.body.arrivalDate), new Date(req.body.confirmDate), 
            new Date(), req.body.totalAmount, req.body.productsOrdered, req.body.user_id);     

        newOrder.setCode() //Se genera el código del pedido
        newOrder.calculateShipping(); //Se calcula el envio

        var result = await service.addElement("Pedido",newOrder); //Añade a la collección Pedido

        result
            ? res.status(201).send(sanitizeHtml(`Successfully created a new order with id ${result.insertedId}`))
            : res.status(500).send(sanitizeHtml("Failed to create a new order."));
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT (update)
app.put("/order/update/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var updatedOrder: Order.default = req.body;
        var query = { _id: new mongodb.ObjectId(id) };
        var result = await service.updateElement("Pedido",query,updatedOrder);

        result
            ? res.status(200).send(sanitizeHtml(`Successfully updated order with id ${id}`))
            : res.status(304).send(sanitizeHtml(`Order with id: ${id} not updated`)); //Efectúa la operación de actualización

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
    
});

// DELETE
app.delete("/order/delete/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var query = { _id: new mongodb.ObjectId(id) };
        var result = await service.removeElement("Pedido", query);

        if (result && result.deletedCount) {
            res.status(202).send(sanitizeHtml(`Successfully removed order with id ${id}`));
        } else if (!result) {
            res.status(400).send(sanitizeHtml(`Failed to remove order with id ${id}`));
        } else if (!result.deletedCount) {
            res.status(404).send(sanitizeHtml(`Order with id ${id} does not exist`));
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

