/////////////////////////////////////////////
// websockets
/////////////////////////////////////////////

var io = require('socket.io');

var init = function (server) {
	io = io.listen(server)
	io.sockets.on('connection', function (socket) {
	  socket.emit('init', {message: 'new connection'});

	  socket.on("init", function(message){
	    console.log("received init, id:", message.id)
	  })

	});
};

var emit = function(topic, data, client){
  if(io.sockets != undefined)
    io.sockets.emit(topic, data);
}

module.exports = {"init": init, "emit": emit};
