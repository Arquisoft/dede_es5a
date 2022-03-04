// External Dependencies
import mongodb from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Global Variables
export const collections: { products? : mongodb.Collection } = {
} //Datos de la base de datos

const URI: string = process.env.DATABASE_URI != undefined ? process.env.DATABASE_URI : "undefined"; //Datos para la conexión
const COLLECTION_PRODUCTS: string = process.env.COLLECTION_PRODUCTS != undefined ? process.env.COLLECTION_PRODUCTS : "undefined";

// Initialize Connection
export async function connectToProductsDatabase() {

    const client: mongodb.MongoClient = new mongodb.MongoClient(URI); //Obtenemos el cliente con la URI
    await client.connect(); //Nos conectamos

    const db: mongodb.Db = client.db(process.env.DB_NAME); //Vamos a la base de datos específica
    const productsCollection: mongodb.Collection = db.collection(COLLECTION_PRODUCTS); //vamos a la colección de productos en mongodb

    collections.products = productsCollection; //Almacena la colección en la variable products de co

    console.log(`Successfully connected to (database: ${db.databaseName} - collection: ${productsCollection.collectionName})`);
}