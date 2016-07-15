
var port = process.env.PORT || 8080;

var express = require('express');
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io').listen(server);


/////////////////////////////////////////////
// express
/////////////////////////////////////////////

app.use(express.static(__dirname+"/client"));

app.get("/", function(req, res){
  res.sendFile('index.html', { root: __dirname+"/client"});
});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});



/////////////////////////////////////////////
// websockets
/////////////////////////////////////////////

function random (low, high) {
    return Math.random() * (high - low) + low;
}

var i = 0;
var refreshRate = 20;
setInterval(function(){
  io.emit("data", {
    data:[Math.cos(i/20), Math.sin(i/20), Math.abs(Math.cos(i/20))*10]
  }); i+=1
}, 1000.0/refreshRate);

io.sockets.on('connection', function (socket) {
  socket.emit('init', {message: 'new connection'});

  socket.on("init", function(message){
    console.log("received init, id:", message.id)
  })
});
