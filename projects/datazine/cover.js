const svg = d3.select('svg')
    .style('width', '100%')
    .style('height', '100%')
    .style('background-color', '#90E060');

svg.append('text')
    .text('What')
    .style('transform', 'translate(130px, 275px)')
    .style('font-family', '\'Akaya Kanadaka\', cursive')
    .style('font-size', 100)
    .style('fill', '#000000')
    .style('text-shadow', '0 0 5px ' + '#ffe89d');

const xTransScale = d3.scaleLinear()
    .domain([1,5])
    .range([400, 600]);
svg.append('text')
    .text('C')
    .style('transform', `translate(${xTransScale(1)}px, 275px)`)
    .style('font-family', '\'Akaya Kanadaka\', cursive')
    .style('font-size', 100)
    .style('fill', '#F8352A')
    .style('text-shadow', '0 0 5px ' + '#ffe89d');
svg.append('text')
    .text('o')
    .style('transform', `translate(${xTransScale(2)+10}px, 275px)`)
    .style('font-family', '\'Akaya Kanadaka\', cursive')
    .style('font-size', 100)
    .style('fill', '#6026E0')
    .style('text-shadow', '0 0 5px ' + '#ffe89d');
svg.append('text')
    .text('l')
    .style('transform', `translate(${xTransScale(3)}px, 275px)`)
    .style('font-family', '\'Akaya Kanadaka\', cursive')
    .style('font-size', 100)
    .style('fill', '#004abb')
    .style('text-shadow', '0 0 5px ' + '#ffe89d');
svg.append('text')
    .text('o')
    .style('transform', `translate(${xTransScale(4)-20}px, 275px)`)
    .style('font-family', '\'Akaya Kanadaka\', cursive')
    .style('font-size', 100)
    .style('fill', '#396c11')
    .style('text-shadow', '0 0 5px ' + '#ffe89d');
svg.append('text')
    .text('r')
    .style('transform', `translate(${xTransScale(5)-20}px, 275px)`)
    .style('font-family', '\'Akaya Kanadaka\', cursive')
    .style('font-size', 100)
    .style('fill', '#FFA800')
    .style('text-shadow', '0 0 5px ' + '#ffe89d');

svg.append('text')
    .text('Did I Saw?')
    .style('transform', 'translate(650px, 275px)')
    .style('font-family', '\'Akaya Kanadaka\', cursive')
    .style('font-size', 100)
    .style('fill', '#000000')
    .style('text-shadow', '0 0 5px ' + '#ffe89d');
