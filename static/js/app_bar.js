  
      // // Reading the json file
      // d3.json("US_COVID_cases.json").then((data) => {
      // const sample_ID = data.samples.filter(item => parseInt(item.id) == selectedID);
      // // Slicing for top 10
      // var sampleValue1 = sample_ID[0].sample_values.slice(0,10);
      // var otuID = sample_ID[0].otu_ids.slice(0,10);
      // var otuLabels = sample_ID[0].otu_labels;
      // const y_axis = otuID.map(item => 'OTU' + item);
      //    const trace = {
      //    y: y_axis,
      //    x: sampleValue1,
      //    type: 'bar',
      //    orientation: "h",
      //    text:  otuLabels,
      //    marker: 
      //    {  color: 'steelblue',
      //       line: {width: 1}  }
      //    },
      //    layout = {
      //    title: 'Top 10 OTUs found in the individual',
      //    yaxis: {
      //        title: 'OTU ID',
      //        autorange:'reversed'
      //     },
      //    xaxis: {title: 'Sample Values'},
      //    };
      // Plotly.newPlot('bar', [trace], layout,  {responsive: true});
      //   });
  