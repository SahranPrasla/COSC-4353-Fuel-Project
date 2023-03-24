const express = require('express');


const app = express();

// Use middleware to parse incoming request bodies
app.use(express.json());

// Serve login form
app.get('/saveProfile', (req, res) => {
  res.sendFile(__dirname + '/ProfileManagement.html');
});

// Route for handling login requests
app.post('/saveProfile', (req, res) => {
  const { fullName, address1, address2, city, state, zipcode } = req.body;
  if (fullName == 'KabeerAli' && address1 == '786 Haye Dr' && address2 == 'N/A' && city == 'Houston' 
  && state == 'TX' && zipcode == '77564') {
    res.status(200).send('Profile successful!');
  } else {
    res.status(401).send('Invalid Profile');
  }
});

// Start the server on port 3000
const server = app.listen(4000, () => {
  console.log('Server started on port 4000');
});

module.exports = server;