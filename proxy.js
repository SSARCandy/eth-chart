const request = require('request');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.get('/:type', function (req, res) {
  const param = req.params.type.toLowerCase().split('-')[0]+ '-twd';
  fs.readFile(`${__dirname}/data.json`, function (error, data) {
        if (error) {
            res.send('error');
        }
        const json = JSON.parse(data);
        res.send(json[param]);
    });
});

app.get('/maicoin/:type', function (req, res) {
  fs.readFile(`${__dirname}/data.json`, function (error, data) {
        if (error) {
            res.send('error');
        }
        const json = JSON.parse(data);
        res.send(json[req.params.type.toLowerCase()]);
    });
});

app.post('/maicoin/', function (req, res) {
    fs.writeFileSync(`${__dirname}/data.json`, JSON.stringify(req.body));
    res.send('Hello post endpoint for tweets!');
});

app.use(express.static('static'));

app.listen(3333)
