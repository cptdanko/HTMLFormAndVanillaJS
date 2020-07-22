const UPLOAD_URL = "https://dummy.restapiexample.com/api/v1/create";


var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app);

var request = require('request');

// Use Express middleware to add the more generous CORS header
// (but we still need to remove the original header, below)
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

console.log('Listening on 0.0.0.0:9999' );
app.listen(9999, '0.0.0.0');

// when express receives a request for ANY url...
app.get('/create', function(req,res) {

  // set up a new request to Auspost
  var config = {
    // get the suburb and state from the URL querystring, to forward on to Auspost
    uri: UPLOAD_URL,
    method: 'POST',
    body: {'name': 'Bhuman'}
  };

  // Make the API request, and forward response back to original,
  // removing the CORS header along the way
  var newRequest = request(config);

  req.pipe(newRequest)
  .on('response', function(response){
    delete response.headers['access-control-allow-origin'];
  })
  .pipe(res);
});
