const express = require('express');
const app = express();

app.use(express.json());
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/SignUp.html');
});

// Route for handling sign up requests
app.post('/signup', (req, res) => {
  var { username, password} = req.body;
  // Do validation on the input data
  console.log(username);
  if (!username || !password ) {
    res.status(400).send('All fields are required');
  } else if (password.length < 6) {
    res.status(400).send('Password must be at least 6 characters long');
  } else {
    
    res.status(200).send('Sign up successful!');
  }
});

// Start the server on port 1000
const server = app.listen(1000, () => {
  console.log('Server started on port 1000');
});

module.exports = server;