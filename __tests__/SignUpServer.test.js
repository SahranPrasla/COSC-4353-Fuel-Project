const request = require('supertest');
const app = require('../SignUpServer.js'); 

describe('Sign Up', () => {
  it('should return an error if any required fields are missing', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        //testing using missing/empty password field
        username: 'testuser'
      });
    expect(typeof(res.text)).toBe("string");
    expect(res.statusCode).toEqual(400);
    expect(res.text).toMatch('All fields are required');
  });


  it('should return an error if the password is too short', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        //testing using password field with less than 6 characters
        username: 'testuser',
        password: 'pw',
      });
    expect(typeof(res.text)).toBe("string");
    expect(res.statusCode).toEqual(400);
    expect(res.text).toMatch('Password must be at least 6 characters long');
  });


  it('should return a success message if sign up is successful', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        //testing using all nomral expected fields
        username: 'testuser',
        password: 'password',
      });
    expect(typeof(res.text)).toBe("string");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toMatch('Sign up successful');
  });

});




