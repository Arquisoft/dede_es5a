import { Response } from "express";
import * as service from "../../services/DB_manager";

// Unifica todos los accesos para recuperar la collección entera de un determinado elemento
export async function findAllDocuments(collectionName : string, res: Response) {
    try {
        var documents = await service.getCollection(collectionName); //Se obtienen los datos del servicio
        
        res.status(200).send(documents); //Envía los datos como respuesta en json
    } catch (error) {
        res.status(500).send(error.message);
    }
}