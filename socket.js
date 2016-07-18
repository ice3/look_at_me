/////////////////////////////////////////////
// websockets
/////////////////////////////////////////////

var io = require('socket.io');
var refreshRate = 20;

var init = function (server) {
	io = io.listen(server)
	io.sockets.on('connection', function (socket) {
	  socket.emit('init', {message: 'new connection'});

	  socket.on("init", function(message){
	    console.log("received init, id:", message.id)
	  })
	});
};

module.exports = {"init": init};
