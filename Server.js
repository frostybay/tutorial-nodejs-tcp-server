// Load the TCP Library
const net = require('net');
// importing Client class
const Client = require('./Client');

const Server = function (port, address) {
	
	// Currently connected clients
	var clients = [];

	this.port = port || 5000;
	this.address = address || 'localhost';
	
	// Broadcast messages to the network
	this.broadcast = (message, clientSender) => {
		clients.forEach((client) => {
			// Sender doesn't receive it's own message
			if (clientSender != undefined && client === clientSender)
				return;
			client.receiveMessage(message);
		});
		console.log(message.replace(/\n+$/, ""));
	};

	this.start = function(callback) {

		/*
		 * Creating New Server
		 * The callback get's called when a new client joins the server
		*/ 
		var server = this;
		this.connection = net.createServer((socket) => {
			
			var client = new Client(socket);

			// Validation, if the client is valid
			if (!validateClient(client)) {
				client.socket.destroy();
				return;
			}
			// Broadcast the new connection
			server.broadcast(client.name + " connected.\n", client);
			// Storing client for later usage
			clients.push(client);

			// Triggered on message received by this client
			socket.on('data', (data) => { 
				// Broadcasting the message
				server.broadcast(client.name + " -> " + data, client);
			});
			
			// Triggered when this client disconnects
			socket.on('end', () => {
				// Removing the client from the list
				clients.splice(clients.indexOf(client), 1);
				// Broadcasting that this player left
				server.broadcast(client.name + " disconnected.\n");
			});

		});
		// starting the server
		this.connection.listen(this.port, this.address);
		
		// setuping the callback of the start function
		if (callback != undefined) {
			this.connection.on('listening', callback);	
		}

	};

	/*
	 * An example function: Validating the client
	 */
	function validateClient(client)	 {
		return client.isLocalhost();
	}
	
	return this;
};

module.exports = Server;