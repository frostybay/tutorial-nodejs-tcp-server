'use strict';

class Client {
	
	constructor (socket) {
		this.address = socket.remoteAddress;
		this.port 	 = socket.remotePort;
		this.name    = `${this.address}:${this.port}`;
		this.socket  = socket;
	}

	receiveMessage (message) {
		this.socket.write(message);
	}

	isLocalhost () {
		return this.address == "127.0.0.1" || this.address == "localhost";
	}
}

module.exports = Client;