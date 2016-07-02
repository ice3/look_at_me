var socket, smoothie, line1, chart_hc;

var init_ws = function(){
  namespace = '/test';
  socket = io.connect('http://' + document.domain + ':' + location.port + namespace);
  socket.on('connect', function() {
    socket.emit('my event', {data: 'I\'m connected!'});
  });
}

// ws reverse
$(function(){
  var slider = document.getElementById('slider')
  document.getElementById('dispVal').innerHTML=slider.value;
  slider.onchange =function(change) {
    socket.emit('control', {data: slider.value});
    console.log('control');
    document.getElementById('dispVal').innerHTML=slider.value;
  }
})

var init_plot_smoothie = function(){
  smoothie = new SmoothieChart();
  smoothie.streamTo(document.getElementById("mycanvas"));
  line1 = new TimeSeries();
  smoothie.addTimeSeries(line1);
}

var update_smoothie = function(line, data){
  line.append(new Date(data.t).getTime(), data.y);
}



$(function(){
    init_ws();
    init_plot_smoothie();
    //init_plot_highcharts();
  }
);

$(function () {
  socket.on("graph", function(msg){
    for(var i =0; i < msg.datas.length; i++){
        update_smoothie(line1, msg.datas[i]);
        //update_highchart(chart_hc.series[0], msg.datas[i]);
    }
  });
});


