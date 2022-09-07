<script>
    import { onMount, afterUpdate } from 'svelte';
    import * as fc from 'd3fc';
    import * as d3 from 'd3';
    export let chartId;
    export let width;
    export let height;
    export let data;

    const yExtent = fc.extentLinear().accessors([d => d.high, d => d.low]).pad([0.1, 0.1]);
    const xExtent = fc.extentDate().accessors([d => d.date]);

    const multi = fc.seriesSvgMulti()
        .series([fc.annotationSvgGridline(), fc.seriesSvgCandlestick()]);

    const renderChart = () => {
        const chart = fc
            .chartCartesian(d3.scaleTime(), d3.scaleLinear())
            .svgPlotArea(multi)
            .xDomain(xExtent(data))
            .yDomain(yExtent(data));

        d3.select(`#${chartId}`)
            .datum(data)
            .call(chart);
    }

    afterUpdate(() => {
        renderChart();
    })
</script>

<div id={chartId} style="width: {width}; height: {height}"></div>