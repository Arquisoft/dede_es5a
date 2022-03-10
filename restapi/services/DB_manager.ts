// External Dependencies
import dotenv, { config } from "dotenv";
import mongoose = require("mongoose");
import Product from "../models/product";
import Order from "../models/order";

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

    var client = await mongoose.connect(URI);
    console.log("Connected");

    return client;
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
//----------------------------------------------------------------------------------------------------------------------

//------------------------------------------ Consultas Producto --------------------------------------------------------
export async function findProductBy(filter:any) {
    var client = await connectToDatabase();
    var res = await client.connection.db.collection("Producto").find(filter).toArray();
    await client.connection.close(); // <---------------------- RECORDAR SIEMPRE CERRAR
    return res;
}

export async function addProduct(p:Product) {
    var client = await connectToDatabase();
    var res = await client.connection.db.collection("Producto").insertOne(p);
    await client.connection.close(); // <---------------------- RECORDAR SIEMPRE CERRAR
    return res;
}

export async function updateProduct(filter:any, p:Product) {
    var client = await connectToDatabase();
    var res = await client.connection.db.collection("Producto").replaceOne(filter,p);
    await client.connection.close(); // <---------------------- RECORDAR SIEMPRE CERRAR
    return res;
}

export async function removeProduct(filter:any) {
    var client = await connectToDatabase();
    var res = await client.connection.db.collection("Producto").deleteOne(filter);
    await client.connection.close(); // <---------------------- RECORDAR SIEMPRE CERRAR
    return res;
}

//----------------------------------------------------------------------------------------------------------------------

//------------------------------------------ Consultas Pedido ---------------------------------------------------------
export async function findOrderBy(filter:any) {
    var client = await connectToDatabase();
    var res = await client.connection.db.collection("Pedido").find(filter).toArray();
    await client.connection.close(); 
    return res;
}

export async function addOrder(o:Order) {
    var client = await connectToDatabase();
    var res = await client.connection.db.collection("Pedido").insertOne(o);
    await client.connection.close(); 
    return res;
}

export async function updateOrder(filter:any, o:Order) {
    var client = await connectToDatabase();
    var res = await client.connection.db.collection("Pedido").replaceOne(filter, o);
    await client.connection.close(); 
    return res;
}

export async function removeOrder(filter:any) {
    var client = await connectToDatabase();
    var res = await client.connection.db.collection("Pedido").deleteOne(filter);
    await client.connection.close(); 
    return res;
}


//----------------------------------------------------------------------------------------------------------------------

//------------------------------------------ Consultas Usuario ---------------------------------------------------------

