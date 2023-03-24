const request = require('supertest');
const app = require('../profileManagementServer.js');

describe('Profile Management', () => {
  it('returns 200 OK and "Profile successful!" message when given correct credentials', async () => {
    const res = await request(app)
        .post('/saveProfile')
        .send({ fullName: 'KabeerAli', address1: '786 Haye Dr', address2: 'N/A', city: 'Houston',
     state: 'TX', zipcode: '77564' });
    expect(200);
    expect(res.text).toMatch('Profile successful!');
  });
  
  it('returns 401 if profile is not created', async () => {
    const res = await request(app)
        .post('/saveProfile')
        .send({ fullName: 'KabeerAli2', address1: '786 Haye D2r', address2: 'N/2A', city: 'Hous2ton',
    state: 'T2X', zipcode: '772564' });
    expect(401);
    expect(res.text).toMatch('Invalid Profile');
  });

  it('returns 401 if profile is not created', async () => {
    const res = await request(app)
        .post('/saveProfile')
        .send({ fullName: 'KabeerAli2', address1: '786 Haye D2r', address2: 'N/2A', city: 'Hous2ton',
    state: 'T2X'});
    expect(401);
    expect(res.text).toMatch('Invalid Profile');
  });

});