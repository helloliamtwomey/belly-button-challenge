const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

init();

function init() {

  var selectDropDown = d3.select("#selDataset");

  d3.json(url).then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selectDropDown
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSubjectID) {
    buildMetadata(newSubjectID);
    buildCharts(newSubjectID);
}

function buildMetadata(subjectID) {

  d3.json(url).then(function (data) {
    var metadataDiv = d3.select('#sample-metadata');
    var metadata = data.metadata;

    var resultArray = metadata.filter(sampleObj => sampleObj.id == subjectID);
    var result = resultArray[0];

    metadataDiv.html("");

    Object.entries(result).map(([key, value]) => {
      metadataDiv.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

function buildCharts(subjectID) {

  d3.json(url).then(function (data) {
    var dataSamples = data.samples;
    var resultArray = dataSamples.filter(sampleObj => sampleObj.id == subjectID);

    var metadataArray = data.metadata;
    var resultMetadata = metadataArray.filter(sampleObj => sampleObj.id == subjectID);

    var result = resultArray[0];
    var metadata = resultMetadata[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var wFreq = parseFloat(metadata.wfreq);

    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    var barLayout = {
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, barLayout);

    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      type: "scatter",
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Viridis"
      }
    }];

    var bubbleLayout = {
      xaxis: {title: "OTU ID"},
      width: 1300, 
      height: 500, 
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

const gaugeData = [{  domain: { x: [0, 1], y: [0, 1] },
  value: wFreq,
  title: {
    text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
    font: { size: 24 },
  },
  type: "indicator",
  mode: "gauge+number",
  gauge: {
    axis: {
      range: [0, 9],
      tickvals: Array.from({ length: 9 }, (_, i) => i),
      ticktext: Array.from({ length: 9 }, (_, i) => i),
      tickmode: "array",
      tickwidth: 1,
      tickcolor: "black",
    },
    bar: { color: "transparent" },
    steps: [
      { range: [0, 1], color: "rgba(239, 243, 229, 0.5)" },
      { range: [1, 2], color: "rgba(198, 231, 187, 0.5)" },
      { range: [2, 3], color: "rgba(158, 220, 152, 0.5)" },
      { range: [3, 4], color: "rgba(118, 209, 117, 0.5)" },
      { range: [4, 5], color: "rgba(78, 197, 83, 0.5)" },
      { range: [5, 6], color: "rgba(52, 156, 52, 0.5)" },
      { range: [6, 7], color: "rgba(41, 130, 41, 0.5)" },
      { range: [7, 8], color: "rgba(30, 104, 30, 0.5)" },
      { range: [8, 9], color: "rgba(20, 79, 20, 0.5)" },
    ],
    threshold: {
      line: { color: "black", width: 4 },
      thickness: 0.75,
      value: wFreq,
    },
    marker: {
      colors: ["darkblue"],
      line: { color: "black", width: 3 },
      symbol: ["M 0 -10 L 10 0 L 0 10 L -10 0 Z"],
      size: 20,
    },
  },
}];

const gaugeLayout = {
  width: 600,
  height: 500,
  margin: { t: 0, b: 0 },
};

Plotly.newPlot("gauge", gaugeData, gaugeLayout);
});
}