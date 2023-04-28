const express = require('express');
const app = express();
const path = require('path')
const client = require('./database.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route for handling login requests
app.route('/login')
.get((req,res) => {
  res.status(200).sendFile(path.join(__dirname+'/public/loginPage.html'));
})

.post(async(req, res) => {
  const {username, password } = req.body;
  console.log(username, password)
  if (username === "invalidusername" ) {
    res.status(401).sendFile(path.join(__dirname+'/public/loginPage.html'));
  }
  client.connect(function(err) {
    client.query("SELECT * FROM UserCredentials WHERE username ='"+username+"' AND password = crypt('"+password+"', password);", function(err, result) {
      if (result.rowCount == 1) {
        res.status(200).sendFile(path.join(__dirname+'/public/GallonQuoteForm.html'));
      }
      else {
        res.status(401).sendFile(path.join(__dirname+'/public/loginPage.html'));
      }
      client.end();
    });
  });
});

// Start the server on port 3000
const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = server;