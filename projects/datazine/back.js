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
    const sources = [...new Set(data.map(entry => entry.source).filter(entry => entry !== ''))];
    const colorSets = [];
    sources.map(source => {
        colorSets.push([...new Set(data.filter(entry => entry.source === source).map(entry => entry.color))]);
    });
    svg.append('text')
        .text('Object\'s Color Variation')
        .style('transform', 'translate(50px, 100px)')
        .style('font-family', '\'Akaya Kanadaka\', cursive')
        .style('font-size', 36)
        .style('fill', '#F86BE3')
        .style('text-shadow', '0 0 5px ' + '#FFE89D');
    for (let i = 0; i < sources.length; i++) {
        let group = svg.append('g')
            .style('transform', `translate(55px, ${150 + 25 * i}px)`);
        group.append('text')
            .text(sources[i])
            .style('font-family', '\'Akaya Kanadaka\', cursive')
            .style('font-size', 18)
            .style('fill', '#262626')
            .style('text-shadow', '0 0 4px ' + '#c4c4ba');
        colorSets[i].map((color, index) => {
            group.append('rect')
                .attr('width', 15)
                .attr('height', 15)
                .attr('fill', colorMap[color])
                .style('transform', `translate(${15 * index + 150}px, -11px)`);
        });
    }
    svg.append('text')
        .text('Legends')
        .style('transform', 'translate(550px, 100px)')
        .style('font-family', '\'Akaya Kanadaka\', cursive')
        .style('font-size', 36)
        .style('fill', '#F86BE3')
        .style('text-shadow', '0 0 5px ' + '#FFE89D');
    // draw LHS pattern
    let group = svg.append('g')
        .style('transform', `translate(700px, 300px)`);
    // center circle cascading
    const dayData = data.slice(5 * 24, 6 * 24);
    dayData.filter(entry => entry.conscious === 'yes')
        .map((entry, index) => {
            // create gradient
            const gradId = `leftBigGrad-${index.toString()}`;
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
    // draw RHS pattern
    group = svg.append('g')
        .style('transform', `translate(1000px, 600px)`);
    // center circle
    // create gradient
    const gradId = `rightBigGrad-0`;
    const grad = defs.append('radialGradient')
        .attr('id', gradId);
    grad.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#ffffff')
        .attr('stop-opacity', 0.5);
    grad.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', colorMap["blue"]);
    // apply gradient
    group.append('circle')
        .attr('r', 70)
        .attr('fill', `url(#${gradId})`)
        .attr('stroke', '#929292')
        .attr('stroke-width', 2);
    // count in each day
    const freq = [
        5, 0, 0, 0,
        1, 2, 3, 4,
        2, 2, 0, 0,
        0, 0, 0, 0,
        1, 2, 3, 4,
        2, 2, 0, 0.
    ];
    const heightScale = d3.scaleLinear()
        .domain([0, 5])
        .range([10, 100]);
    const colorScale = d3.scaleLinear()
        .domain([-3, 3])
        .range(['#ffffff', colorMap["blue"]]);
    freq.map((freqEntry, index2) => {
        group.append('rect')
            .attr('height', heightScale(freqEntry))
            .attr('width', 10)
            .attr('fill', colorScale(freqEntry))
            .attr('stroke', '#929292')
            .style('transform', `translate(${
                Math.cos(-Math.PI / 2 + Math.PI / 12 * index2 - Math.PI / 100) * 70
            }px, ${
                Math.sin(-Math.PI / 2 + Math.PI / 12 * index2 - Math.PI / 100) * 70
            }px) rotate(${
                15 * index2 + 180
            }deg)`);
    });
    // draw comments
    svg.append('line')
        .attr('x1', 764)
        .attr('y1', 150)
        .attr('x2', 850)
        .attr('y2', 100)
        .attr('stroke', '#000000');
    svg.append('text')
        .text('What colors I saw on February 23rd?')
        .style('transform', 'translate(850px, 100px)')
        .style('font-family', '\'Akaya Kanadaka\', cursive')
        .style('font-size', 18)
        .style('fill', '#000000')
        .style('text-shadow', '0 0 5px ' + '#FFE89D');


    svg.append('line')
        .attr('x1', 701)
        .attr('y1', 179)
        .attr('x2', 850)
        .attr('y2', 151)
        .attr('stroke', '#000000');
    svg.append('text')
        .text('Saw white from screen at 0 o\'clock')
        .style('transform', 'translate(850px, 151px)')
        .style('font-family', '\'Akaya Kanadaka\', cursive')
        .style('font-size', 18)
        .style('fill', '#000000')
        .style('text-shadow', '0 0 5px ' + '#FFE89D');

    svg.append('line')
        .attr('x1', 580)
        .attr('y1', 300)
        .attr('x2', 850)
        .attr('y2', 200)
        .attr('stroke', '#000000');
    svg.append('text')
        .text('Saw blue from car at 18 o\'clock')
        .style('transform', 'translate(850px, 200px)')
        .style('font-family', '\'Akaya Kanadaka\', cursive')
        .style('font-size', 18)
        .style('fill', '#000000')
        .style('text-shadow', '0 0 5px ' + '#ffe89d');

    svg.append('line')
        .attr('x1', 820)
        .attr('y1', 298)
        .attr('x2', 850)
        .attr('y2', 249)
        .attr('stroke', '#000000');
    svg.append('text')
        .text('Didn\'t record the color because')
        .style('transform', 'translate(850px, 249px)')
        .style('font-family', '\'Akaya Kanadaka\', cursive')
        .style('font-size', 18)
        .style('fill', '#000000')
        .style('text-shadow', '0 0 5px ' + '#ffe89d');
    svg.append('text')
        .text('I was sleeping at 6 o\'clock')
        .style('transform', 'translate(850px, 265px)')
        .style('font-family', '\'Akaya Kanadaka\', cursive')
        .style('font-size', 18)
        .style('fill', '#000000')
        .style('text-shadow', '0 0 5px ' + '#ffe89d');

    svg.append('line')
        .attr('x1', 706)
        .attr('y1', 306)
        .attr('x2', 850)
        .attr('y2', 350)
        .attr('stroke', '#000000');
    svg.append('text')
        .text('The average of the colors saw this day')
        .style('transform', 'translate(850px, 350px)')
        .style('font-family', '\'Akaya Kanadaka\', cursive')
        .style('font-size', 18)
        .style('fill', '#000000')
        .style('text-shadow', '0 0 5px ' + '#ffe89d');

    svg.append('line')
        .attr('x1', 1005)
        .attr('y1', 606)
        .attr('x2', 792)
        .attr('y2', 525)
        .attr('stroke', '#000000');
    svg.append('text')
        .text('How frequent the color blue appear among these days?')
        .style('transform', 'translate(380px, 525px)')
        .style('font-family', '\'Akaya Kanadaka\', cursive')
        .style('font-size', 18)
        .style('fill', '#000000')
        .style('text-shadow', '0 0 5px ' + '#ffe89d');

    svg.append('line')
        .attr('x1', 906)
        .attr('y1', 583)
        .attr('x2', 792)
        .attr('y2', 650)
        .attr('stroke', '#000000');
    svg.append('text')
        .text('How frequent the color blue appear at 19 o\'clock?')
        .style('transform', 'translate(430px, 650px)')
        .style('font-family', '\'Akaya Kanadaka\', cursive')
        .style('font-size', 18)
        .style('fill', '#000000')
        .style('text-shadow', '0 0 5px ' + '#ffe89d');

    svg.append('line')
        .attr('x1', 1144)
        .attr('y1', 631)
        .attr('x2', 792)
        .attr('y2', 700)
        .attr('stroke', '#000000');
    svg.append('text')
        .text('How frequent the color blue appear at 8 o\'clock?')
        .style('transform', 'translate(430px, 700px)')
        .style('font-family', '\'Akaya Kanadaka\', cursive')
        .style('font-size', 18)
        .style('fill', '#000000')
        .style('text-shadow', '0 0 5px ' + '#ffe89d');
});