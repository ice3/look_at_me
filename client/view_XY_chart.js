///////////////////////////////
// XY chart
// http://bl.ocks.org/bunkat/2595950
///////////////////////////////

var data = [[2, 3, 20]];

var margin = {top: 20, right: 15, bottom: 60, left: 60}
, width = 960 - margin.left - margin.right
, height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
  .domain([-2, 2])
  .range([ 0, width ]);

var y = d3.scale.linear()
  .domain([-2, 2])
  .range([ height, 0 ]);

var chart = d3.select('body')
  .append('svg:svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)
  .attr('class', 'chart')

var main = chart.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .attr('width', width)
  .attr('height', height)
  .attr('class', 'main')

// draw the x axis
var xAxis = d3.svg.axis()
  .scale(x)
  .orient('bottom');

main.append('g')
  .attr('transform', 'translate(0,' + height + ')')
  .attr('class', 'main axis date')
  .call(xAxis);

// draw the y axis
var yAxis = d3.svg.axis()
  .scale(y)
  .orient('left');

main.append('g')
  .attr('transform', 'translate(0,0)')
  .attr('class', 'main axis date')
  .call(yAxis);

var g = main.append("svg:g");

g.selectAll("scatter-dots")
  .data(data)
  .enter().append("svg:circle")
  .attr("cx", function (d,i) { return x(d[0]); } )
  .attr("cy", function (d) { return y(d[1]); } )
  .attr("r", function(d){return d[2]});

function tick(data) {
  console.log(data)

  g.selectAll("circle")
    .attr("cx", function(d) {
      return x(data[0]);  // Circle's X
    })
    .attr("cy", function(d) {
      return y(data[1]);  // Circle's X
    })
    .attr("r", data[2])
}
