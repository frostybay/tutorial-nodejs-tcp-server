#!/usr/bin/env node
'use strict';

// load the Node.js TCP library
const net = require('net');

const PORT = 5000;
const ADDRESS = '127.0.0.1';

let server = net.createServer(onClientConnected);
server.listen(PORT, ADDRESS);

function onClientConnected(c) {

  // Giving a name to this client
  let clientName = `${c.remoteAddress}:${c.remotePort}`;

  // Logging the message on the server
  console.log(`${clientName} connected.`);

  // Triggered on data received by this client
  c.on('data', (data) => { 

    // getting the string message and also trimming
    // new line characters [\r or \n]
    let m = data.toString().replace(/[\n\r]*$/, '');

    // Logging the message on the server
    console.log(`${clientName} said: ${m}`);

    // notifing the client
    c.write(`We got your message (${m}). Thanks!\n`);
  });
  
  // Triggered when this client disconnects
  c.on('end', () => {
    // Logging this message on the server
    console.log(`${clientName} disconnected.`);
  });
}

console.log(`Server started at: ${ADDRESS}:${PORT}`);