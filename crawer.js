const request = require('request');
const fs = require('fs');
const api = 'https://www.maicoin.com/api/prices';
const eth_history = require('./static/history.json');
const btc_history = require('./static/btc_history.json');

request(`${api}/eth-twd`, function (error, response, body) {
    if (error) {
        return;
    }

    const { raw_sell_price, raw_buy_price } = JSON.parse(body);

    eth_history.push({
        buy: raw_buy_price,
        sell: raw_sell_price,
        time: new Date()
    });

    fs.writeFileSync(`${__dirname}/static/history.json`, JSON.stringify(eth_history));
});

request(`${api}/btc-twd`, function (error, response, body) {
    if (error) {
        return;
    }

    const { raw_sell_price, raw_buy_price } = JSON.parse(body);

    btc_history.push({
        buy: raw_buy_price,
        sell: raw_sell_price,
        time: new Date()
    });

    fs.writeFileSync(`${__dirname}/static/btc_history.json`, JSON.stringify(btc_history));
});
