// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

// Global Variables
export const collections: { products?: mongoDB.Collection } = {} //Datos de la base de datos

const URI: string = process.env.DATABASE_URI != undefined ? process.env.DATABASE_URI : "undefined"; //Datos para la conexión
const COLLECTION_NAME: string = process.env.COLLECTION_PRODUCTS != undefined ? process.env.COLLECTION_PRODUCTS : "undefined";

// Initialize Connection
export async function connectToDatabase() {

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(URI); //Obtenemos el cliente con la URI
    await client.connect(); //Nos conectamos

    const db: mongoDB.Db = client.db(process.env.DB_NAME); //Vamos a la base de datos específica
    const productsCollection: mongoDB.Collection = db.collection(COLLECTION_NAME); //vamos a la conexión concreta

    collections.products = productsCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${productsCollection.collectionName}`);
}