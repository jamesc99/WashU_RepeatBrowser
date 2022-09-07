import * as fc from 'd3fc';
import * as d3 from 'd3';

const data = {
    series: [
        {x: 579, y: 257},
        {x: 562, y: 243},
        {x: 594, y: 244},
        {x: 564, y: 269},
        {x: 571, y: 225},
        {x: 598, y: 266},
        {x: 545, y: 253},
        {x: 597, y: 225},
        {x: 576, y: 284},
        {x: 550, y: 223},
        {x: 614, y: 252}
    ],
    crosshair: []
}

var x = d3.scaleLinear();
var y = d3.scaleLinear();

// secondary scales for the purposes of computing the zoom
var x2 = d3.scaleLinear();
var y2 = d3.scaleLinear();

const xExtent = fc.extentLinear().accessors([d => d.x])
const yExtent = fc.extentLinear().accessors([d => d.y])

var lastY = 0;
var lastX = 0;
var lastK = 1;
var newX, newY;

const zoom = d3.zoom()
    .on('zoom', () => {
        const t = d3.event.transform;

        // ZOOMING
        if (d3.event.sourceEvent && d3.event.sourceEvent.type == "wheel") {

            // rescaling causes jumping
            //x.domain(t.rescaleX(x2).domain());
            //y.domain(t.rescaleY(y2).domain());

            let domainX = x.domain();
            let linearX = d3.scaleLinear().domain(x.range()).range([0, domainX[0] - domainX[1]]);
            let deltaX = linearX((t.x - lastX)/t.k);

            let domainY = y.domain();
            let linearY = d3.scaleLinear().domain(y.range()).range([domainY[1] - domainY[0], 0]);
            let deltaY = linearY((t.y - lastY)/t.k);

            console.log('(', t.y, lastY, ')', deltaY);

            x.domain([domainX[0] + deltaX, domainX[1] - deltaX]);
            y.domain([domainY[0] - deltaY, domainY[1] + deltaY]);
        }

        // PANNING
        if (d3.event.sourceEvent && d3.event.sourceEvent.type != "wheel") {

            let domainX = x.domain();
            let linearX = d3.scaleLinear().domain(x.range()).range([0, domainX[0] - domainX[1]]);
            let deltaX = linearX(t.x - lastX);
            x.domain([domainX[0] + deltaX, domainX[1] + deltaX]);

            let domainY = y.domain();
            let linearY = d3.scaleLinear().domain(y.range()).range([domainY[1] - domainY[0], 0]);
            let deltaY = linearY(t.y - lastY)
            y.domain([domainY[0] + deltaY, domainY[1] + deltaY]);

        }

        lastX = t.x;
        lastY = t.y;
        lastK = t.k;

        render();
    });

const xAxisDrag = d3.drag()
    .on('drag', () => {
        const dx = d3.event.dx;
        const factor = Math.pow(2, -dx * 0.01);

        let domain = x.domain();
        let center = (domain[1] + domain[0]) / 2;
        let size = (domain[1] - domain[0]) / 2 / factor;
        x.domain([center - size, center + size]);
        render();
    });

const yAxisDrag = d3.drag()
    .on('drag', () => {
        const dy = d3.event.dy;
        const factor = Math.pow(2, -dy * 0.01);

        let domain = y.domain();
        let center = (domain[1] + domain[0]) / 2;
        let size = (domain[1] - domain[0]) / 2 / factor;
        y.domain([center - size, center + size]);
        render();

    });

const pointSeries = fc
    .seriesCanvasPoint()
    .crossValue(d => d.x)
    .mainValue(d => d.y)


const multichart = fc.seriesCanvasMulti()
    .series([pointSeries])
    .mapping((data, index, series) => {
        switch(series[index]) {
            case pointSeries:
                return data.series;
            case crosshair:
                return data.crosshair;
        }
    });


const chart = fc.chartCanvasCartesian(x, y)
    .plotArea(multichart)
    .yDecorate((selection, d) => {
        d3.select('#zoom-chart')
            .select('.y-axis')
            .call(yAxisDrag)
    })
    .xDecorate((selection, d) => {
        d3.select('#zoom-chart')
            .select('.x-axis')
            .call(xAxisDrag)

    })
    .decorate((sel) => {
        sel.enter()
            .select('.plot-area')
            .on('measure.range', () => {
                x2.range([0, d3.event.detail.width]);
                y2.range([d3.event.detail.height, 0]);
            })
            .attr('id','floor')
            .call(zoom);
    })
;

function render() {
    d3.select('#zoom-chart')
        .datum(data)
        .call(chart);

}

function updateData() {

    chart
        .xDomain(xExtent(data.series))
        .yDomain(yExtent(data.series));

    x2.domain(chart.xDomain());
    y2.domain(chart.yDomain());

    render();
}

updateData()

