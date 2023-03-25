const request = require('supertest');
const app = require('../gallonQuoteFormServer.js');

describe('Testing validity of requestedGallons', () => {
  it('should return requestedGallons', async () => {
    const res = await request(app)
      .post('/FuelQuoteHistory.html')
      .send({ requestedGallons: 77, deliveryDate: '2025-03-22'});
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch('Request Recieved!');
  });

  it('should return an error if the requested gallons is 0 or less', async () => {
    const res = await request(app)
      .post('/FuelQuoteHistory.html')
      .send({ requestedGallons: -77, deliveryDate: '2025-03-22'});
    expect(res.statusCode).toBe(401);
    expect(res.text).toMatch('One or more entries is invalid!');
    });
});

describe('Testing validity of date', () => {
  it('should return validDate', async () => {
    const res = await request(app)
      .post('/FuelQuoteHistory.html')
      .send({ requestedGallons: 77, deliveryDate: '2025-03-20' });
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch('Request Recieved!');
  });

  it('should return an error if the date has past', async () => {
    const res = await request(app)
      .post('/FuelQuoteHistory.html')
      .send({ requestedGallons: 77, deliveryDate: '2023-03-22' });
    expect(res.statusCode).toBe(401);
    expect(res.text).toMatch('One or more entries is invalid!');
    });
});

describe('Testing validity of both inputs', () => {
  it('should return error for missing information', async () => {
    const res = await request(app)
      .post('/FuelQuoteHistory.html')
      .send({ });
    expect(res.statusCode).toBe(401);
    expect(res.text).toMatch('Please enter a value for requested gallons and delivery date!');
  });

  it('should return an error for missing one information', async () => {
    const res = await request(app)
      .post('/FuelQuoteHistory.html')
      .send({ requestedGallons: 77});
    expect(res.statusCode).toBe(401);
    expect(res.text).toMatch('Please enter a value for requested gallons and delivery date!');
    });
});