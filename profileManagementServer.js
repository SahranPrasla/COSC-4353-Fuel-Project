const express = require('express');
const app = express();
const path = require('path')
const client = require('./database.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route for handling login requests
app.route('/saveProfile')
.get((req,res) => {
  res.status(200).sendFile(path.join(__dirname+'/public/ProfileManagement.html'));

}).post(async(req, res) => {
  var { fullName, address1, address2, city, state, zipcode } = req.body;
  if (!fullName || !address1 || !city || !state || !zipcode || zipcode.length < 5) {
    res.status(401).send('Invalid Profile');
  } else {
    client.connect(function(err) {
      client.query("INSERT INTO ClientInformation(username, fullName, addressOne, addressTwo, city, state, zipcode) VALUES('"+username+"', '"+fullName+"','"+address1+"','"+address2+"','"+city+"','"+state+"','"+zipcode+"');", function(err, result) {
      res.status(200).sendFile(path.join(__dirname+'/public/GallonQuoteForm.html'));
      client.end();
      });
  });
  }
});

// Start the server on port 3000
const server = app.listen(4000, () => {
  console.log('Server started on port 4000');
});

module.exports = server;