var dict = require("./data_dictionary");

var web = require("./web.js");
web.init(dict);
var server = web.server;
var app = web.app;

var socket = require('./socket.js');
socket.init(server);

var zmq = require('./zmq.js').init(dict);

var send_data_if_any = function(){
  var datas = {};
  var names = dict.getNames();
  if(dict.newDataAvaillable == false){
    return;
  }

  for (var i = 0; i <  names.length; i++) {
    var name = names[i];
    data = dict.getData(name, 1);
    datas[name] = data;
    }
  socket.emit("update", datas);
  dict.newDataAvaillable = false;
}

console.log(socket.emit)
setInterval(send_data_if_any, 200)