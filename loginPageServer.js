const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use middleware to parse incoming request bodies
app.use(express.json());

app.get('/GallonQuoteForm.html', (req, res) => {
  res.sendFile(__dirname + '/loginPage.html');
});

// Route for handling login requests
app.post('/GallonQuoteForm.html', (req, res) => {
  const { username, password } = req.body;
  if (username === 'myusername' && password === 'mypassword') {
    res.status(200).send('Login successful!');
  } else {
    res.status(401).send('Invalid username or password');
  }
});

// Start the server on port 3000
const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = server;