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
  res.sendFile(path.join(__dirname+'/public/loginPage.html'));
})
.post(async(req, res) => {
  const { username, password } = req.body;
  
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query("SELECT * FROM UserCredentials WHERE username ='"+username+"';", function(err, result) {
      if(result.rowCount == 0) {
        res.sendFile(path.join(__dirname+'/public/loginPage.html'));
       console.log("Invalid username or password");
      }
      else if (username == result.rows[0].username && password == result.rows[0].password) {
        res.status(200).sendFile(path.join(__dirname+'/public/GallonQuoteForm.html'));
      }
      else if(err) {
        return console.error('error running query', err);
      }
      else {
        res.status(401).sendFile(path.join(__dirname+'/public/loginPage.html'));
      }
      client.end();
    });
  });



  // if (username == usr1 && password == pwd1) {
  //   res.status(200).sendFile(path.join(__dirname+'/public/GallonQuoteForm.html'));
  // } 
});

// Start the server on port 3000
const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = server;