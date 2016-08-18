// importing Server class
const Server = require('./Server');

// Our configuration
const PORT = 46141;
const ADDRESS = "127.0.0.1"

var server = new Server(PORT, ADDRESS);

/* Starting our server
 * The callback parameter get's called after the
 * initializing fase is done
 */
server.start(function () {
	console.log("Server running, port: " + server.port)
});