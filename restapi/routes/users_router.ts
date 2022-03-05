// External Dependencies
import express, { Request, Response } from "express";
import * as mongodb  from "mongodb";
import * as service from "../services/DB_manager";
import Product from "../models/product";
import sanitizeHtml from "sanitize-html";
import {app} from "../server";

// GET (todos los productos)
app.get("/user/", async (_req: Request, res: Response) => {
    try {
       var users = await service.getCollection("Usuario"); //Se obtienen los datos del servicio

        res.status(200).send(users); //Envía los datos como respuesta en json
    } catch (error) {
        res.status(500).send(error.message);
    }
});