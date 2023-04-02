const express = require('express');
const app = express();
const client = require('./database.js');

app.use(express.json());

// Route for handling sign up requests
app.post('/signup', (req, res) => {
  var { username, password} = req.body;
  // Do validation on the input data
  if (!username || !password ) {
    console.log('success31');
    res.status(400).send('All fields are required');
  } else if (password.length < 6) {
    console.log('success2');
    res.status(400).send('Password must be at least 6 characters long');
  } else {
    console.log('success3');
    
    client.connect(function(err) {
      if(err) {
        return console.error('could not connect to postgres', err);
      }
      client.query("INSERT INTO UserCredentials(username, password) VALUES('"+username+"', crypt('"+password+"', gen_salt('md5')));", function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        //console.log(result.rows);
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