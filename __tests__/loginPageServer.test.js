const request = require('supertest');
const app = require('../loginPageServer.js');

describe('POST /GallonQuoteForm.html', () => {
  it('returns 200 OK and "Login successful!" message when given correct credentials', async () => {
    const res = await request(app)
    .post('/GallonQuoteForm.html')
    .send({ username: 'myusername', password: 'mypassword' });
    expect(res.statusCode).toBe(200);
    expect(typeof(res.text)).toBe("string");
    expect(res.text).toMatch('Login successful!');
  });

  it('returns 401 Unauthorized when given incorrect credentials', async () => {
    const res = await request(app)
    .post('/GallonQuoteForm.html')
    .send({ username: 'invalidusername', password: 'invalidpassword' });
    expect(res.statusCode).toBe(401);
    expect(typeof(res.text)).toBe("string");
    expect(res.text).toMatch('Invalid username or password');
  });
});