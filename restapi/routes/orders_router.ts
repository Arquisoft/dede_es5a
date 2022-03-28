import { Request, Response } from "express";
import * as mongodb  from "mongodb";
import * as service from "../services/DB_manager";
import * as Order from "../models/order";
import sanitizeHtml from "sanitize-html";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const MAPBOX_API_KEY: string = process.env.MAPBOX_API_KEY != undefined ? process.env.MAPBOX_API_KEY : "undefined"; //Datos para la conexión con Mapbox

const shippingCost : number = 0.015; //0.015€/km

var app = require("../server");

// GET (todos los productos)
app.get("/orders", async (_req: Request, res: Response) => {
    try {
        var documents = await service.getCollection("Pedido"); //Se obtienen los datos del servicio
        
        res.status(200).send(documents); //Envía los datos como respuesta en json
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//ByID
app.get("/orders/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var query = { _id: new mongodb.ObjectId(id) };
        var order = await service.findBy("Pedido",query);

        if (order) {
            res.status(200).send(order);
        }
    } catch (error) {
        res.status(404).send(sanitizeHtml(`Unable to find matching document with id: ${req.params.id}`));
    }
});

// POST calculates order shipping price 
// Recibe en el cuerpo de la petición los datos del pedido así como los del usuario para el que se envía el pedido
app.post("/orders/price", async (req: Request, res: Response) => {
    try {    

        var addressInfo = {
            "number": req.body.number,
            "street": req.body.address,
            "city": req.body.city,
            "country": req.body.country,
            "zipcode": req.body.zipcode
        }

        //Calculamos las coordenadas del pedido en base a la direcci´on del cliente
        var coordinatesClientAddress = await calculateCoordinates(addressInfo);

        //Calculamos la distancia entre las coordenadas de la dirección del cliente y la dirección del centro de distribución
        var distance = await calculateDistance(coordinatesClientAddress);
        
        //Se calcula el coste en base a la distancia. (0,30€/km)
        var shippingPrice = distance*shippingCost;
        res.send(JSON.stringify({
            "shippingPrice" : shippingPrice
        }))

            
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// POST (Add)
app.post("/orders/add", async (req: Request, res: Response) => {
    try {
        //Todavía podría cambiarse para que la empresa de distribución calcule las fechas  (calculateShipping)
        var newOrder = new Order.default(new Date(req.body.arrivalDate), new Date(req.body.confirmDate), 
            new Date(), req.body.totalAmount, req.body.shippingPrice, req.body.productsOrdered, req.body.user_id);   

        newOrder.setCode() //Se genera el código del pedido

        var result = await service.addElement("Pedido",newOrder); //Añade a la collección Pedido

        result
            ? res.status(201).send(sanitizeHtml(`Successfully created a new order with id ${result.insertedId}`))
            : res.status(500).send(sanitizeHtml("Failed to create a new order."));
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT (update)
app.put("/orders/update/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var updatedOrder: Order.default = req.body;
        var query = { _id: new mongodb.ObjectId(id) };
        var result = await service.updateElement("Pedido",query,updatedOrder);

        result
            ? res.status(200).send(sanitizeHtml(`Successfully updated order with id ${id}`))
            : res.status(304).send(sanitizeHtml(`Order with id: ${id} not updated`)); //Efectúa la operación de actualización

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
    
});

// DELETE
app.delete("/orders/delete/:id", async (req: Request, res: Response) => {
    var id = req?.params?.id;

    try {
        var query = { _id: new mongodb.ObjectId(id) };
        var result = await service.removeElement("Pedido", query);

        if (result && result.deletedCount) {
            res.status(202).send(sanitizeHtml(`Successfully removed order with id ${id}`));
        } else if (!result) {
            res.status(400).send(sanitizeHtml(`Failed to remove order with id ${id}`));
        } else if (!result.deletedCount) {
            res.status(404).send(sanitizeHtml(`Order with id ${id} does not exist`));
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});


/**
 * Calculates coordinates based on the address given as parameter
 * @returns the coordinates of clients address
 */
async function calculateCoordinates (addressInfo : any){
    //Utilizar coordenadas
    var coordinates = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+ addressInfo.number + '%20' + addressInfo.street + '%20' + addressInfo.city +  '%20' + addressInfo.country + '%20' + addressInfo.zipcode + '.json?access_token=' + MAPBOX_API_KEY)
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
    return coordinates;
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

    //var distance = await fetch('https://api.mapbox.com/directions/v5/mapbox/driving/'+distributionCentreLong+'%2C'+distributionCentreLat+'%3B'+ coordinatesClientAddress.long +'%2C'+ coordinatesClientAddress.lat +'?alternatives=false&geometries=geojson&language=en&overview=simplified&steps=false&access_token=' + MAPBOX_API_KEY)
    var distance = await fetch('https://api.mapbox.com/directions/v5/mapbox/driving/'+distributionCentreLong+'%2C'+distributionCentreLat+'%3B'+ coordinatesClientAddress.long +'%2C'+ coordinatesClientAddress.lat +'?alternatives=false&geometries=geojson&language=en&overview=simplified&steps=false&access_token=' + MAPBOX_API_KEY)
    .then(function(response) {
        return response.json();
    })
    .then(function(distanceInfo) {
        return (distanceInfo.routes[0].distance)/1000; //Distancia obtenida en km
    }); 

    return distance;
}

