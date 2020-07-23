const UPLOAD_URL = "http://dummy.restapiexample.com/api/v1/create";
var express = require("express");
var app = express();

var request = require("request");

/* 
Read this: https://expressjs.com/en/api.html#req
without this we won't be able to read the request body 
passed in */
app.use(express.json()); // to parse application/json

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
    next();
});

app.post('/create', function(req, res) {
    let options = {
        url: UPLOAD_URL,
        form: req.body
    };
    console.log(`About to pipe the request`);
    request.post(options, function(error, response, body){
        console.log(`About to try and parse JSON`);
        try {
            let parsedResponse = JSON.parse(body);
            res.send(parsedResponse);
        } catch (error) {
            console.log(`Got an error -> ${error.status}`);
            res.send({"message":"error parsing json", "errorObj": error});
            //res.send(error);
        }
    });
}); 
const port = 3000;
app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});
