var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var nodeStatic = require('node-static'); // for serving files

// This will make all the files in the current folder
// accessible from the web
var fileServer = new nodeStatic.Server('./');
	
// This is the port for our web server.
// you will need to go to http://localhost:8080 to see it
app.listen(8080);

// If the URL of the socket server is opened in a browser
function handler(request, response) {
	request.addListener('end', function () {
		fileServer.serve(request, response);
	}).resume();
}

io.set('origins', '*:*');

// Listen for incoming connections from clients
io.sockets.on('connection', function (socket) {
	socket.on('keypress', function (data) {
		socket.broadcast.emit('texting', data);
	});
});