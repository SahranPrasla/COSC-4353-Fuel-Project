const express = require('express');

const app = express();

app.use(express.json());

app.get('/FuelQuoteHistory.html', (req, res) => {
  res.sendFile(__dirname + '/GallonQuoteForm.html');
});


app.post('/FuelQuoteHistory.html', (req, res) => {
  var { requestedGallons} = req.body;
  if (requestedGallons > 0) {
    res.status(200).send('Requested Gallons: ' + requestedGallons);
  } else{
    res.status(401).send('Invalid Request!');
  }
});

const server = app.listen(2500, () => {
  console.log('Server started on port 2500');
});

module.exports = server;