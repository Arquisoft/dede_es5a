// External Dependencies
import express, { Request, Response } from "express";
import * as mongodb  from "mongodb";
import * as service from "../services/DB_manager";
import sanitizeHtml from "sanitize-html";
import User from "../models/user";
import Product from "../models/product";
var app = require("../server");

// GET (todos los productos)
app.get("/users", async (_req: Request, res: Response) => {
    try {
       var users = await service.getCollection("Usuario"); //Se obtienen los datos del servicio

        res.status(200).send(users); //Envía los datos como respuesta en json
    } catch (error) {
        res.status(500).send(error.message);
    }
});

/**
 * Devuelve el objeto sesión de express
 */
 app.get("/users/session", async (req: Request, res: Response) => {
    res.status(200).send(req.session);
});

/**
 * Actualiza el objeto sesión de express
 */
 app.get("/users/updateSession", async (req: Request, res: Response) => {
    req.session = req.body.session;

    res.status(200).send();
});

//ByID
app.get("/users/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var query = { _id: new mongodb.ObjectId(id) };
        var user = await service.findBy("Usuario", query);

        if (user) {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(404).send(sanitizeHtml(`Unable to find matching document with id: ${req.params.id}`));
    }
});

//By filter
app.get("/users/:field/:value", async (req: Request, res: Response) => {
    var field = req.params.field;
    var value = req.params.value;

    try {
        var query = { [field] : value };
        
        var user = await service.findBy("Usuario", query);

        if (user) {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(404).send(sanitizeHtml(`Unable to find matching document`));
    }
});

// POST (Add)
app.post("/users/add", async (req: Request, res: Response) => {
    try {
        var newUser = req.body as User;

        var result = await service.addElement("Usuario", newUser); //Añade a la collección

        result
            ? res.status(201).send(sanitizeHtml(`Successfully created a new user with id ${result.insertedId}`))
            : res.status(500).send(sanitizeHtml("Failed to create a new user."));
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT (update)
app.put("/users/update/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var updatedUser: User = req.body;
        var query = { _id: new mongodb.ObjectId(id) };
        var result = await service.updateElement("Usuario", query, updatedUser);

        result
            ? res.status(200).send(sanitizeHtml(`Successfully updated user with id ${id}`))
            : res.status(304).send(sanitizeHtml(`User with id: ${id} not updated`));
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
app.delete("/users/delete/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var query = { _id: new mongodb.ObjectId(id) };
        var result = await service.removeElement("Usuario", query);

        if (result && result.deletedCount) {
            res.status(202).send(sanitizeHtml(`Successfully removed user with id ${id}`));
        } else if (!result) {
            res.status(400).send(sanitizeHtml(`Failed to remove user with id ${id}`));
        } else if (!result.deletedCount) {
            res.status(404).send(sanitizeHtml(`User with id ${id} does not exist`));
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post("/users/login", async (req: Request, res: Response) => {
    try {
        var filter = { webID : req.body.webID};
        
        var user = await service.findBy("Usuario", filter);
        
        if(user == null || user.length == 0){ // Usuario NO admin
            //Metemos al usuario en sesión
            req.session.usuario = { webID: req.body.webID, role: "user" };
            req.session.cart = new Array<any>();
            
            //Redirigir a otra pagina
            res.redirect(200,"/home");
        }
        else{
            //Metemos al usuario en sesión
            req.session.usuario = { webID: user[0].webID, role: user[0].role };
            req.session.cart = new Array<any>();
            
            //Redirigir a otra pagina
            res.redirect(200,"/home");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/users/logout", async (req: Request, res: Response) => {
    req.session.usuario = null;
    req.session.cart = null;
    res.send("Usuario desconectado");
});


