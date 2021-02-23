d3.json("data.json").then(data => {
    console.log(data);
    // create svg element
    let svg = d3.select("body")
        .append("svg")
        .attr("id", "svg")
        .attr("height", 450)
        .attr("width", 800)
        .style("position", "absolute")
        .style("transform", "translate(-50%, -50%)")
        .style("left", "50%")
        .style("top", "50%")
        .style("background-color", "#6f6e2c")
        .style("outline", "3px solid rgb(100, 100, 100)");
    // create groups
    let groupElements = svg.selectAll(".dataGroup").data(data).enter()
        .append("g")
        .attr("class", "dataGroup");
    // set groups style
    svg.selectAll(".dataGroup").data(data)
        .style("transform",
                e => `translate(calc(50% + ${(e.index % 10) * 70 - 315}px), calc(50% + ${Math.floor(e.index / 10) * 70 - 140}px))`)
    // create circles
    groupElements.append("circle").attr("class", "circle");
    // set circles style
    svg.selectAll(".dataGroup").select(".circle").data(data)
        .attr("class", "circle")
        .attr("r", e => e.c0 * 35)
        .attr("fill", "none")
        .attr("stroke", e => `rgb(${e.c1 * 255}, ${e.c2 * 255}, ${e.c3 * 255})`)
        .attr("stroke-width", 2);
    // create circles
    groupElements.append("circle").attr("class", "circle2");
    // set circles style
    svg.selectAll(".dataGroup").select(".circle2").data(data)
        .attr("class", "circle2")
        .attr("r", e => e.c4 * 30)
        .attr("fill", e => `rgb(${e.c5 * 255}, ${e.c6 * 255}, ${e.c7 * 255})`)
        .attr("stroke", "none");
    // create rects
    groupElements.append("rect").attr("class", "rect");
    // set rects style
    svg.selectAll(".dataGroup").select(".rect").data(data)
        .attr("class", "rect")
        .attr("width", e => e.c8 * 40)
        .attr("height", e => e.c9 * 40)
        .attr("x", e => - e.c8 * 20)
        .attr("y", e => - e.c9 * 20)
        .attr("fill", e => `rgb(${e.c10 * 255}, ${e.c11 * 255}, ${e.c12 * 255})`)
        .attr("stroke", "none");
    // create lines
    groupElements.append("line").attr("class", "line");
    // set lines style
    svg.selectAll(".dataGroup").select(".line").data(data)
        .attr("class", "line")
        .attr("x1", e => e.d0 * 10)
        .attr("y1", e => e.d1 * 10)
        .attr("x2", e => - e.d2 * 10)
        .attr("y2", e => - e.d3 * 10)
        .attr("stroke", e => `rgb(${e.c13 * 255}, ${e.c14 * 255}, ${e.c15 * 255})`)
        .attr("stroke-width", 2);
});
