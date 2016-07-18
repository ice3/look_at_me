//////////////////////////////////////////////
// ZMQ
//////////////////////////////////////////////
var zmq = require('zmq'),
    sock_zmq_receive = zmq.socket('sub'),
    sock_zmq_send = zmq.socket("pub");

sock_zmq_receive.connect('tcp://127.0.0.1:5556');
sock_zmq_receive.subscribe('');
console.log('Subscriber connected to port 5556');

var init = function (dict) {
	sock_zmq_receive.on('message', function(domain, message) {
	  message = JSON.parse(message.toString('utf8'));
	  dict.addData(message.name, message.data);
	  console.log(message.name, message.data);
	});
};

module.exports = {"init": init};
