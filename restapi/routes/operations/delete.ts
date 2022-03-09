import { Request, Response } from "express";
import sanitizeHtml from "sanitize-html";
import * as mongodb  from "mongodb";

export async function deleteDocument(req : Request, res : Response, operation : Function){
    var id = req?.params?.id;

    try {
        var query = { _id: new mongodb.ObjectId(id) };
        var result = await operation(query); //Elimina (hace la operación pasada por param esperando hasta que llegue la respuesta con await)
        console.log(result);

        if (result && result.deletedCount) {
            res.status(202).send(sanitizeHtml(`Successfully removed document with id ${id}`));
        } else if (!result) {
            res.status(400).send(sanitizeHtml(`Failed to remove document with id ${id}`));
        } else if (!result.deletedCount) {
            res.status(404).send(sanitizeHtml(`document with id ${id} does not exist`));
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
} 