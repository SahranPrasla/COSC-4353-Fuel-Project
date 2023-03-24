const request = require('supertest');
const app = require('../gallonQuoteFormServer.js');

describe('Testing validity of requestedGallons', () => {
  it('should return requestedGallons', async () => {
    const res = await request(app)
      .post('/FuelQuoteHistory.html')
      .send({ requestedGallons: 77 });
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch('Requested Gallons: 77');
  });

  it('should return an error if the requested gallons is 0', async () => {
    const res = await request(app)
      .post('/FuelQuoteHistory.html')
      .send({ requestedGallons: -77 });
    expect(res.statusCode).toBe(401);
    expect(res.text).toMatch('Invalid Request!');
    });
});