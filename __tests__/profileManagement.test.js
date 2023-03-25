const request = require('supertest');
const app = require('../profileManagementServer.js');
const path = require('path');


describe('Profile Management', () => {
  it('returns 200 OK and "Profile successful!" message when given correct credentials', async () => {
    const res = await request(app)
        .post('/saveProfile')
        .send({ fullName: 'KabeerAli', address1: '786 Haye Dr', address2: 'N/A', city: 'Houston',
     state: 'TX', zipcode: '77564' });
     expect(res.statusCode).toBe(200);
    expect(res.text).toMatch('Profile successful!');
  });
  
  it('returns 401 if profile is not created', async () => {
    const res = await request(app)
        .post('/saveProfile')
        .send({ fullName: 'KabeerAli2', address1: '786 Haye D2r', address2: 'N/2A', city: 'Hous2ton',
    state: 'T2X', zipcode: '772564' });
    expect(res.statusCode).toBe(401);
    expect(res.text).toMatch('Invalid Profile');
  });

  it('returns 401 if profile is not created', async () => {
    const res = await request(app)
        .post('/saveProfile')
        .send({ fullName: 'KabeerAli2', address1: '786 Haye D2r', address2: 'N/2A', city: 'Hous2ton',
    state: 'T2X'});
    expect(res.statusCode).toBe(401);
    expect(res.text).toMatch('Invalid Profile');
  });

  // it('should return the ProfileManagement.html file', async () => {
  //   const res = await request(app)
  //   .get('/saveProfile')
  //   expect(res.statusCode).toBe(200);
  //   expect(res.text).toMatch('/Users/kabeerali/Documents/GitHub/COSC-4353-Fuel-Project/ProfileManagement.html');
  // });

});

// describe('GET /saveProfile', () => {
//   it('should return the ProfileManagement.html file', async () => {
//     const res = await request(app).get('/saveProfile');
//     expect(res.statusCode).toEqual(200);
    
//     const expectedFilePath = path.join(process.cwd(), 'ProfileManagement.html');
//     console.log("TEST SIDE" + expectedFilePath);
//     //expect(res.text).toMatch(process.cwd() + 'ProfileManagement.html');

//     expect(res.text).toMatch('/Users/kabeerali/Documents/GitHub/COSC-4353-Fuel-Project/ProfileManagement.html');
//   });
// });