const express = require('express');
const path = require('path');
const client = require('./database.js');
const app = express();

// Use middleware to parse incoming request bodies
app.use(express.json());

// Route for handling login requests
app.post('/saveProfile', (req, res) => {
  const { fullName, address1, address2, city, state, zipcode } = req.body;
  if (!fullName || !address1 || !city || !state || !zipcode || zipcode.length() < 5) {
    res.status(401).send('Invalid Profile');
  } else {
    client.connect(function(err) {
      if(err) {
        return console.error('could not connect to postgres', err);
      }   
      client.query("INSERT INTO ClientInformation(username, fullName, addressOne, addressTwo, city, state, zipcode) VALUES(kb123, '"+fullName+"','"+address1+"','"+address2+"','"+city+"','"+state+"',,'"+zipcode+"');", function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        //console.log(result.rows);
          client.end();
      });
  });
    res.status(200).send('Valid Profile');
  }
});

// Start the server on port 3000
const server = app.listen(4000, () => {
  console.log('Server started on port 4000');
});

module.exports = server;