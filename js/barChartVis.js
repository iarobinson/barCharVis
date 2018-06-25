var simpleGDPData = [], json;
window.onload = init;

function init() {
  // Get data from Free Code Camp API - Start
  var dataSpot = document.getElementById("data-verification");
  req = new XMLHttpRequest();
  let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  req.open("GET", url, true);
  req.send();
  req.onload = function() {
    json = JSON.parse(req.responseText);
    // Simplify data to a single array of GDP nominal values and assign to a global variable
    json.data.forEach(function(e) { simpleGDPData.push(e[1]) });
    renderGraph();
  }
  // Get data from Free Code Camp API - End
}

// Rendering bar chart with D3.js
function renderGraph() {
  //NOTED
  // Setting up the graph SVG with variables that are easily changed
  const yMargin = 40;
  const width = 800;
  const height = 400;
  const barWidth = width / 275;

  // Using D3.js to pull max values for year and GDP of Fed Reserve data
  const minGDP = d3.min(simpleGDPData);
  const maxGDP = d3.max(simpleGDPData);
  const minYear = d3.min(json.data, (d) => d[0].slice(0, 4));
  const maxYear = d3.max(json.data, (d) => d[0].slice(0, 4));

  //noted
  const svg = d3.select("#body")
                .append("svg")
                .attr("width", width + 100)
                .attr("height", height + 60);

  //noted
  const xScale = d3.scaleLinear()
                  .domain([minYear, maxYear])
                  .range([0, width]);
  //noted
  const linearScale = d3.scaleLinear()
                        .domain([minGDP, maxGDP])
                        .range([(minGDP / maxGDP) * height, height]);

  //noted
  const scaledGDP = simpleGDPData.map(function(item) {
    return linearScale(item);
  })

  //noted
  const yAxisScale = d3.scaleLinear()
                       .domain([minGDP, maxGDP])
                       .range([height, (minGDP / maxGDP) * height]);

  //noted
  const yAxis = d3.axisLeft(yAxisScale);
  //noted
  const yAxisGroup = svg.append("g")
                        .call(yAxis)
                        .attr("id", "y-axis")
                        .attr("transform", "translate(60, 0)");

  const overlay = d3.select('svg').append('div')
  .attr('class', 'overlay')
  .style('opacity', 0);

  const tooltip = d3.select(".visHolder")
                  .append("div")
                  .attr("id", "tooltip")
                  .style("opacity", 0);

  d3.select("svg")
    .selectAll("rect")
    .data(scaledGDP)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * barWidth)
    .attr("y", (d, i) => height - d)
    .attr("width", barWidth)
    .attr("height", (d) => d)
    .attr("transform", "translate(60, 0)")
    .attr("data-date", (d, i) => json.data[i][0])
    .attr("data-gdp", (d, i) => json.data[i][1])
    .attr("class", "bar")
    .attr("id", "tooltip")

  //noted
  const xAxis = d3.axisBottom()
                  .scale(xScale)
                  .tickFormat(d3.format("d"));
 //noted
 const xAxisGroup = svg.append("g")
                       .call(xAxis)
                       .attr("id", "x-axis")
                       .attr("transform", "translate(60, 400)");
}