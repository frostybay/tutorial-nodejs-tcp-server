'use strict';

// Load the TCP Library
const net = require('net');
// importing Client class
const Client = require('./Client');

class Server {

	constructor (port, address) {
	
		this.port = port || 5000;
		this.address = address || '127.0.0.1';

		// Array to hold our currently connected clients
		this.clients = [];
	}
	
	/*
	 * Broadcasts messages to the network
	 * The clientSender doesn't receive it's own message
	*/
	broadcast (message, clientSender) {
		this.clients.forEach((client) => {
			if (client === clientSender)
				return;
			client.receiveMessage(message);
		});
		console.log(message.replace(/\n+$/, ""));
	}

	/*
	 * Starting the server
	 * The callback is executed when the server finally inits
	*/ 
	start (callback) {
	
		var server = this;
		
		this.connection = net.createServer((socket) => {
			
			var client = new Client(socket);

			// Validation, if the client is valid
			if (!server._validateClient(client)) {
				client.socket.destroy();
				return;
			}
			// Broadcast the new connection
			server.broadcast(`${client.name} connected.\n`, client);
			
			// Storing client for later usage
			server.clients.push(client);

			// Triggered on message received by this client
			socket.on('data', (data) => { 
				// Broadcasting the message
				server.broadcast(`${client.name} says: ${data}`, client);
			});
			
			// Triggered when this client disconnects
			socket.on('end', () => {
				// Removing the client from the list
				server.clients.splice(server.clients.indexOf(client), 1);
				// Broadcasting that this player left
				server.broadcast(`${client.name} disconnected.\n`);
			});

		});
		
		// starting the server
		this.connection.listen(this.port, this.address);
		
		// setuping the callback of the start function
		if (callback != undefined) {
			this.connection.on('listening', callback);	
		}

	}

	/*
	 * An example function: Validating the client
	 */
	_validateClient (client){
		return client.isLocalHost();
	}
}

module.exports = Server;
