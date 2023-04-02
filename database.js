var pg = require('pg');

var conString = "postgres://brqwgzyf:1xJT2dMuCrI8dArQGhquZz4RGJjPdR9H@raja.db.elephantsql.com/brqwgzyf"
var client = new pg.Client(conString);

client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT * from UserCredentials;', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0]);
        client.end();
    });
    
  });