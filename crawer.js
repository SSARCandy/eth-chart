const request = require('request');
const fs = require('fs');
const api = 'https://www.maicoin.com/api/prices/eth-twd';
const history = require('./static/history.json');

request(api, function (error, response, body) {
    if (error) {
        return;
    }

    const { raw_sell_price, raw_buy_price } = JSON.parse(body);

    history.push({
        buy: raw_buy_price,
        sell: raw_sell_price,
        time: new Date()
    });

    fs.writeFileSync(`${__dirname}/static/history.json`, JSON.stringify(history));
});
