const request = require('supertest');
const app = require('../loginPageServer.js');

describe('POST /login', () => {
  test('returns 200 OK and "Login successful!" message when given correct credentials', async () => {
    const response = await request(app)
    .post('/login')
    .send({ username: 'myusername', password: 'mypassword' });
    expect(200);
    expect('Login successful!');
  });

  test('returns 401 Unauthorized when given incorrect credentials', async () => {
    const response = await request(app)
    .post('/login')
    .send({ username: 'invalidusername', password: 'invalidpassword' });
    expect(401);
    expect('Invalid username or password');
  });
});