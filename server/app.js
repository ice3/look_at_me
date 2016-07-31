var dict = require("./data_dictionary");

var web = require("./web.js");
web.init(dict);
var server = web.server;
var app = web.app;

var socket = require('./socket.js');
socket.init(server);

var zmq = require('./zmq.js').init(dict);

var send_data_if_any = function(){
  if(dict.newDataAvaillable == false){
    return;
  }
  socket.emit("update", dict.getNewData());
}

console.log(socket.emit);
setInterval(send_data_if_any, 20);