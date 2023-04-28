const express = require('express');
const app = express();
const path = require('path')
const client = require('./database.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route for handling sign up requests
app.route('/signup')
.get((req,res) => {
  res.status(200).sendFile(path.join(__dirname+'/public/SignUp.html'));
})

.post((req, res) => {
  var { username, password} = req.body;
  // Do validation on the input data
  if (!username || !password ) {
    console.log('success31'); //REMOVE
    res.status(400).send('All fields are required');
  } else if (password.length < 6) {
    console.log('success2'); //REMOVE
    res.status(400).send('Password must be at least 6 characters long');
  } else {
    console.log('success3'); //REMOVE
    
    client.connect(function(err) {
      client.query("INSERT INTO UserCredentials(username, password) VALUES('"+username+"', crypt('"+password+"', gen_salt('md5')));", function(err, result) {
        //console.log(result.rows);
        client.end();
      });
      
    });
    res.status(200).sendFile(path.join(__dirname+'/public/ProfileManagement.html'));
  }
});

// Start the server on port 1000
const server = app.listen(5500, () => {
  console.log('Server started on port 5500');
});

module.exports = server;