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

	setInterval( async () => {
		socket.emit('subscribed-btc-prices', await fetchbtc.pushUpdates().catch(err => { console.log(err) }));
	}, 5000);
})

server.listen(PORT, () => console.log(`BTCTicker server running on port ${PORT}`));
