var socket = io();

var widgets = {};

socket.on('init', function(message){
  console.log("received after init : ", message.message)
//   socket.emit('init', {id: 123});
});

update_wigets_data = function(message){
  for(key in message){
    var widget = widgets[key];
    if (widget != undefined){
      widget.update_data(message[key][0][0]);
    }
  }
}

socket.on("update", update_wigets_data)


// get all the data available from the server
var selectData = document.getElementById ("ressources");
var dataAvailable = [];
var updateDataAvailable = function () {
  $.get( "/services/ressources", function( data ) {
    dataAvailable = data;
    selectData.innerHTML = "";
    for (var idx=0 ; idx<dataAvailable.length ; idx++) {
      var opt = document.createElement("option");
      opt.value = dataAvailable[idx];
      opt.innerHTML = dataAvailable[idx];
      selectData.appendChild (opt);
    }
  });
}
updateDataAvailable();
