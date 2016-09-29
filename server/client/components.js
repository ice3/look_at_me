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


var LineChartWidget = React.createClass({
  render: function() {
    return (
      <LineChart width={600} height={300} data={this.props.data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="x"/>
        <YAxis/>
      </LineChart>
    );
  }
})


ReactDOM.render(
  <WidgetContainer />,
  document.getElementById('container')
);