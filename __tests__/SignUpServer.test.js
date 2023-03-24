const request = require('supertest');
const app = require('../SignUpServer.js'); 

describe('Sign Up', () => {
  it('should return an error if any required fields are missing', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        username: 'testuser',
      });
    //expect(res.statusCode).toEqual(400);
    expect(res.text).toMatch('All fields are required');
  });

});

describe('Sign Up', () => {
    it('should return an error if the password is too short', async () => {
        const res = await request(app)
          .post('/signup')
          .send({
            username: 'testuser',
            password: 'pw',
          });
        //expect(res.statusCode).toEqual(400);
        expect(res.text).toMatch('Password must be at least 6 characters long');
      });

});

describe('Sign Up', () => {
    it('should return a success message if sign up is successful', async () => {
        const res = await request(app)
          .post('/signup')
          .send({
            username: 'testuser',
            password: 'password',
          });
        //expect(res.statusCode).toEqual(200);
        expect(res.text).toMatch('Sign up successful');
      });
});

