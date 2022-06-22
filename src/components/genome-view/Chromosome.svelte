<script>
  import { onMount, afterUpdate } from "svelte";
  import * as d3 from 'd3';

  const screenWidth = 1000;
  const screenHeight = 500;
  let node;
  export let chr;
  export let data;
  let filteredData;
  export let cutoff;
  import CHROMOSOMES_LENGTH from '../../json/chromosomes_length.json'
  const chrLength = CHROMOSOMES_LENGTH[chr];

const xScale = d3.scaleLinear()
            .domain([0, 249250621])
            .range([0, screenWidth / 2]);

  onMount(() => {
    // filteredData = filterAboveCutoff(data);
    
        
        d3.select(node)
            .selectAll("rect.bar")
            .data([chrLength])
            .enter()
            .append("rect")
            .attr("class", "bar")
            // .style("fill", "rgba(0,149,255, 1)")

        d3.select(node)
            .selectAll("rect.bar")
            .data([chrLength])
            .attr("x", 50)
            .attr("width", d => xScale(d) + 10)
            .attr("height", 22)
            .style("fill", "rgba(0,149,255, .2)")

    createChromosomeBody();
  });

  afterUpdate(() => {
    
    // filteredData = filterAboveCutoff(data);
    createChromosomeBody();
  });

  function filterAboveCutoff() {
      return data.filter(d => d.RPKM > cutoff)
  }

  function createChromosomeBody() {
        
        d3.select(node).selectAll(".chrBand").remove(); // flush clean

        let div = d3.select('#genome-tooltip')	
                .attr("class", "tooltip")				
                .style("opacity", 0);

        d3.select(node)
            .append('g')
            .selectAll('chrBands')
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
                return xScale(d.start) + 55;
            })
            .attr("y", -4)
            .attr("height", 25)
            .attr("width", 1)
            // .attr('class', 'chrBand')
            // .style("fill", "#FCBC34")
            .style("fill", function (d, i) {
                if (d.RPKM > 0) {
                    return "#ff0000"
                } else {
                    return "#3232FF"
                }
            })
            .on("mouseover", function(d) {	
                d3.select(this)
                    .attr("width", 5)
                    .attr("height", 35);
                d3.select(this)
                    .style("cursor", "pointer");
                div.transition()		
                    .duration(100)		
                    .style("opacity", 1);
                // div.html("Position : <strong>" + d.start + "</strong><br/>" + "Score : <strong>" + d.RPKM.toFixed(2)) + "</strong>"
                div.html("Position : " + d.start + "<br/>" + "Score : " + d.RPKM.toFixed(2))
                    .style("left", (d3.event.pageX + 25) + "px")		
                    .style("top", (d3.event.pageY - 28) + "px");	
                })					
            .on("mouseout", function(d) {	
                d3.select(this)
                    .attr("width", 1)
                    .attr("height", 25)
                    .style("cursor", "default");	
                div.transition()		
                    .duration(100)		
                    .style("opacity", 0);	
            });
  }

</script>
<div>
    <svg bind:this={node} width={CHROMOSOMES_LENGTH[chr]} height="40">
            <defs>
                <linearGradient id="MyGradient">
                    <stop offset="5%" stopColor="#99fddd"/>
                    <stop offset="95%" stopColor="#FCBC34"/>
                </linearGradient>
            </defs>
            <text x="10" y="15">{chr}</text>
        </svg>
</div>


<!-- <style>
.logo-wrapper svg {
  fill: green;
  /* background-color: blueviolet; */
} 
</style>-->