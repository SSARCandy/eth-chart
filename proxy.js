var express = require('express')
const request = require('request');
const api = 'https://www.maicoin.com/api/prices';
const coinbase = 'https://api.coinbase.com/v2/prices/';

var cors = require('cors')
var app = express()

app.use(cors())

app.get('/eth-realtime', function (req, res) {
    request(`${api}/eth-twd`, function (error, response, body) {
        if (error) {
            return;
        }
        res.send(body);

    });
})

app.get('/btc-realtime', function (req, res) {
    request(`${api}/btc-twd`, function (error, response, body) {
        if (error) {
            return;
        }
        res.send(body);

    });
})

app.get('/maicoin/:type', function (req, res) {
    request(`${api}/${req.params.type.toLowerCase()}`, function (error, response, body) {
        if (error) {
            return;
        }
        res.send(body);

    });
})

app.get('/coinbase/:type', function(req, res) {
    request(`${coinbase}/${req.params.type.toUpperCase()}-USD/spot`, function (error, response, body) {
        if (error) {
            return;
        }
        res.send(body);
    });
})

app.use(express.static('static'));

app.listen(3333)
