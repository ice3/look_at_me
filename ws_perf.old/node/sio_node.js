var buffer = [];
var port = process.env.PORT || 8080;

var express = require('express');
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io').listen(server);


server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendfile(__dirname + "/site" + '/index.html');
});

var zmq = require('zmq'),
    sock_zmq_receive = zmq.socket('sub'),
    sock_zmq_send = zmq.socket("pub");

sock_zmq_receive.connect('tcp://127.0.0.1:5556');
sock_zmq_receive.subscribe('');
console.log('Subscriber connected to port 5556');

sock_zmq_send.bind("tcp://127.0.0.1:9999")
console.log('Publisher binded to port 9999');

var controlCallback = function(data){
  data = JSON.stringify(data);
  console.log(data);
  sock_zmq_send.send(data);
}

var onConnect = function(socket){
  socket.send('connect', 'hi');
  socket.on('control', controlCallback
  );

}

var nsp = io.of('/test');
nsp.on('connection', function(socket) {
  onConnect(socket);
});

var flushDataToWS = function(){
  console.log("sending");
  nsp.emit('graph', { 'datas': buffer});
  console.log(buffer);
  buffer = [];
}
setInterval(flushDataToWS, 50);

sock_zmq_receive.on('message', function(topic, message) {
  // console.log('received a message related to:', topic.toString("utf8"), 'containing message:', message);
  message = JSON.parse(message.toString('utf8'));
  buffer.push(message);
  // console.log(new Date() - new Date(message.t))
});