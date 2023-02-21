/*
	Commented section of code used for fetching data from the APIs
*/

/* const request = require('request');

exports.pushUpdates = function() {
	return new Promise(function (resolve, reject) {
		let btcArr = [];
		fetchAPI('https://api.cryptonator.com/api/ticker/btc-usd')
		.then(function (res1) {
			btcArr.push(JSON.parse(res1).ticker);
			return fetchAPI('https://api.cryptonator.com/api/ticker/btc-gbp')
		}).then(function (res2) {
			btcArr.push(JSON.parse(res2).ticker);
			return fetchAPI('https://api.cryptonator.com/api/ticker/btc-eur')
		}).then(function (res3) {
			btcArr.push(JSON.parse(res3).ticker);
			return fetchAPI('https://api.cryptonator.com/api/ticker/btc-jpy')
		}).then(function (res4) {
			btcArr.push(JSON.parse(res4).ticker);
			resolve(btcArr);
		});
	});
}

function fetchAPI(apiPath) {
	return new Promise(function (resolve, reject) {
		request(apiPath, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			} else {
				reject(error);
			}
		});
	});
} */



/*
	Below code uses random data to memic APIs
*/

exports.pushUpdates = function() {
	const tickerArr = [];
    tickerArr.push(generateRandomData('USD'));
    tickerArr.push(generateRandomData('GBP'));
    tickerArr.push(generateRandomData('EUR'));
    tickerArr.push(generateRandomData('JPY'));
    return tickerArr;
}

function generateRandomData(currency) {
    const tickerData = {};
    tickerData.target = currency;
    tickerData.price = Math.random() * 100000;
    tickerData.volume = Math.random() * 100000;
    tickerData.change = Math.random() * (-100);
    return tickerData;
}
