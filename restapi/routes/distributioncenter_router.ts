import { Request, Response } from "express";
import * as mongodb  from "mongodb";
import * as service from "../services/DB_manager";
import DistributionCenter from "../models/distributionCenter";
import sanitizeHtml from "sanitize-html";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const MAPBOX_API_KEY: string = process.env.MAPBOX_API_KEY != undefined ? process.env.MAPBOX_API_KEY : "undefined"; //Datos para la conexión con Mapbox

const shippingCost : number = 0.015; //0.015€/km

var app = require("../server");

// GET (todos los centros de distribución)
app.get("/distributioncenters", async (_req: Request, res: Response) => {
    try {
        var documents = await service.getCollection("CentroDistribucion"); //Se obtienen los datos del servicio
        
        res.status(200).send(documents); //Envía los datos como respuesta en json
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//ByID
app.get("/distributioncenters/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var query = { _id: new mongodb.ObjectId(id) };
        var order = await service.findBy("CentroDistribucion",query);

        if (order) {
            res.status(200).send(order);
        }
    } catch (error) {
        res.status(404).send(sanitizeHtml(`Unable to find matching document with id: ${req.params.id}`));
    }
});

//By filter
app.get("/distributioncenters/:field/:value", async (req: Request, res: Response) => {
    var field = req.params.field;
    var value = req.params.value;

    try {
        var query = { [field] : value };
        
        var order = await service.findBy("CentroDistribucion", query);

        if (order) {
            res.status(200).send(order);
        }
    } catch (error) {
        res.status(404).send(sanitizeHtml(`Unable to find matching document`));
    }
});


// POST (Add)
app.post("/distributioncenters/add", async (req: Request, res: Response) => {
    try {
        //Todavía podría cambiarse para que la empresa de distribución calcule las fechas  (calculateShipping)
        var newDistributionCenter = new DistributionCenter(req.body.name, req.body.longitude, req.body.latitude);   

        var result = await service.addElement("CentroDistribucion", newDistributionCenter); //Añade a la collección Pedido

        result
            ? res.status(201).send(sanitizeHtml(`Successfully created a new distribution center with id ${result.insertedId}`))
            : res.status(500).send(sanitizeHtml("Failed to create a new distribution center."));
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT (update)
app.put("/distributioncenters/update/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var updatedOrder: DistributionCenter = req.body;
        var query = { _id: new mongodb.ObjectId(id) };
        var result = await service.updateElement("CentroDistribucion",query,updatedOrder);

        result
            ? res.status(200).send(sanitizeHtml(`Successfully updated distribution center with id ${id}`))
            : res.status(304).send(sanitizeHtml(`Distribution center with id: ${id} not updated`)); //Efectúa la operación de actualización

    } catch (error) {
        res.status(400).send(error.message);
    }
    
});

// DELETE
app.delete("/distributioncenters/delete/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var query = { _id: new mongodb.ObjectId(id) };
        var result = await service.removeElement("CentroDistribucion", query);

        if (result && result.deletedCount) {
            res.status(202).send(sanitizeHtml(`Successfully removed distribution center with id ${id}`));
        } else if (!result) {
            res.status(400).send(sanitizeHtml(`Failed to remove distribution center with id ${id}`));
        } else if (!result.deletedCount) {
            res.status(404).send(sanitizeHtml(`Distribution center with id ${id} does not exist`));
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});


/**
 * Calculates coordinates based on the address given as parameter
 * @returns the coordinates of clients address
 */
async function calculateCoordinates (addressInfo : any){

    var white_list = ["api.mapbox.com"];

    var mapBoxUri = new URL('https://api.mapbox.com/geocoding/v5/mapbox.places/'+ addressInfo.number + '%20' + addressInfo.street + '%20' + addressInfo.city +  '%20' + addressInfo.country + '%20' + addressInfo.zipcode + '.json?access_token=' + MAPBOX_API_KEY);
    
    if(white_list.includes(mapBoxUri.hostname)){
        //Utilizar coordenadas
       return await fetch(mapBoxUri)
            .then(function(response) {
                return response.json();
            })
            .then(function(addressInfoResult) {
            //Se obtienen las coordenadas del cliente
                return { 
                    "long" : addressInfoResult.features[0].center[0],
                    "lat" : addressInfoResult.features[0].center[1],
                }
            });

    }
        
}

/**
 * 
 * @param coordinatesClientAddress client coordinates based in an object latitude and longitude
 * @returns distance from distribution centre and client location
 */
async function calculateDistance(coordinatesClientAddress: any) {

    var centrosDistribucion = await service.getCollection('CentroDistribucion') //Se buscan los centros de distribución, por ahora solo 1

    var distributionCentreLong : number = centrosDistribucion[0].longitude
    var distributionCentreLat : number = centrosDistribucion[0].latitude

    return await fetch('https://api.mapbox.com/directions/v5/mapbox/driving/'+distributionCentreLong+'%2C'+distributionCentreLat+'%3B'+ coordinatesClientAddress.long +'%2C'+ coordinatesClientAddress.lat +'?alternatives=false&geometries=geojson&language=en&overview=simplified&steps=false&access_token=' + MAPBOX_API_KEY)
    .then(function(response) {
        return response.json();
    })
    .then(function(distanceInfo) {
        return (distanceInfo.routes[0].distance)/1000; //Distancia obtenida en km
    }); 
}

