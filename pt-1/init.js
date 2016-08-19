#!/usr/bin/env node
'use strict';

// load the Node.js TCP library
const net = require('net');

const PORT = 5000;
const ADDRESS = '127.0.0.1';

let server = net.createServer(onClientConnected);
server.listen(PORT, ADDRESS);

function onClientConnected(c) {
  console.log(`New client: ${c.remoteAddress}:${c.remotePort}`);
  c.destroy();
}

console.log(`Server started at: ${ADDRESS}:${PORT}`);