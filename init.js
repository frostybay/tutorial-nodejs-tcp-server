#!/usr/bin/env node
'use strict';

// importing Server class
const Server = require('./Server');

// Our configuration
const PORT = 5000;
const ADDRESS = "127.0.0.1"

var server = new Server(PORT, ADDRESS);

// Starting our server
server.start(() => {
  console.log(`Server started at: ${ADDRESS}:${PORT}`);
});