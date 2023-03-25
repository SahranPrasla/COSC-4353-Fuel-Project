const express = require('express');

const app = express();

app.use(express.json());


app.post('/FuelQuoteHistory.html', (req, res) => {
  var { requestedGallons, deliveryDate} = req.body;
  if (!requestedGallons || !deliveryDate) {
    res.status(401).send('Please enter a value for requested gallons and delivery date!');
  } else if (requestedGallons <= 0 || deliveryDate < new Date().toISOString().split('T')[0]){
    res.status(401).send('One or more entries is invalid!');
  } else{
    res.status(200).send('Request Recieved!');
  }
});

const server = app.listen(2500, () => {
  console.log('Server started on port 2500');
});

module.exports = server;