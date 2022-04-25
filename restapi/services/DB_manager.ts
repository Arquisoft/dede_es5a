// External Dependencies
import dotenv from "dotenv";
import mongoose = require("mongoose");

dotenv.config();

//Datos de la base de datos

const URI: string = process.env.DATABASE_URI != undefined ? process.env.DATABASE_URI : "undefined"; //Datos para la conexión

//------------------------------------------ Consultas Base -------------------------------------------------------------
/** Conecta con la base de datos. En todos los demas metodos hay que:
 *  - Llamar a este metodo
 *  - Hacer lo que sea que tenga que hacer
 *  - Cerrar la conexión
 * 
 */ 
async function connectToDatabase() {
    return mongoose.connect(URI);
}

/**
 * Obtiene una colección de la BD
 * @param collection Nombre de la colección
 * @returns Array con la colección
 */
export async function getCollection(collection:string) {
    var client = await connectToDatabase();
    var res = await client.connection.db.collection(collection).find().toArray();
    await client.connection.close(); // <---------------------- RECORDAR SIEMPRE CERRAR
    return res;
}

export async function findBy(collection:string, filter:any) {
    var client = await connectToDatabase();
    var res = await client.connection.db.collection(collection).find(filter).toArray();
    await client.connection.close(); // <---------------------- RECORDAR SIEMPRE CERRAR
    return res;
}

export async function addElement(collection:string, p:any) {
    var client = await connectToDatabase();
    var res = await client.connection.db.collection(collection).insertOne(p);
    await client.connection.close(); // <---------------------- RECORDAR SIEMPRE CERRAR
    return res;
}

export async function updateElement(collection:string, filter:any, p:any) {
    var client = await connectToDatabase();
    var res = await client.connection.db.collection(collection).replaceOne(filter,p);
    await client.connection.close(); // <---------------------- RECORDAR SIEMPRE CERRAR
    return res;
}

export async function removeElement(collection:string, filter:any) {
    var client = await connectToDatabase();
    var res = await client.connection.db.collection(collection).deleteOne(filter);
    await client.connection.close(); // <---------------------- RECORDAR SIEMPRE CERRAR
    return res;
}

//----------------------------------------------------------------------------------------------------------------------
