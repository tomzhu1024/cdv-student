let w = 1200;
let h = 800;
let padding = 90

// SVG



function projectionTween(projection0, projection1) {
    return function (d) {
        let t = 0;
        let projection = d3.geoProjection(project)
            .scale(1)
            .translate([w / 2, h / 2])
        ;
        let path = d3.geoPath(projection);

        function project(phi, delta) {
            phi *= 180 / Math.PI;
            delta *= 180 / Math.PI;
            let p0 = projection0([phi, delta]), p1 = projection1([phi, delta]);
            return [(1 - t) * p0[0] + t * p1[0], (1 - t) * -p0[1] + t * -p1[1]];
        }

        return function (_) {
            t = _;
            return path(d);
        };
    };
}


// IMPORT DATA
d3.json("countries.geojson").then((geoData) => {
    d3.csv("china-pop-2018.csv").then((incomingData) => {

        let projections = [
            d3.geoEqualEarth()
                .translate([w / 2, h / 2]),
            d3.geoOrthographic()
                .translate([w / 2, h / 2]),
            d3.geoStereographic()
                .translate([w / 2, h / 2]),
        ];
        let pathMaker = d3.geoPath(projections[0]);
        let currentProjection = 0;

        let viz = d3.select("#container").append("svg")
            .style("width", w)
            .style("height", h)
            .style("background-color", "lavender");
        let group = viz.append("g")
            .on("wheel.zoom",function() {
                var currScale = projections[currentProjection].scale();
                var newScale = currScale - 2 * event.deltaY;
                var currTranslate = projections[currentProjection].translate();
                var coords = projections[currentProjection].invert([event.offsetX, event.offsetY]);
                projections[currentProjection].scale(newScale);
                var newPos = projections[currentProjection](coords);

                projections[currentProjection].translate([currTranslate[0] + (event.offsetX - newPos[0]), currTranslate[1] + (event.offsetY - newPos[1])]);
                group.selectAll("path").attr("d", pathMaker);
            })

        console.log(geoData);
        console.log(incomingData);


        group.selectAll(".provinces").data(geoData.features).enter()
            .append("path")
            .attr("class", "provinces")
            .attr("d", pathMaker)
            .attr("fill", "black")
            .attr("stroke", "red")
        ;

        document.getElementById('proj1').addEventListener('click', () => {
            if (currentProjection !== 0) {
                group.selectAll(".provinces")
                    .transition()
                    .duration(1000)
                    .ease(d3.easeLinear)
                    .attrTween("d", projectionTween(projections[currentProjection], projections[0]))
                ;
                currentProjection = 0;
            }
        });
        document.getElementById('proj2').addEventListener('click', () => {
            if (currentProjection !== 1) {
                group.selectAll(".provinces")
                    .transition()
                    .duration(1000)
                    .ease(d3.easeLinear)
                    .attrTween("d", projectionTween(projections[currentProjection], projections[1]))
                ;
                currentProjection = 1;
            }
        });
        document.getElementById('proj3').addEventListener('click', () => {
            if (currentProjection !== 2) {
                group.selectAll(".provinces")
                    .transition()
                    .duration(1000)
                    .ease(d3.easeLinear)
                    .attrTween("d", projectionTween(projections[currentProjection], projections[2]))
                ;
                currentProjection = 2;
            }
        });

    });
});
