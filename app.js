var dict = require("./data_dictionary");

var web = require("./web.js");
web.init(dict);
var server = web.server;
var app = web.app;

var socket = require('./socket.js');
socket.init(server);

var zmq = require('./zmq.js').init(dict);


