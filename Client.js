const Client = function (c) {
	this.address = c.remoteAddress;
	this.port 	 = c.remotePort;
	this.name 	 = this.address + ":" + this.port;
	this.socket  = c;

	this.receiveMessage = (message) => {
		this.socket.write(message);
	};

	this.isLocalhost = () => {
		return this.address == "127.0.0.1" || this.address == "localhost";
	};	
};

module.exports = Client;