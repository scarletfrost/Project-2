//Import Data   
    function optionChanged(selectedID){
      //console.log(selectedID);
      // Reading the json file
      d3.json("Latest_COVID_cases.json").then((data) => {
      // To clear the dropdown
      d3.select("#selDataset").html("");  
      // TABLE
      // For each item append the item ID
      data.forEach(item =>
           {
           d3.select ("#selDataset").append('option').attr('value', item["Province/State"]).text(item["Province/State"]);
           });
      d3.select("#selDataset").node().value = selectedID;
      const State = data.filter(item=> (item["Province/State"] == selectedID));
      console.log(State);
      // append key-value pair 
      const table = d3.select("#sample-metadata");
      table.html("");
      Object.entries(State[0]).forEach(item=> 
         {
          table.append("p").text(`${item[0]}: ${item[1]}`)
         }); 

var deaths=State[0].Deaths;
var confirmed =State[0].Confirmed;

// PIE CHART : Deaths as a % of Confirmed Cases by State
var trace1 = {
     labels: ["Deaths", "Confirmed"],
     values: [ deaths,confirmed],
     type: 'pie'
   };
  
   var data = [trace1];
  
   var layout = {
     title: " Deaths as a Percent of Confirmed Cases by State",
   };
  
   Plotly.newPlot("pie", data, layout);
         
        });
   } 
   // page loads with id 940 initially
   optionChanged("Alabama");
   d3.select("#selDataset").on('change',() => {
   optionChanged(d3.event.target.value);
   });
