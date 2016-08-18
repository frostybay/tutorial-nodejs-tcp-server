const Client = function (socket) {
	this.address = socket.remoteAddress;
	this.port 	 = socket.remotePort;
	this.name 	 = this.address + ":" + this.port;
	this.socket  = socket;

	this.receiveMessage = (message) => {
		this.socket.write(message);
	};

	this.isLocalhost = () => {
		return this.address == "127.0.0.1" || this.address == "localhost";
	};	
};

module.exports = Client;