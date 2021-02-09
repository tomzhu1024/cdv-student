let data = [
    {
        "timestamp": "2021/02/08 00:00:00",
        "conscious": true,
        "color": "black",
        "category": "object",
        "source": "sky"
    },
    {
        "timestamp": "2021/02/08 00:01:00",
        "conscious": false,
        "color": "",
        "category": "",
        "source": ""
    },
    {
        "timestamp": "2021/02/08 00:02:00",
        "conscious": false,
        "color": "",
        "category": "",
        "source": ""
    },
    {
        "timestamp": "2021/02/08 00:03:00",
        "conscious": false,
        "color": "",
        "category": "",
        "source": ""
    },
    {
        "timestamp": "2021/02/08 00:04:00",
        "conscious": false,
        "color": "",
        "category": "",
        "source": ""
    },
    {
        "timestamp": "2021/02/08 00:05:00",
        "conscious": false,
        "color": "",
        "category": "",
        "source": ""
    },
    {
        "timestamp": "2021/02/08 00:06:00",
        "conscious": false,
        "color": "",
        "category": "",
        "source": ""
    },
    {
        "timestamp": "2021/02/08 00:07:00",
        "conscious": false,
        "color": "",
        "category": "",
        "source": ""
    },
    {
        "timestamp": "2021/02/08 00:08:00",
        "conscious": true,
        "color": "blue",
        "category": "object",
        "source": "bed"
    },
    {
        "timestamp": "2021/02/08 00:09:00",
        "conscious": true,
        "color": "orange",
        "category": "object",
        "source": "desk"
    },
    {
        "timestamp": "2021/02/08 00:10:00",
        "conscious": true,
        "color": "blue",
        "category": "object",
        "source": "computer screen"
    },
    {
        "timestamp": "2021/02/08 00:11:00",
        "conscious": true,
        "color": "gray",
        "category": "object",
        "source": "carpet"
    },
    {
        "timestamp": "2021/02/08 00:12:00",
        "conscious": true,
        "color": "white",
        "category": "object",
        "source": "cloud"
    },
    {
        "timestamp": "2021/02/08 00:13:00",
        "conscious": true,
        "color": "red",
        "category": "object",
        "source": "screen"
    },
    {
        "timestamp": "2021/02/08 00:14:00",
        "conscious": true,
        "color": "yellow",
        "category": "people",
        "source": "clothes"
    },
    {
        "timestamp": "2021/02/08 00:15:00",
        "conscious": true,
        "color": "pink",
        "category": "people",
        "source": "face"
    },
    {
        "timestamp": "2021/02/08 00:16:00",
        "conscious": true,
        "color": "gray",
        "category": "object",
        "source": "floor"
    },
    {
        "timestamp": "2021/02/08 00:17:00",
        "conscious": true,
        "color": "blue",
        "category": "object",
        "source": "sky"
    },
    {
        "timestamp": "2021/02/08 00:18:00",
        "conscious": true,
        "color": "yellow",
        "category": "object",
        "source": "food"
    },
    {
        "timestamp": "2021/02/08 00:19:00",
        "conscious": true,
        "color": "black",
        "category": "object",
        "source": "clothes"
    },
    {
        "timestamp": "2021/02/08 00:20:00",
        "conscious": true,
        "color": "green",
        "category": "object",
        "source": "screen"
    },
    {
        "timestamp": "2021/02/08 00:21:00",
        "conscious": true,
        "color": "white",
        "category": "object",
        "source": "screen"
    },
    {
        "timestamp": "2021/02/08 00:22:00",
        "conscious": true,
        "color": "yellow",
        "category": "object",
        "source": "road lamp"
    },
    {
        "timestamp": "2021/02/08 00:23:00",
        "conscious": true,
        "color": "green",
        "category": "object",
        "source": "screen"
    }
];

let viz = d3.select("#viz-container")
    .append("svg")
    .attr("id", "viz")
    .attr("height", 400)
    .attr("width", 800);

d3.json("data.json").then(data => {
    let allSrc = Array.from(new Set(data.map(entry => entry.source)));
    data.forEach(entry => {
        console.log(entry);
        console.log(new Date(entry.timestamp).getHours());
        viz.append(entry.category === "people" ? "circle" : "rect")
            .attr("fill", entry.conscious ? entry.color : "white")
            .attr("stroke", entry.conscious ? "green" : "red")
            .attr("stroke-width", 3)
            .attr("cx", new Date(entry.timestamp).getHours() * 30 + 7.5 + 30)
            .attr("cy", allSrc.indexOf(entry.source) * 20 + 70 + 7.5)
            .attr("x", new Date(entry.timestamp).getHours() * 30 + 30)
            .attr("y", allSrc.indexOf(entry.source) * 20 + 70)
            .attr("width", entry.conscious ? 15 : 10)
            .attr("height", entry.conscious ? 15 : 10)
            .attr("r", entry.conscious ? 7.5 : 5);
    });
});
