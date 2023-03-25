const request = require('supertest');
const app = require('../FuelQuoteServer.js');
//jest __tests__/FuelQuoteServer.test.js

// Group Unit Tests, The first checks if Unit Test return Booleans
// Have to Tweak!
describe('Fuel Quote Form', () => {
    /*
    it('Get /todos --> array todos', async () => {
        return request(app)
        .get('/todos')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => { 
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: expect.any(String),
                        completed: expect.any(Boolean),
                    }),
                ])
            );
        });
    });               
    */
    // Checks if data matches, if match -> pass
    it('Get GallonsRequest --> Recieve GallonRequest ', async () => {
        const res = await request(app)
        .post('/fuelquote')
        .send({ recievedGallons: 1000, address: '123 Address Ln',
         price: 10000, profit: 20000});
         expect(res.statusCode).toBe(200);
        expect(res.text).toMatch('Recived Information');
    });

    // Check if data does not match, if !match -> pass
    it('Get GallonRequest --> 401 !Match', async () => {
        const res = await request(app)
       .post('/fuelquote')
       .send({ recievedGallons: 1001, address: '123 Address Ln',
       price: 10000, profit: 20000 });
       expect(res.statusCode).toBe(401);
       expect(res.text).toMatch('Incorrect Request!');
    });

});