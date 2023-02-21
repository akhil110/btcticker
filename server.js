const http = require('http');
const path = require('path');
const os = require('os');
const express = require('express');
const socketio = require('socket.io');
const fetchbtc = require('./fetchbtc')

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 1978;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
	console.log('Client connected');

	try {
		/* 
		Use the commented block for real API call
		setInterval( async () => {
			socket.emit('subscribed-btc-prices', await fetchbtc.pushUpdates().catch(err => { console.log(err) }));
		}, 5000); */

		/* Below block used with random data */
		setInterval(() => {
			socket.emit('subscribed-btc-prices',fetchbtc.pushUpdates());
		}, 5000);
	} catch (e) {
		console.log(e);
	}

	
})

server.listen(PORT, () => console.log(`BTCTicker server running on port ${PORT}`));
