'use strict';
const net = require('net');
const Client = require('./Client'); // importing Client class

class Server {
  constructor (port, address) {
    this.port = port || 5000;
    this.address = address || '127.0.0.1';
    // Holds our currently connected clients
    this.clients = [];
  }
  /*
   * Starting the server
   * The callback argument is executed when the server finally inits
  */ 
  start (callback) {
    let server = this; // we'll use 'this' inside the callback below
    server.connection = net.createServer((socket) => { // old onClientConnected
      let client = new Client(socket);
      console.log(`${client.name} connected.`);

      // TODO: Broadcast to everyone connected the new connection

      // Storing client for later usage
      server.clients.push(client);
      
      // Triggered on message received by this client
      socket.on('data', (data) => { 
        let m = data.toString().replace(/[\n\r]*$/, '');
        console.log(`${clientName} said: ${m}`);
        socket.write(`We got your message (${m}). Thanks!\n`);
        // TODO: Broadcasting the message to the other clients
      });
      
      // Triggered when this client disconnects
      socket.on('end', () => {
        // Removing the client from the list
        server.clients.splice(server.clients.indexOf(client), 1);
        console.log(`${client.name} disconnected.`);
        // TODO: Broadcasting that this client left
      });
    });
    // starting the server
    this.connection.listen(this.port, this.address);
    // setuping the callback of the start function
    this.connection.on('listening', callback);
  }

  // TODO
  broadcast(message, client) {}
}
module.exports = Server;