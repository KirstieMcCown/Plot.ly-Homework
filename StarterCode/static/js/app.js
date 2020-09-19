var data;
var dataNames;
var sampledata;
var datametadata;
var firstID;
var firstIDlabels;
var selectedID;



// Populate dropbox with ID Values - ID Values come from dataSamples, this comes as a list
d3.json("samples.json").then((data) => {
    data = data;
    dataNames = data.names;
    sampledata = data.samples;
    datametadata = data.metadata;
    firstID = sampledata[0].otu_ids
    firstIDlabels = sampledata[0].otu_labels;
    dataNames.forEach((name) => {
    var dropdownMenu = d3.select("#selDataset");
    var newoption = dropdownMenu.append("option");
    newoption.attr('value', name);
    newoption.text(name);   
    selectedID = dropdownMenu.node().value;
    
    
    // console.log(selectedID)
})
});

// Run the optionChanged function on the default ID to load when the page is first opened
var defaultID = "940"
optionChanged(defaultID);

// Create a function to change demographics table and all charts based on selected ID
function optionChanged(selectedID) {
    //console.log(sampleValue);
        metadataTable(selectedID);
        barchart(selectedID);
        bubblechart(selectedID);
        gaugechart(selectedID);
}

// Create a function to populate the Demographics Table based on selected ID
function metadataTable(selectedID) {
    d3.json("samples.json").then((data) => {
        var info = datametadata.filter(person => person.id == selectedID);
        var selectedinfo = info[0];
        var panel = d3.select("#sample-metadata");
        panel.html("");
        var demographics = Object.entries(selectedinfo)
        demographics.forEach((item) => {
        panel.append("h6").text(item[0]+': '+item[1]);
    });
  });
}

// Create a function to populate the Bar Chart based on selected ID
function barchart(selectedID){
    d3.json("samples.json").then((data) => {
    var dropdownMenu = d3.select("#selDataset");
    selectedID = dropdownMenu.node().value;
    var samples = data.samples;
    var selectID = samples.filter(person=>person.id==selectedID);
    var valuearray = selectID[0];
    var values = valuearray.sample_values.slice(0,10);
    var IDs = valuearray.otu_ids.map(otu => "OTU " + otu)
    var labels = valuearray.otu_labels.slice(0,10);
    // console.log(valuearray);
    var trace = {
        x : values,
        y : IDs,
        text : labels,
        type : 'bar',
        orientation : 'h'
    };
    // Define the plot layout
    var layout = {
        title: "Top 10 OTU's for Selected Test Subject",
        xaxis: { title: "Sample Value" },
        yaxis: { title: "OTU ID" }
    };
    var plotdata = [trace]
    Plotly.newPlot('bar', plotdata, layout)

})}; 

// Create a function to populate the Bar Chart based on selected ID
function bubblechart(selectedID){
    d3.json("samples.json").then((data) => {
    var dropdownMenu = d3.select("#selDataset");
    selectedID = dropdownMenu.node().value;
    var samples = data.samples;
    var selectID = samples.filter(person=>person.id==selectedID);
    var valuearray = selectID[0];
    var values = valuearray.sample_values;
    var IDs = valuearray.otu_ids;
    var labels = valuearray.otu_labels;
    // console.log(valuearray);
    var trace = {
        x : IDs,
        y : values,
        text : labels,
        mode: 'markers',
        marker: {
            size: values,
            color: IDs
        }
    };
    // Define the plot layout
    var layout = {
        title: "All OTU's for Selected Test Subject",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Value" }
    };
    var plotdata = [trace]
    Plotly.newPlot('bubble', plotdata, layout)

})}; 


// Create a function to populate the Gauge Chart based on selected ID
function gaugechart(selectedID){
    d3.json("samples.json").then((data) => {
    var dropdownMenu = d3.select("#selDataset");
    selectedID = dropdownMenu.node().value;
    var washfreq = datametadata.filter(person => person.id == selectedID)[0].wfreq;
    // console.log(washfreq)
    var trace = {
        domain: { x: [0, 1], y: [0, 1] },
		value: washfreq,
		title: { text: "Wash Frequency" },
		type: "indicator",
        mode: "gauge+number",
        gauge: { axis: { range: [null, 9] } }

    };
    
    var plotdata = [trace]
    Plotly.newPlot('gauge', plotdata)

})};