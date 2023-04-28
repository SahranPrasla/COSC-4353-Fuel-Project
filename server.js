const express = require('express');
const app = express();
const path = require('path')
var pg = require('pg');

var conString = "postgres://brqwgzyf:1xJT2dMuCrI8dArQGhquZz4RGJjPdR9H@raja.db.elephantsql.com/brqwgzyf";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route for handling sign up requests
app.route('/signup')
.get((req,res) => {
  res.sendFile(path.join(__dirname+'/public/SignUp.html'));
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
    const client = new pg.Client(conString)
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
    res.status(200).sendFile(path.join(__dirname+'/public/ProfileManagement.html'));
  }
});

app.route('/saveProfile')
.get((req,res) => {
  res.sendFile(path.join(__dirname+'/public/ProfileManagement.html'));
}).post(async(req, res) => {
  var { fullName, address1, address2, city, state, username, zipcode } = req.body;
  if (!fullName || !address1 || !city || !state || !zipcode || zipcode.length < 5) {
    res.status(401).send('Invalid Profile');
  } else {
    const client = new pg.Client(conString)
    client.connect(function(err) {
      if(err) {
        return console.error('could not connect to postgres', err);
      }
      
      client.query("INSERT INTO ClientInformation(username, fullName, addressOne, addressTwo, city, state, zipcode) VALUES('"+username+"', '"+fullName+"','"+address1+"','"+address2+"','"+city+"','"+state+"','"+zipcode+"');", function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        //console.log(result.rows);
          client.end();
      });
  });
    res.status(200).sendFile(path.join(__dirname+'/public/GallonQuoteForm.html'));
  }
});



// Start the server on port 1000
const server = app.listen(5500, () => {
  console.log('Server started on port 5500');
});

module.exports = server;