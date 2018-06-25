window.onload = init;
var simpleGDPData = [];
var json;

function init() {
  // Get data from Free Code Camp API - Start
  var dataSpot = document.getElementById("data-verification");
  req = new XMLHttpRequest();
  let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  req.open("GET", url, true);
  req.send();
  req.onload = function() {
    json = JSON.parse(req.responseText);
    // dataSpot.innerHTML = `Data loaded from the ${json.source_name} ranging from year ${json.from_date.slice(0, 4)} to ${json.to_date.slice(0, 4)}.`;

    // Simplify data to a single array of GDP nominal values and assign to a global variable
    json.data.forEach(function(e) { simpleGDPData.push(e[1]) });
    renderGraph();
  }
  // Get data from Free Code Camp API - End
}