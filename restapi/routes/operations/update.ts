
import { Response, Request } from "express";


export async function updateDocument(req : Request, res : Response, operation : Function){
    var id = req?.params?.id;

    try {
        operation(id); //Efectúa la operación de actualización
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
} 