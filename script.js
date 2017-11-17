//Setting Margin for Plot
var margin = {top: 5, right: 20, bottom: 0, left: 50},
  width  = 500 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

//X-Axis Options
var xcord=[
  {
    id:'mpg',
    name:'mpg'
  },
  {
    id:'cylinders',
    name:'cylinders'
  },
  {
    id:'displacement',
    name:'displacement'
  },
  {
    id:'horsepower',
    name:'horsepower'
  },
  {
    id:'weight',
    name:'weight'
  },
  {
    id:'acceleration',
    name:'acceleration'
  },
  {
    id:'model.year',
    name:'model.year'
  }
];

//Y-Axis Options
var ycord=[
  {
    id:'mpg',
    name:'mpg'
  },
  {
    id:'cylinders',
    name:'cylinders'
  },
  {
    id:'displacement',
    name:'displacement'
  },
  {
    id:'horsepower',
    name:'horsepower'
  },
  {
    id:'weight',
    name:'weight'
  },
  {
    id:'acceleration',
    name:'acceleration'
  },
  {
    id:'model.year',
    name:'model.year'
  }
];

function addListeners(){

    //Define the axes
    var xcordval=d3.select("#sel-x").node().value;
    var ycordval=d3.select("#sel-y").node().value;
    //Create an svg
    var svg= d3.select("svg")
      .attr("width", width+60)
      .attr("height", height+50)
      .append("g")
      .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    //Set the ranges
    var x = d3.scaleLinear().range([0,width]);
    var y = d3.scaleLinear().range([height,0]);

//Setting mpg default range
    var min=$('#mpg-min').val();
    var max=$('#mpg-max').val();

//Load CSV Values
d3.csv('car.csv',function(data) {
  d3.selectAll(".markers").remove();
  d3.selectAll(".axisLabel").remove();
  d3.selectAll("#x-axis").remove();
  d3.selectAll("#y-axis").remove();

  data.forEach(function(d) {
    d["mpg"]=+d["mpg"];
    d["name"]=d["name"];
    d[xcordval] = +d[xcordval];
    d[ycordval] = +d[ycordval];
  });
  //Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d[xcordval]; }));
  y.domain(d3.extent(data, function(d) { return d[ycordval]; }));

  //Scatterplot
  svg.append("g")
        .attr("id", "scatter-1")
        .selectAll("dot")
        .data(data)
        .enter().append("circle")
        .filter(function(d) { return (d.mpg > min && d.mpg < max) })
          .style("fill", "black")
        .attr("r", 3.5)
        .attr("class", 'markers')
        .attr("cx",function(d) { return x(d[xcordval]); })
        .attr("cy",function(d) { return y(d[ycordval]); })
        .on("mouseover", function(d) {
            $('#hovered')
            .val(d["name"])
            .text(d["name"])
        });
  //Add the X-Axis
  svg.append("g")
          .attr("id", "x-axis")
          .attr("transform", "translate(" + 0 + " ," + (height) + ")")
              .call(d3.axisBottom(x))
          svg.append("text")
          .attr("transform",
            "translate(" + (width/2) + " ," +
                           (height+30) + ")")
          .style("text-anchor", "middle")
          .text(d3.select("#sel-x").node().value)
          .classed("axisLabel",true);

  //Add the Y-Axis
  svg.append("g")
          .attr("id", "y-axis")
                .call(d3.axisLeft(y))
          svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
                .text(d3.select("#sel-y").node().value)
          .classed("axisLabel",true);

});
}

$(document).ready(function(){
  var selectionx = $("#sel-x");
  for(var i=0;i<xcord.length;i++){
    var xl=xcord[i];
    $('<option></option>')
    .val(xl.id)
    .text(xl.name)
    .appendTo(selectionx);
  }
  var selectiony = $("#sel-y");
  for(var i=0;i<ycord.length;i++){
    var yl=ycord[i];
    $('<option></option>')
    .val(yl.id)
    .text(yl.name)
    .appendTo(selectiony);
  }
  $('#update').on('click',function(){
  addListeners();
});

})
