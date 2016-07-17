var dict = require("./data_dictionary");

var web = require("./web.js");
var server = web.server;
var app = web.app;

var io = require('socket.io').listen(server);

//////////////////////////////////////////////
// ZMQ
//////////////////////////////////////////////
buffer = [];

var zmq = require('zmq'),
    sock_zmq_receive = zmq.socket('sub'),
    sock_zmq_send = zmq.socket("pub");

sock_zmq_receive.connect('tcp://127.0.0.1:5556');
sock_zmq_receive.subscribe('');
console.log('Subscriber connected to port 5556');

sock_zmq_receive.on('message', function(domain, message) {
  message = JSON.parse(message.toString('utf8'));
  buffer.push(message.y);

  if (buffer.length > 200){
    buffer.pop()
  }
  console.log(buffer[buffer.length-1])
});

/////////////////////////////////////////////
// websockets
/////////////////////////////////////////////

var io = require('socket.io').listen(server);
var refreshRate = 20;

setInterval(function(){
  io.emit("data", buffer)
}, 1000.0/refreshRate);

io.sockets.on('connection', function (socket) {
  socket.emit('init', {message: 'new connection'});

  socket.on("init", function(message){
    console.log("received init, id:", message.id)
  })
});

