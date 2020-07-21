const UPLOAD_URL = "https://dummy.restapiexample.com/api/v1/create";
var express = require("express");
var app = express();

var request = require("request");
/*taken from here
https://github.com/ccoenraets/cors-proxy/blob/master/server.js
and here
https://github.com/jonathansee2013/Postcode-Validator
*/
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.listen(9999, '0.0.0.0');
console.log("Listening on 0.0.0.0: 9999");

app.post('/create', function(req, res) {
    var config = {
        url: UPLOAD_URL,
        method: 'POST',
        data: req.body
    };
    console.log(`About to pipe the request`);
    let newRequest = request(config);
    req.pipe(newRequest)
    .on('response', function(response) {
        delete response.headers['access-control-allow-origin']
    }).pipe(res);
});