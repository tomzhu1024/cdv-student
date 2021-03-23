// just some console.logging at the start to make
// sure the script runs and we have data (from dataManager.js)
console.log("\n\n\nWelcome!\n\n\n");
console.log("script runs.");
console.log("do we have data?");
// check if variable exists: https://stackoverflow.com/a/519157
console.log("data:", typeof data !== 'undefined' ? data : "nothing here");
console.log(typeof data !== 'undefined' ? "seems like it ;-) it comes from the dataManager.js script." : "...damnit! let's see what is going wrong in the dataManager.js script.");

// function to redraw data points
const updateVisualization = _.debounce(() => {
    // now comes the interesting part, WATCH OUT! i'll go slow
    // we have the page (with nothing on it) and we have data
    // we *toss* it both to D3 and let it do its evaluation about
    // how many elements need to enter/update/exit.
    let elementsForPage = graphGroup.selectAll(".datapoint").data(data, d => d.key);
    // note, we do not use ".enter()" for now. let's have a close look
    // at just this for now
    // as we have learned, D3 did some kind of calculation here, some weighing
    // of what is on the page already and what needs to go there.
    // have a close look at this console.log:
    console.log("D3's assessment of whats needed on the page:", elementsForPage);
    // note the reference to enter, exit and group in the object
    // those three are all the possible selections.
    // they comprises elements that are about to enter (in this case 10),
    // elements that are on the page already and will be updated and elements
    // that don't have any associated datapoint anymore and need to exit.
    // out of this, we can pick those three subsections and decide
    // precisely what to do with the, e.g. how should new elements enter?
    // should they come from the bottom? slowly fade in? - ours to decide
    // how should updating elements change their size, color, position etc.?
    // and the exiting ones, rather than just disappearing, how about they
    // fade out?

    // out of this, we will now extract the sub selections,
    // the entering elements and the exiting ones:
    let enteringElements = elementsForPage.enter();
    let exitingElements = elementsForPage.exit();
    // and again, look closely:
    console.log("enteringElements", enteringElements);
    console.log("exitingElements", exitingElements);
    // note how we now only deal with a "_groups" thing,
    // in the enteringElements object, the "_groups" array holds the
    // empty placeholder elements for the elements that are about to enter
    // equally, in the exitingElements, the "_groups" array holds the elements
    // that ARE on the page, but must leave because no datapoint is their to
    // match them.
    // here is how i see it, we start with ALL the elements
    // that we are dealing with. from that, we extract the entering ones (... and
    // do something with them), we also extract the exiting one (...and treat those
    // differently, too) and then? What are we left with? the UPDATING elements!
    // they are in the "_groups" array we saw in the very beginning inside
    // "elementsForPage". For now, hold the thought that we are dealing
    // with three subsections of elements: entering ones, exiting ones, and updating ones.
    // hopefully this will get clearer as we go on.

    let numEnteringElements = enteringElements._groups[0].filter(i => i).length;
    let numUpdatingElements = elementsForPage._groups[0].filter(i => i).length;
    let numExitingElements = exitingElements._groups[0].filter(i => i).length;
    console.log("# entering elements:", numEnteringElements);
    console.log("# updating elements:", numUpdatingElements);
    console.log("# exiting elements:", numExitingElements);

    // update xAxis
    allNames = data.map(d => d.key);
    xScale.domain(allNames);
    xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(d => data.filter(dd => dd.key === d)[0].name);
    xAxisGroup.transition().delay(numExitingElements > 0 ? 600 : 0).call(xAxis);
    xAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);
    xAxisGroup.selectAll("line").remove();

    // update yAxis
    yMax = d3.max(data, d => d.value);
    yDomain = [0, yMax];
    yScale.domain(yDomain);

    // handle entering elements
    const enteringGroups = enteringElements
        .append("g")
        .classed("datapoint", true);
    enteringGroups
        .attr("transform", d => `translate(${xScale(d.key)}, ${(h - padding)})`);
    enteringGroups
        .append("rect")
        .classed("bar", true)
        .attr("width", () => xScale.bandwidth())
        .attr("y", 0)
        .attr("height", 0)
        .attr("fill", "#ff3d83")
        .transition()
        .delay(numExitingElements > 0 ? 600 : 0)
        .ease(d3.easeBounceOut)
        .duration(600)
        .attr("y", d => -yScale(d.value))
        .attr("height", d => yScale(d.value))
    ;
    enteringGroups
        .append("rect")
        .attr("y", 0)
        .attr("height", 0)
        .attr("width", xScale.bandwidth())
        .attr("fill", "#621ac6")
        .attr("opacity", 1)
        .transition()
        .ease(d3.easePolyOut)
        .delay(400)
        .duration(700)
        .attr("y", d => -yScale(d.value))
        .attr("height", d => yScale(d.value))
        .attr("opacity", 0)
        .remove()
    ;

    // handle exiting elements
    exitingElements
        .transition()
        .delay(600)
        .remove()
    ;
    exitingElements.selectAll("rect")
        .transition()
        .duration(600)
        .attr("y", 0)
        .attr("height", 0)
    ;

    // handle updating elements
    elementsForPage
        .transition()
        .delay(numExitingElements > 0 ? 600 : 0)
        .attr("transform", d => `translate(${xScale(d.key)}, ${(h - padding)})`)
    ;
    elementsForPage.selectAll(".bar")
        .transition()
        .delay(numExitingElements > 0 ? 600 : 0)
        .attr("width", () => xScale.bandwidth())
        .ease(d3.easeBounceOut)
        .attr("y", d => -yScale(d.value))
        .attr("height", d => yScale(d.value))
    ;
}, 100, {leading: true});

