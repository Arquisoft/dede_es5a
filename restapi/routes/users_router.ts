// External Dependencies
import express, { Request, Response } from "express";
import * as mongodb  from "mongodb";
import * as service from "../services/DB_manager";
import sanitizeHtml from "sanitize-html";
import User from "../models/user";
var app = require("../server");

// GET (todos los productos)
app.get("/user/", async (_req: Request, res: Response) => {
    try {
       var users = await service.getCollection("Usuario"); //Se obtienen los datos del servicio

        res.status(200).send(users); //Envía los datos como respuesta en json
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//ByID
app.get("/user/:id", async (req: Request, res: Response) => {
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

// POST (Add)
app.post("/user/", async (req: Request, res: Response) => {
    try {
        var newUser = req.body as User;

        newUser.password = app.get("crypto").createHmac('sha256', app.get('clave')).update(req.body.password).digest('hex');

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
app.put("/user/:id", async (req: Request, res: Response) => {
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
app.delete("/user/:id", async (req: Request, res: Response) => {
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
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

app.post("/identificarse", async (req: Request, res: Response) => {
    try {
        var pass = app.get("crypto").createHmac('sha256', app.get('clave')).update(req.body.password).digest('hex');
        var filter = { username : req.body.username, password : pass };
        
        var user = await service.findBy("Usuario", filter);

        if(user == null || user.length == 0){
            res.status(500).send("Usuario y/o contraseña no coinciden");
        }
        else{
            //Metemos al usuario en sesión
            req.session.usuario = { user: user[0].username, role: user[0].role };
            
            //Redirigir a otra pagina
            console.log(req.session);
            res.status(200).send();

        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/desconectarse", async (req: Request, res: Response) => {
    req.session.usuario = null;
    res.send("Usuario desconectado");
});