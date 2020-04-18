//Import Data   
var url = "http://localhost:5000/api/covid_cases/date/?day=2020-04-10";

states=["Alaska","Alabama","Arkansas","Arizona","California","Colorado","Connecticut","District of Columbia","Delaware","Florida","Georgia","Hawaii","Iowa","Idaho","Illinois","Indiana","Kansas","Kentucky","Louisiana","Massachusetts","Maryland","Maine","Michigan","Minnesota","Missouri","Mississippi","Montana","North Carolina","North Dakota","Nebraska","New Hampshire","New Jersey","New Mexico","Nevada","New York","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Virginia","Vermont","Washington","Wisconsin","West Virginia","Wyoming"]
   // optionChanged("All");
   //d3.select("#selDataset").on('change',() => {
  // optionChanged(d3.event.target.value);
  // });
d3.select ("#selState").append('option').attr('value',"USA" ).text('USA');
 for (var i = 0; i<states.length; i++)
	 {
		 d3.select ("#selState").append('option').attr('value',states[i] ).text(states[i]);
	 }

    function optionChanged(selectedID){
      buildPlot(selectedID)
      console.log(selectedID);
      // Reading the json file
	 // var url = "http://localhost:5000/api/covid_cases";
	 //alert("This is alert box!" + selectedID);

  
      //d3.json("Latest_COVID_cases.json").then((data) =>
	  // d3.json(url).then(function(data){
    //   // To clear the dropdown
    //   d3.select("#selDataset").html("");  
    //   // TABLE
    //   // For each item append the item ID
    //   data.forEach(item =>
    //        {
    //        d3.select ("#selDataset").append('option').attr('value', item["Province/State"]).text(item["Province/State"]);
    //        });
    //   d3.select("#selDataset").node().value = selectedID;
    //   const State = data.filter(item=> (item["Province/State"] == selectedID));
    //   console.log(State);
    //   // append key-value pair 
    //   const table = d3.select("#sample-metadata");
    //   table.html("");
    //   Object.entries(State[0]).forEach(item=> 
    //      {
    //       table.append("p").text(`${item[0]}: ${item[1]}`)
        //  }); 

         

// var deaths=State[0].Deaths;
// var confirmed =State[0].Confirmed;

// // PIE CHART : Deaths as a % of Confirmed Cases by State
// var trace1 = {
//      labels: ["Deaths", "Confirmed"],
//      values: [ deaths,confirmed],
//      type: 'pie'
//    };
  
//    var data = [trace1];
  
//    var layout = {
//      title: " Deaths as a Percent of Confirmed Cases by State",
//    };
  
//    Plotly.newPlot("pie", data, layout);
         
        // });
   } 

   
buildPlot("USA");
buildMap();


function buildPlot(state) {
console.log(state);
if (state == "USA")
  var url = "http://localhost:5000/api/covid_cases";
else {
  var url = "http://localhost:5000/api/covid_cases/state/?name="+state;
  console.log(url);}

  d3.json(url).then(function(data) {
    // Grab values from the response json object to build the plots
    var name = "Covid Cases";
    var startDate = "2020-01-22";
    var endDate = "2020-04-10";
    // Print the names of the columns
    console.log(data.column_names);
    // Print the data for each day
    console.log(data);
    // Use map() to build an array of the the dates
    var dates = data.map(row=>row['Date']);
	console.log(dates);
    // Use map() to build an array of the closing prices
    var ConfirmedCases = data.map(row=>row['Confirmed']);
	console.log(ConfirmedCases);
    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: ConfirmedCases,
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace1];

    var layout = {
      title: `Covid Confirmed Cases `+state,
      xaxis: {
        range: [startDate, endDate],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("line_1", data, layout);

  });
}

// function buildLHS() {
  

//   var url = "http://localhost:5000/api/covid_cases";

//   d3.json(url).then(function(data) {
//     // Grab values from the response json object to build the plots
//     var name = "Covid Cases";
//     var startDate = "2020-01-22";
//     var endDate = "2020-04-10";
//     // Print the names of the columns
//     console.log(data.column_names);
//     // Print the data for each day
//     console.log(data);
//     // Use map() to build an array of the the dates
//     var dates = data.map(row=>row['Date']);
// 	console.log(dates);
//     // Use map() to build an array of the closing prices
//     var ConfirmedCases = data.map(row=>row['Confirmed']);
// 	console.log(ConfirmedCases);
//     var trace1 = {
//       type: "scatter",
//       mode: "lines",
//       name: name,
//       x: dates,
//       y: ConfirmedCases,
//       line: {
//         color: "#17BECF"
//       }
//     };

//     var data = [trace1];

//     var layout = {
//       title: `Covid Confirmed Cases`,
//       xaxis: {
//         range: [startDate, endDate],
//         type: "date"
//       },
//       yaxis: {
//         autorange: true,
//         type: "linear"
//       }
//     };

//     Plotly.newPlot("line_1", data, layout);

//   });
// }


function buildMap()
{
// Create a map object

var myMap = L.map("map", {
  center: [37.0902, -95.7129],
  zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken:API_KEY
}).addTo(myMap);

d3.json(url).then(function(data) {

// Loop through the countries array
 for (var i = 0; i<data.length; i++)
	 {

	//var color1 ="";

  // Conditionals for state confirmed cases
   //console.log(data[i].Confirmed);
	if (data[i].Confirmed > 5000)
	{
		color1 = "red";
		radius1= 100000;
	}
	else if (data[i].Confirmed  > 2000)
	{
		color1 = "#ff7800";
		radius1= 100000;
	}
	else if (data[i].Confirmed> 1000)
	{
		color1 = "yellow";
		radius1= 50000;
	}
	else if (data[i].Confirmed< 1000)
	{
		color1 = "green";
		radius1= 25000;
	}
	var geojsonMarkerOptions = {
    radius: radius1,
    fillColor: color1,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
console.log(geojsonMarkerOptions);
  L.circle([data[i].latitude,data[i].longitude],geojsonMarkerOptions).bindPopup("<h1>" + data[i]['Province/State'] + "</h1> <hr> <h3>Confirmed: " + data[i].Confirmed + "</h3>").addTo(myMap);
}
});
}

