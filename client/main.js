console.log("yop");

var socket = io();

socket.on('init', function(message){
  console.log("received after init : ", message.message)
  socket.emit('init', {id: 123});
});

var received_data = []

socket.on("data", function(message){
  // console.log(message.data[0]);
  received_data.push(message.data);
  tick(message.data);
  if (received_data.length > 50)
    received_data.shift();
})
