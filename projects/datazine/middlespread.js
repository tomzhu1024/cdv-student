const svg = d3.select('#container')
    .append('svg')
    .style('width', '100%')
    .style('height', '100%')
    .style('background-color', '#90E060');

const defs = svg.append('defs');

const colorMap = {
    yellow: '#f6f312',
    blue: '#00caff',
    white: '#ffffff',
    green: '#44ff3f',
    black: '#000000',
    pink: '#ff8c8c',
    red: '#d21c1c',
    purple: '#ca01e0',
    grey: '#494949',
    orange: '#ff6f00',
};

d3.json('data.json').then(data => {
    // group data by date
    let newData = [];
    for (let day = 0; day < 8; day++) {
        newData.push(data.slice(day * 24, (day + 1) * 24));  // slice into single day's data
    }
    // create group for each day
    newData.map((dayData, index) => {
        let group = svg.append('g')
            .style('transform', `translate(${
                (index % 4) * 300 + 150 + 5 * (index % 2 === 0 ? 1 : -1)
            }px, ${
                Math.floor(index / 4) * 350 + 225 + 10 * (index % 2 === 0 ? 1 : -1)
            }px)`);
        // center circle cascading
        dayData.filter(entry => entry.conscious === 'yes')
            .map((entry, index2) => {
                // create gradient
                const gradId = `leftBigGrad-${index.toString()}-${index2.toString()}`;
                const grad = defs.append('radialGradient')
                    .attr('id', gradId);
                grad.append('stop')
                    .attr('offset', '0%')
                    .attr('stop-color', '#ffffff')
                    .attr('stop-opacity', 0.5);
                grad.append('stop')
                    .attr('offset', '100%')
                    .attr('stop-color', colorMap[entry.color]);
                // apply gradient
                group.append('circle')
                    .attr('r', 120)
                    .attr('fill', `url(#${gradId})`)
                    .attr('stroke', '#816BFA')
                    .attr('stroke-width', 20)
                    .style('opacity', 0.5);
            });
        // add text
        group.append('text')
            .text(dayData[0].date)
            .style('transform', 'translate(-45px, -137px) rotate(-5deg)')
            .style('font-family', '\'Akaya Kanadaka\', cursive')
            .style('font-weight', 700)
            .style('fill', '#F86BE3')
            .style('font-size', 24)
            .style('text-shadow', '0 0 5px ' + '#FFE89D');
        // add small cycles
        dayData.map((entry, index) => {
            group.append('circle')
                .attr('r', 10)
                .attr('fill', entry.conscious === 'yes' ? colorMap[entry.color] : 'none')
                .attr('stroke', entry.conscious === 'yes' ? 'none' : '#FFE89D')
                .attr('stroke-width', 1.5)
                .attr('cx', Math.cos(-Math.PI / 2 + Math.PI / 12 * index) * 120)
                .attr('cy', Math.sin(-Math.PI / 2 + Math.PI / 12 * index) * 120);
            group.append('text')
                .text(entry.source)
                .style('transform', `translate(${
                    Math.cos(-Math.PI / 2 + Math.PI / 12 * index - Math.PI / 100) * 103
                }px, ${
                    Math.sin(-Math.PI / 2 + Math.PI / 12 * index - Math.PI / 100) * 103
                }px) rotate(${
                    15 * index + 90
                }deg)`)
                .style('font-family', '\'Akaya Kanadaka\', cursive')
                .style('font-size', 18)
                .style('fill', '#ffffff')
                .style('text-shadow', '0 0 5px ' + '#0e0e0e');
        });
    });
    // list top colors
    const freqCount = new Map();
    data.map(entry => {
        if (entry.color === "") {
            return;
        }
        if (freqCount.has(entry.color)) {
            freqCount.set(entry.color, freqCount.get(entry.color) + 1);
        } else {
            freqCount.set(entry.color, 1);
        }
    });
    const sizeScale = d3.scaleLinear()
        .domain([0,7])
        .range([75, 45]);
    [...freqCount].sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(entry => entry[0])
        .map((color, index) => {
            let group = svg.append('g')
                .style('transform', `translate(${
                    (index % 5) * 235 + 1350 + 5 * (index % 2 === 0 ? 1 : -1)
                }px, ${
                    Math.floor(index / 5) * 350 + 225 + 10 * (index % 2 === 0 ? 1 : -1)
                }px)`);
            // center circle
            // create gradient
            const gradId = `rightBigGrad-${index.toString()}`;
            const grad = defs.append('radialGradient')
                .attr('id', gradId);
            grad.append('stop')
                .attr('offset', '0%')
                .attr('stop-color', '#ffffff')
                .attr('stop-opacity', 0.5);
            grad.append('stop')
                .attr('offset', '100%')
                .attr('stop-color', colorMap[color]);
            // apply gradient
            group.append('circle')
                .attr('r', sizeScale(index))
                .attr('fill', `url(#${gradId})`)
                .attr('stroke', '#929292')
                .attr('stroke-width', 2);
            // count in each day
            const freq = [];
            for (let i = 0; i < 24; i++) {
                freq.push(newData.filter(dayData => dayData[i].color === color).length);
            }
            const heightScale = d3.scaleLinear()
                .domain([0, 5])
                .range([10, 100]);
            const colorScale = d3.scaleLinear()
                .domain([-3, 3])
                .range(['#ffffff', colorMap[color]]);
            freq.map((freqEntry, index2) => {
                group.append('rect')
                    .attr('height', heightScale(freqEntry))
                    .attr('width', 10)
                    .attr('fill', colorScale(freqEntry))
                    .attr('stroke', '#929292')
                    .style('transform', `translate(${
                        Math.cos(-Math.PI / 2 + Math.PI / 12 * index2 - Math.PI / 100) * sizeScale(index)
                    }px, ${
                        Math.sin(-Math.PI / 2 + Math.PI / 12 * index2 - Math.PI / 100) * sizeScale(index)
                    }px) rotate(${
                        15 * index2 + 180
                    }deg)`);
            });
        });
});
