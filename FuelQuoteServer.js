const express = require('express');
//const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

// Create a POST route
app.post('/fuelquote', (req, res) => {
    const { recievedGallons, address, price, profit,} = req.body;
    if (recievedGallons == 1000 && address == '123 Address Ln' 
    && price == 10000 && profit == 20000) {
      res.status(200).send('Recived Information');
    } else {
      res.status(401).send('Incorrect Request!');
    }
});

// Connect (Listen) to the server
const server = app.listen(6000, () => {
    console.log('Server started on port 6000');
});

module.exports = server;
