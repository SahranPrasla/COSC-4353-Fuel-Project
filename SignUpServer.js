const express = require('express');
const app = express();
const client = require('./database.js');

app.use(express.json());

// Route for handling sign up requests
app.post('/SignUpServer.js', (req, res) => {
  var { username, password} = req.body;
  // Do validation on the input data
  console.log(username);
  if (!username || !password ) {
    res.status(400).send('All fields are required');
  } else if (password.length < 6) {
    res.status(400).send('Password must be at least 6 characters long');
  } else {
    client.connect(function(err) {
      if(err) {
        return console.error('could not connect to postgres', err);
      }
      client.query('INSERT INTO UserCredentials(username, password) VALUES(?,?);'[username, password], function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        console.log(result.rows);
          client.end();
      });
      
    });
    res.status(200).send('Sign up successful!');
  }
});

// Start the server on port 1000
const server = app.listen(1000, () => {
  console.log('Server started on port 1000');
});

module.exports = server;