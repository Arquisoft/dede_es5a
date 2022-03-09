import { Request, Response } from "express";
import * as service from "../services/DB_manager";

// Unifica todos los accesos para recuperar la collección entera de un determinado elemento
export async function findAll(collection : string, res: Response) {
    try {
        var orders = await service.getCollection(collection); //Se obtienen los datos del servicio
        
        res.status(200).send(orders); //Envía los datos como respuesta en json
    } catch (error) {
        res.status(500).send(error.message);
    }
}