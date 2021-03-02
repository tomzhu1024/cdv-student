const svg = d3.select('#container')
    .append('svg')
    .style('width', '100%')
    .style('height', '100%')
    .style('background-color', '#999999');

const defs = svg.append('defs');


d3.json('data.json').then(data => {
    // group data by date
    let newData = [];
    for (let day = 0; day < 8; day++) {
        newData.push(data.slice(day * 24, (day + 1) * 24));  // slice into single day's data
    }
    console.log(newData);
    // create group for each day
    newData.map((dayData, index) => {
        let group = svg.append('g')
            .style('transform', `translate(${
                (index % 4) * 300 + 150 + 5 * (index % 2 === 0 ? 1 : -1)
            }px, ${
                Math.floor(index / 4) * 350 + 240 + 20 * (index % 2 === 0 ? 1 : -1)
            }px)`);
        // center circle cascading
        dayData.filter(entry => entry.conscious === 'yes')
            .map((entry, index2) => {
                // create gradient
                const gradId = `bigGrad-${index.toString()}-${index2.toString()}`;
                const grad = defs.append('radialGradient')
                    .attr('id', gradId);
                grad.append('stop')
                    .attr('offset', '0%')
                    .attr('stop-color', '#ffffff')
                    .attr('stop-opacity', 0.5);
                grad.append('stop')
                    .attr('offset', '100%')
                    .attr('stop-color', entry.color);
                // apply gradient
                group.append('circle')
                    .attr('r', 120)
                    .attr('fill', `url(#${gradId})`)
                    .attr('stroke', '#ffffff')
                    .attr('stroke-width', 3)
                    .style('opacity', 0.2);
            });
        // add text
        group.append('text')
            .text(dayData[0].date)
            .style('transform', 'translate(-45px, -145px) rotate(-15deg)')
            .style('font-family', 'sans-serif')
            .style('font-weight', 700)
            .style('fill', '#ffffff');
        // add small cycles
        dayData.map((entry, index) => {
            group.append('circle')
                .attr('r', 10)
                .attr('fill', entry.conscious === 'yes' ? entry.color : 'none')
                .attr('stroke', entry.conscious === 'yes' ? '#232323' : '#ffffff')
                .attr('stroke-width', 1.5)
                .attr('cx', Math.cos(-Math.PI / 2 + Math.PI / 12 * index) * 120)
                .attr('cy', Math.sin(-Math.PI / 2 + Math.PI / 12 * index) * 120);
            group.append('text')
                .text(entry.source)
                .style('transform', `translate(${
                    Math.cos(-Math.PI / 2 + Math.PI / 12 * index - Math.PI / 100) * 107
                }px, ${
                    Math.sin(-Math.PI / 2 + Math.PI / 12 * index - Math.PI / 100) * 107
                }px) rotate(${
                    15 * index + 90
                }deg)`)
                .style('font-family', 'sans-serif')
                .style('fill', '#ffffff');
        });
    });
});
