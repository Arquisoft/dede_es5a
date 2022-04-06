import request, {Response} from 'supertest';
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

describe('User ', () => {
    /**
     * Test that when we search for a user by ID, we receive one
     */
     it('can be found',async () => {
        var id = "621f6c62ecbf436ec7e015dc";
        const response:Response = await request(app).get("/users/"+id);

        expect(response.statusCode).toBe(200);
        expect(JSON.stringify(response.body).length).toBeGreaterThan(0);
    });

    /**
     * Test that when we search for a user by ID that does not exist, we receive none
     */
     it('not found, does not exist',async () => {
        var id = "nobody_here";
        const response:Response = await request(app).get("/users/"+id);
        expect(response.statusCode).toBe(404);
        expect(JSON.stringify(response.body)).toBe("{}");
    });
    
    /**
     * Test that when we add a user, it is correctly added
     */
     it('correctly added',async () => {
        const newUser = {
            "role":"test_role",
            "webID":"url_test"
        };

        const response:Response = await request(app).post("/users/add").send(newUser);
        expect(response.statusCode).toBe(201);
    });

    /**
     * Test that when we update a user, it is correctly updated
     */
     it('correctly update',async () => {
        const newUser = {
            "role":"new_test_role",
            "webID":"new_url_test"
        };

        var role = "test_role";
        const aux:Response = await request(app).get("/users/role/"+role);
        var id = JSON.stringify(aux.body);

        const response:Response = await request(app).put("/users/update/"+JSON.parse(id)[0]._id).send(newUser);
        expect(response.statusCode).toBe(200);
    });

    /**
     * Test that when we delete a user, it is correctly deleted
     */
    it('correctly deleted',async () => {
        var role = "new_test_role";
        const aux:Response = await request(app).get("/users/role/"+role);
        var id = JSON.stringify(aux.body);

        const response:Response = await request(app).delete("/users/delete/"+JSON.parse(id)[0]._id);
        expect(response.statusCode).toBe(202);
    });

    /**
     * Test that when we delete a non-existing user, we receive the correct status code
     */
    it('deleted but does not exist',async () => {
        const response:Response = await request(app).delete("/users/delete/nobody_here");
        expect(response.statusCode).toBe(400);
    });
});

describe('Order ', () => {
    /**
     * Test that when we search for a order by ID, we receive one
     */
     it('can be found',async () => {
        var id = "6229194ef5597f678b575782";
        const response:Response = await request(app).get("/orders/"+id);

        expect(response.statusCode).toBe(200);
        expect(JSON.stringify(response.body).length).toBeGreaterThan(0);
    });

    /**
     * Test that when we search for a order by ID that does not exist, we receive none
     */
     it('not found, does not exist',async () => {
        var id = "skhdfkjshdkjfh";
        const response:Response = await request(app).get("/orders/"+id);
        expect(response.statusCode).toBe(404);
        expect(JSON.stringify(response.body)).toBe("{}");
    });
    
    /**
     * Test that when we add a order, it is correctly added
     */
     it('correctly added',async () => {
        var products = new Array();
        const neworder = {
            "arrivalDate":"2022-12-22",
            "confirmDate":"2022-10-22",
            "totalAmount":99.99,
            "shippingPrice":2.50,
            "productsOrdered":products,
            "user_id":"url_test"
        };

        const response:Response = await request(app).post("/orders/add").send(neworder);
        expect(response.statusCode).toBe(201);
    });

    /**
     * Test that when we update a order, it is correctly updated
     */
     it('correctly update',async () => {
        var products = new Array();
        const neworder = {
            "arrivalDate":"2022-12-22",
            "confirmDate":"2022-10-22",
            "totalAmount":1515.30,
            "shippingPrice":2.50,
            "productsOrdered":products,
            "user_id":"new_url_test"
        };

        var user_id = "url_test";
        const aux:Response = await request(app).get("/orders/user_id/"+user_id);
        var id = JSON.stringify(aux.body);

        const response:Response = await request(app).put("/orders/update/"+JSON.parse(id)[0]._id).send(neworder);
        expect(response.statusCode).toBe(200);
    });

    /**
     * Test that when we delete a order, it is correctly deleted
     */
    it('correctly deleted',async () => {
        var user_id = "new_url_test";
        const aux:Response = await request(app).get("/orders/user_id/"+user_id);
        var id = JSON.stringify(aux.body);

        const response:Response = await request(app).delete("/orders/delete/"+JSON.parse(id)[0]._id);
        expect(response.statusCode).toBe(202);
    });

    /**
     * Test that when we delete a non-existing order, we receive the correct status code
     */
    it('deleted but does not exist',async () => {
        const response:Response = await request(app).delete("/orders/delete/noOrder_here");
        expect(response.statusCode).toBe(404);
    });
});