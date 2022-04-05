import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp, { json } from 'body-parser';
import cors from 'cors';
import { doesNotMatch } from 'assert';
import Product from '../models/product';
import { Disponibility } from '../models/disponibility';

var app = require("../server");
var server = require("../server");

beforeAll(async () => {
});

afterAll(async () => {
    server.close() //close the server
})

describe('Product ', () => {
    /**
     * Test that when we search a product by ID, we receive one
     */
     it('can be found',async () => {
        var id = "6228ea24dc1289fc6e1c3b12";
        const response:Response = await request(app).get("/products/"+id);

        expect(response.statusCode).toBe(200);
        expect(JSON.stringify(response.body).length).toBeGreaterThan(0);
    });

    /**
     * Test that when we search a product by ID that does not exist, we receive none
     */
     it('not found, does not exist',async () => {
        var id = "sdfsdfsdffmnth";
        const response:Response = await request(app).get("/products/"+id);
        expect(response.statusCode).toBe(404);
        expect(JSON.stringify(response.body)).toBe("{}");
    });
    
    /**
     * Test that when we add a product, it is correctly added
     */
     it('correctly added',async () => {
        var disp = new Set<Disponibility>();
        const newProduct = {
            "name":"test_name",
            "price":20.99,
            "type":"test_type",
            "brand":"test_brand",
            "disponibility":disp,
            "description":"test_description" 
        };

        const response:Response = await request(app).post("/products/add").send(newProduct);
        expect(response.statusCode).toBe(201);
    });

    /**
     * Test that when we update a product, it is correctly updated
     */
     it('correctly update',async () => {
        var disp = new Set<Disponibility>();
        const newProduct = {
            "name":"test_name",
            "price":999.99,
            "type":"test_type",
            "brand":"test_brand",
            "disponibility":disp,
            "description":"test_description" 
        };

        var name = "test_name";
        const aux:Response = await request(app).get("/products/name/"+name);
        var id = JSON.stringify(aux.body);

        const response:Response = await request(app).put("/products/update/"+JSON.parse(id)[0]._id).send(newProduct);
        expect(response.statusCode).toBe(200);
    });

    /**
     * Test that when we delete a product, it is correctly deleted
     */
    it('correctly deleted',async () => {
        var name = "test_name";
        const aux:Response = await request(app).get("/products/name/"+name);
        var id = JSON.stringify(aux.body);

        const response:Response = await request(app).delete("/products/delete/"+JSON.parse(id)[0]._id);
        expect(response.statusCode).toBe(202);
    });

    /**
     * Test that when we delete a non-existing product, it is correctly deleted
     */
    it('deleted but does not exist',async () => {
        const response:Response = await request(app).delete("/products/delete/kjshfgkjhdkjghljdslglkasjd");
        expect(response.statusCode).toBe(400);
    });
});

