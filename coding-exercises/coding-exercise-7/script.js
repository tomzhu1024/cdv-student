d3.json("births.json").then(gotData);

function gotData(incomingData) {
    let w = 900;
    let h = 500;
    let xpadding = 100;
    let ypadding = 50;
    let viz = d3.select("#container")
        .append("svg")
        .style("width", w)
        .style("height", h)
        .style("outline", "solid black")
    ;

    // the following function is defined below
    // it allows for us to NOT WORRY about parsing
    // time strings and creating JS date objects
    // in the following script
    incomingData = fixJSDateObjects(incomingData);
    console.log(incomingData);

    // temporarily flatten data to get the minima/maxima:
    let flatData = d3.merge(incomingData)
    // we can use a time scale because our data expresses
    // years in the form of JS date objects
    let xDomain = d3.extent(flatData, function (d) {
        return d.year
    });
    let xScale = d3.scaleTime().domain(xDomain).range([xpadding, w - xpadding]);
    let xAxis = d3.axisBottom(xScale);
    let xAxisGroup = viz.append("g")
        .attr("class", "xaxisgroup")
        .attr("transform", "translate(0," + (h - ypadding) + ")")
    ;
    xAxisGroup.call(xAxis);

    let yMax = d3.max(flatData, function (d) {
        return d.birthsPerThousand;
    })
    let yDomain = [0, yMax];
    let yScale = d3.scaleLinear().domain(yDomain).range([h - ypadding, ypadding]);
    let yAxis = d3.axisLeft(yScale);
    let yAxisGroup = viz.append("g")
        .attr("class", "yaxisgroup")
        .attr("transform", "translate(" + (xpadding / 2) + ",0)")
    ;
    yAxisGroup.call(yAxis);

    let graphGroup = viz.append("g").attr("class", "graphGroup");

    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.birthsPerThousand))
    ;

    graphGroup
        .append("path")
        .classed("line", true)
        .attr("d", lineGenerator(incomingData[0]))
        .attr("fill", 'none')
        .attr("stroke", "#0a2f9b")
        .attr("stroke-width", 5)
        .attr("opacity", 0)
        .transition()
        .delay(500)
        .duration(500)
        .attr("opacity", 1)
    ;

    const updateGraph = (index) => {
        const allLines = graphGroup.selectAll(".line").data(incomingData.filter((v, i) => i === index));
        allLines
            .transition()
            .attr("d", lineGenerator)
            .attr("fill", 'none')
            .attr("stroke", index === 0 ? "#0a2f9b" : "#c80909")
            .attr("stroke-width", 5)
        ;
    }

    document.getElementById('usa').addEventListener('click', () => {
        updateGraph(0);
    });
    document.getElementById('china').addEventListener('click', () => {
        updateGraph(1);
    });
}

// function that turns all datapoints year values
// into JS date objects in the very beginning
// so that WE DON'T HAVE TO DEAL WITH IT LATER
function fixJSDateObjects(dataToFix) {
    // timeParser
    let timeParse = d3.timeParse("%Y");
    return dataToFix.map(function (data) {
        return data.map(function (d) {
            return {
                country: d.country,
                year: timeParse(d.year),
                birthsPerThousand: d.birthsPerThousand,
            }
        })
    });
}
