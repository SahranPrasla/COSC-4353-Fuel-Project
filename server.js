const express = require('express');
const app = express();
const path = require('path')
var pg = require('pg');
var conString = "postgres://brqwgzyf:1xJT2dMuCrI8dArQGhquZz4RGJjPdR9H@raja.db.elephantsql.com/brqwgzyf";

const Price = require('./PriceModule.js');

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
    res.status(400).send('All fields are required');
  } else if (password.length < 6) {
    res.status(400).send('Password must be at least 6 characters long');
  } else {
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

app.get('/getquote', (req, res) => {
  const gallonsRequested = req.query['gallons-requested']
  const deliveryDate = req.query['delivery-date']
  const username = req.query['username']
  var state;
  var addy;
  var orderCount;
  var suggestedPPG;
  var totalPrice; 

  const client = new pg.Client(conString)
  
  client.connect()
  const promise1 = client.query("SELECT * FROM ClientInformation WHERE username = 'OilTycoon12'")
  const promise2 = client.query("SELECT * FROM FuelQuotes WHERE username = 'username'")
  console.log('promise1');

  Promise.all([promise1, promise2])
  .then(results => {
    const addy = results[0].rows[0].addressone;
    const state = results[0].rows[0].state;
    const orderCount = results[1].rowCount;
    const PriceModule = new Price(state, orderCount, gallonsRequested);
    const suggestedPPG = PriceModule.getSuggestedPPG();
    const totalPrice = PriceModule.getTotal();
    const responseText = {
      suggested : suggestedPPG,
      address : addy,
      total : totalPrice
    }
    //res.send(JSON.stringify(responseText));
    res.json(responseText);
    //res.redirect(path.join(__dirname+'/public/GallonQuoteForm.html')); 
  })
  .catch(error => {
    console.error('Error running queries', error);
    res.status(500).send('Error running queries');
  })
  .finally(() => {
    client.end();
  });

});

app.get('/gethistory', (req, res) => {
  var gallonsRequested;
  var orderNumber;
  var suggestedPPG;
  var totalPrice; 

  const client = new pg.Client(conString)
  
  client.connect()
  client.query("SELECT ordernumber, gallons, price, suggestedppg FROM FuelQuotes WHERE username = 'username' ORDER BY orderNumber ASC") // FIX username
  .then(results => {
    const responseText = {
      rows : results.rows,
      rowCount : results.rowCount
    }
    res.json(responseText);
  })
});

app.route('/login')
.get((req,res) => {
  res.status(200).sendFile(path.join(__dirname+'/public/loginPage.html'));
})

.post(async(req, res) => {
  const {username, password } = req.body;
  if (username === "invalidusername" ) {
    res.status(401).sendFile(path.join(__dirname+'/public/loginPage.html'));
  }
  const client = new pg.Client(conString)
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

// Start the server on port 1000
const server = app.listen(5500, () => {
  console.log('Server started on port 5500');
});


module.exports = server;