// binding functions to the buttons on the page
// the functions we use to do the actual work are defined in dataManager.js
function add() {
    addDatapoints(1);
    updateVisualization().then();
}

document.getElementById("buttonA").addEventListener("click", add);

function remove() {
    removeDatapoints(1);
    updateVisualization().then();
}

document.getElementById("buttonB").addEventListener("click", remove);

function removeAndAdd() {
    removeAndAddDatapoints(1, 1);
    updateVisualization().then();
}

document.getElementById("buttonC").addEventListener("click", removeAndAdd);

function sortData() {
    sortDatapoints();
    updateVisualization().then();
}

document.getElementById("buttonD").addEventListener("click", sortData);

function shuffleData() {
    shuffleDatapoints();
    updateVisualization().then();
}

document.getElementById("buttonE").addEventListener("click", shuffleData);

function secretFunc() {
    data.forEach(item => {
        item.value = getRandom();
    });
    updateVisualization().then();
}

document.getElementById("buttonF").addEventListener("click", secretFunc);

// global variables that we need at various spots:
let w = 800;
let h = 500;
let padding = 50;

// put the svg onto the page:
let viz = d3.select("#container")
    .append("svg")
    .style("width", w)
    .style("height", h)
;

// X SCALE
// we use a band scale
//
// reference: https://github.com/d3/d3-scale#band-scales
// example: https://observablehq.com/@d3/d3-scaleband
//
// this is a useful scale when associating names (not values) with spots
// on the x axis. we don't map a range of values to another range of values,
// but a fixed set of names (the keys of our data points) to
// a range (pixel values along the x axis)
//
// first we need an array with the keys only:
let allNames = data.map(d => d.key);
// check it:
console.log("allNames:", allNames);

// now we as d3 to give us our custom scale
// we say "hey d3, here is a list of names (keys (the domain)), I want a function that
// returns a number (pixel location on the x axis (the range)) for each of the names.
// oh, and could you make sure that this functions calculates in some
// distance (passingInner) between each of those points (bands)?"
let xScale = d3.scaleBand()
    .domain(allNames)
    .range([padding, w - padding])
    .paddingInner(0.1)
;

// create a visual axis corresponding to the scale.
let xAxis = d3.axisBottom(xScale)
// this is a tricky one.... by default the axis would show the scales domain (the unique keys)
// ...in our case we want emojis to show. This situation hardly comes up,
// that's why I just wrote this one-liner for you:
xAxis.tickFormat(d => {
    return data.filter(dd => dd.key === d)[0].name;
});
// create a group to hold all the axis elements
let xAxisGroup = viz.append("g").classed("xAxis", true);
// tell d3 to put the axis into place
xAxisGroup.call(xAxis);
// modfy the axis label (the emoojis) size
xAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);
// get rid of the little tick lines
xAxisGroup.selectAll("line").remove();
// bring axis to the correct y position
xAxisGroup.attr("transform", "translate(0," + (h - padding) + ")")

// Y SCALE
// we will not show a y axis in this graph, but still need a scale
// to make sure our bars have heights that fit the window. It's
// familiar linear scale.
let yMax = d3.max(data, function (d) {
    return d.value
});
// I decided not to use the minimum value of the dataset,
// because otherwise the smallest value's bar would always be 0 pixels
// high and therefore invisible.
let yDomain = [0, yMax];
// "hey d3 i need a linear scale please. yeah! I want to supply a value
// to it that is between 0 and yMax and want one back that fits between
// my graph's paddings. Cheers!"
let yScale = d3.scaleLinear().domain(yDomain).range([0, h - padding * 2]);

// the ACTUAL GRAPH
// before we get to the actual graph, we make a group element into which to
// put all visual graph things:
let graphGroup = viz.append("g").classed("graphGroup", true);
// btw, this:
// .classed("graphGroup", true);
// is almost equivalent to
// .attr("class", "graphGroup");
// but slightly more advanced. you can find a description here:
// https://github.com/d3/d3-selection#selection_classed


// initially draw the data points
updateVisualization().then();
