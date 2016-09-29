// http://bl.ocks.org/simenbrekken/6634070
// https://gist.github.com/mbostock/1642874

function LineChartWidget(data_binding, div_id){
  Widget.call(this, div_id);

  this.groups = {
      target: {
          value: 0,
          color: 'green',
          data: [0]
      },
  }

  this.iter = 0;


  $("<div>").attr('id', this.widget_id).appendTo('#'+div_id);
  this.svg = d3.select("#"+this.widget_id).append("svg").attr("width", 400).attr("height", 250);
  this.init_ui();
}


LineChartWidget.prototype = Object.create(Widget.prototype);
LineChartWidget.prototype.constructor = LineChartWidget;

LineChartWidget.prototype.update_ui = function() {

};

LineChartWidget.prototype.init_container = function(){
  this.margin = {top: 20, right: 20, bottom: 20, left: 40};

  this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
  this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
  this.group = this.svg.append("g")
    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
}

LineChartWidget.prototype.init_scale = function(){
  this.scale_x = d3.scaleLinear()
      .domain([0, this.nb_points_displayed - 1])
      .range([0, this.width]);
  this.scale_y = d3.scaleLinear()
      .domain([-10, 10])
      .range([this.height, 0]);
}

LineChartWidget.prototype.init_ui = function(){
  var that = this;

  console.log("data line", that.data);

  that.init_container();
  that.init_scale();

  that.line = d3.line()
    .x(function(d, i) {
      console.log("plotting x of", d, i,  "at", that.scale_x(i));
      return that.scale_x(i);
    })
    .y(function(d, i) {
      console.log("plotting y of", d, i, "at", that.scale_y(d));
     return that.scale_y(d);
   });

  that.axis = that.group.append("g")

  that.x_axis = that.axis.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + that.scale_y(0) + ')')
    .call(d3.axisBottom(that.scale_x));

  that.y_axis = that.axis.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(that.scale_y));

  that.paths = that.group.append('g')

  for (var name in that.groups) {
      var group = that.groups[name]
      group.path = that.paths.append('path')
          .data([that.data])
          .attr('class', "line")
          .style('stroke', group.color)
  }
}

LineChartWidget.prototype.update_ui = function(){
  for (var name in this.groups) {
      var group = this.groups[name]
      console.log(this.data)
      group.path.attr('d', this.line)
  }

  // this.paths.exit().remove()

  this.paths.transition()
    .attr('transform', 'translate(' + this.scale_x(-1*this.iter) + ')')

  this.iter += this.suppressed;
  console.log("iter", this.suppressed)
}

var lw = new LineChartWidget("cos", "lw_cos");
lw.run();
widgets.add("cos", lw);
