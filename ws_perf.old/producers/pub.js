var zmq = require('zmq')
  , sock = zmq.socket('pub');

var i = 0,
    fps = 100;

sock.bindSync('tcp://127.0.0.1:5556');
console.log('Publisher bound to port 5556');

setInterval(function(){
  console.log('sending a multipart message envelope');
  var mess = {"t": new Date(), "y": Math.cos(i/100.0)};
  var stringObject=JSON.stringify(mess);
  i += 1;
  sock.send(['data', stringObject]);
}, 1000.0/fps);