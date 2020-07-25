var express = require("express");
var cors = require("cors");
var axios = require("axios");

var app = express();
app.use(cors());

const UPLOAD_URL = "http://dummy.restapiexample.com/api/v1/create";

/*
Axios response object, properties
data, status, statusText, headers, request
http://zetcode.com/javascript/axios/
*/
app.post("/create", function(req, res) {
    axios.post(UPLOAD_URL, req.body).then(response => {
        if(response.status === 200) {
            res.send(response.data);
        } 
    }).catch(err => {
        console.log("Error making the request");
        res.send(err);
    })
});

const port = 2100;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});