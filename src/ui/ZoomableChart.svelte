<script>
    import * as d3 from 'd3';
    import {onMount, afterUpdate} from 'svelte';
    let nodeRef;
    export let data;
    console.log(data);
    // let data = [{'start': 36310328, 'end': 36310479, 'RPKM': 2.236}];

    let data_test = [{"Sepal_Length": 5.1, "Sepal_Width": 3.5, "Petal_Length": 1.4,"Petal_Width":0.2 ,"Species": "setosa"}]

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    onMount(() =>{
        d3.select(nodeRef).selectAll().remove();
        // append the SVG object to the body of the page
        var SVG = d3.select(nodeRef)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        // Add X axis
        var x = d3.scaleLinear()
            .domain([36310200, 36310500])
            .range([ 0, width]);
        let axis_x = d3.axisBottom(x);
        axis_x.ticks(5);
        var xAxis = SVG.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(axis_x);

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 3])
            .range([ height, 0]);
        var yAxis = SVG.append("g")
            .call(d3.axisLeft(y));

        // Add a clipPath: everything out of this area won't be drawn.
        var clip = SVG.append("defs").append("SVG:clipPath")
            .attr("id", "clip")
            .append("SVG:rect")
            .attr("width", width )
            .attr("height", height )
            .attr("x", 0)
            .attr("y", 0);

        // Create the scatter variable: where both the circles and the brush take place
        var scatter = SVG.append('g')
            .attr("clip-path", "url(#clip)");

        // Add circles
        scatter
            .selectAll("genome")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.start); } )
            .attr("y", function (d) { return y(d.RPKM); } )
            .attr("width", function(d){return x(d.end) - x(d.start)})
            .attr("height", 10)
            .style("fill", "#61a3a9")
            .style("opacity", 0.5);

        // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
        var zoom = d3.zoom()
            .scaleExtent([.5, 20])  // This control how much you can unzoom (x0.5) and zoom (x20)
            .extent([[0, 0], [width, height]])
            .on("zoom", function(event, d){updateChart(event)});

        // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
        SVG.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .call(zoom);
        // now the user can zoom and it will trigger the function called updateChart

        // A function that updates the chart when the user zoom and thus new boundaries are available
        function updateChart(event) {
            // recover the new scale
            var newX = event.transform.rescaleX(x);
            var newY = event.transform.rescaleY(y);
            let newaxis_x = d3.axisBottom(newX);
            newaxis_x.ticks(5);
            // update axes with these new boundaries
            xAxis.call(newaxis_x)
            yAxis.call(d3.axisLeft(newY))

            // update circle position
            scatter
                .selectAll("rect")
                .attr('x', function(d) {return newX(d.start)})
                .attr('y', function(d) {return newY(d.RPKM)})
                .attr("width", function(d){ return newX(d.end) - newX(d.start)})
                .attr("height", 10);;
        }
    })


</script>

<div>
    <svg bind:this="{nodeRef}" width=1800 height=800>

    </svg>
</div>
