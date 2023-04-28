const request = require('supertest');
const app = require('../loginPageServer.js');

describe('Login get request', () => {
  it('should open page to loginPage.html', async () => {
    const res = await request(app)
      .get('/login')
    expect(res.statusCode).toEqual(200);
  });
  });

describe('POST /login', () => {
  it('returns 200 OK and "Login successful!" message when given correct credentials', async () => {
    const res = await request(app)
    .post('/login')
    .send({ username: 'username', password: 'password' });
    expect(res.statusCode).toEqual(200);
  });

  it('returns 401 Unauthorized when given incorrect credentials', async () => {
    const res = await request(app)
    .post('/login')
    .send({ username: 'invalidusername'});
    expect(res.statusCode).toEqual(401);
  });
});