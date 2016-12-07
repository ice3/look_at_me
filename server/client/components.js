const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;

var WidgetContainer = React.createClass({
  getInitialState: function(){
    return {cos: [], line: []};
  },

  socketInit: function(message){
    console.log("received sio init in widget container : ", message.message);
  },

  updateData: function(message){
    if (message.cos) {
      this.i += 1;
      console.log(message);
      var partial_data = this.state.cos ;
      var partial_data2 = this.state.line ;
      if (partial_data.length >= 50){
        partial_data.shift();
        partial_data2.shift() ;

      }
      partial_data.push(message.cos);
      partial_data2.push({"x": this.i, "cos": message.cos});
      console.log(partial_data2);
      this.setState( {cos: partial_data, line: partial_data2} );
    }
  },

  componentDidMount: function(){
    this.i = 0;
    socket.on('init', this.socketInit);
    socket.on('update', this.updateData);
  },

  render: function() {
    return (
      <div className="widgetContainer">

        <LineChartWidget data = { this.state.line }/>
      </div>
    );
  }
});


var TextWidget = React.createClass({
  render: function() {
    return (
      <div className="textWidget">
        I am a textwidget !!
        Data : {this.props.data[this.props.data.length - 1]}

      </div>
    )
  }
})


  data = [
      {
    label: 'somethingA',
          values: [
              {x: 0, y: 0},
              {x: 1.3, y: 5},
              {x: 3, y: 6},
              {x: 3.5, y: 6.5},
              {x: 4, y: 6},
              {x: 4.5, y: 6},
              {x: 5, y: 7},
              {x: 5.5, y: 8}
          ]
    },
    {
    label: 'somethingB',
          values: [
              {x: 0, y: 3},
              {x: 1.3, y: 4},
              {x: 3, y: 7},
              {x: 3.5, y: 8},
              {x: 4, y: 7},
              {x: 4.5, y: 7},
              {x: 5, y: 7.8},
              {x: 5.5, y: 9}
          ]
      }
  ];

var LineChartWidget = React.createClass({
  render: function() {
    return (
      <ScatterPlot
          data={data}
          width={400}
          height={400}
          margin={{top: 10, bottom: 50, left: 50, right: 10}}
          tooltipHtml={tooltipScatter}
          xAxis={{innerTickSize: 6, label: "x-label"}}
          yAxis={{label: "y-label"}}/>
    )
  }
})



ReactDOM.render(
  <WidgetContainer />,
  document.getElementById('container')
);