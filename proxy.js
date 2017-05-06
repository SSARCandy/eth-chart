var express = require('express')
const request = require('request');
const api = 'https://www.maicoin.com/api/prices/eth-twd';
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/eth-realtime', function (req, res) {
    request(api, function (error, response, body) {
        if (error) {
            return;
        }
        res.send(body);

    });
})

app.use(express.static('static'));

app.listen(3333)
