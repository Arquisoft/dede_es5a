import { Request, Response } from "express";
import * as mongodb  from "mongodb";
import * as service from "../services/DB_manager";
import * as Order from "../models/order";
import sanitizeHtml from "sanitize-html";
import { findAllDocuments } from "./operations/find_all";
import { updateDocument } from "./operations/update";
import { deleteDocument } from "./operations/delete";

var app = require("../server");

// GET (todos los productos)
app.get("/order/", async (_req: Request, res: Response) => {
    findAllDocuments("Pedidos", res);
});

//ByID
app.get("/order/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var query = { _id: new mongodb.ObjectId(id) };
        var order = await service.findOrderBy(query);

        if (order) {
            res.status(200).send(order);
        }
    } catch (error) {
        res.status(404).send(sanitizeHtml(`Unable to find matching document with id: ${req.params.id}`));
    }
});

// POST (Add)
app.post("/order/", async (req: Request, res: Response) => {
    try {
        //Todavía podría cambiarse para que la empresa de distribución calcule las fechas  (calculateShipping)
        var newOrder = new Order.default(new Date(req.body.arrivalDate), new Date(req.body.confirmDate), 
            new Date(), req.body.totalAmount, req.body.productsOrdered, req.body.user_id);     

        newOrder.setCode() //Se genera el código del pedido
        newOrder.calculateShipping(); //Se calcula el envio

        var result = await service.addOrder(newOrder); //Añade a la collección

        result
            ? res.status(201).send(sanitizeHtml(`Successfully created a new order with id ${result.insertedId}`))
            : res.status(500).send(sanitizeHtml("Failed to create a new product."));
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT (update)
app.put("/order/:id", async (req: Request, res: Response) => {
    updateDocument(req, res, //Llama a operations/update
        async (id : string) => {
            var updatedOrder: Order.default = req.body;
            var query = { _id: new mongodb.ObjectId(id) };
            var result = await service.updateOrder(query,updatedOrder);

            result
                ? res.status(200).send(sanitizeHtml(`Successfully updated order with id ${id}`))
                : res.status(304).send(sanitizeHtml(`Order with id: ${id} not updated`));
        })
    
});

// DELETE
app.delete("/order/:id", async (req: Request, res: Response) => {
    deleteDocument(req, res, 
        async (query:string) => { console.log(query)
            return service.removeOrder(query);})
});

