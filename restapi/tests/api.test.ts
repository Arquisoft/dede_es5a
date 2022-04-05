import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp, { json } from 'body-parser';
import cors from 'cors';
import { doesNotMatch } from 'assert';

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
     * Test that when we search a product by ID, we receive one
     */
     it('not found',async () => {
        var id = "sdfsdfsdffmnth";
        const response:Response = await request(app).get("/products/"+id);
        expect(response.statusCode).toBe(404);
        expect(JSON.stringify(response.body)).toBe("{}");
    });
    
});

