<script>
import { onMount } from 'svelte';
import * as d3 from 'd3';

import { Cart } from '../stores/CartStore';
import REPEATS from '../json/mm10.subfamilies';
let tooltipNodeRef;
let uniqueRepeats;
let nodeRef;
function handleSelected(input) {
  Cart.addRepeats([...new Set([...$Cart.repeats, ...input.data.children])]);
}

onMount(() => {
        // const selectionCB = this.handleSelected
        // const selectionState = this.state.selectedFam
        let div = d3.select(tooltipNodeRef)
            .attr("class", "tooltip")
            .attr("transform", "translate(" + diameter  + "," + diameter  + ")")
            .style("opacity", 0);

        var svg = d3.select(nodeRef),
            margin = 10,
            diameter = +svg.attr("height")

        svg.selectAll('g').remove()

        var g = svg
                .append("g")
                .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
                
        var color = d3.scaleLinear()
            .domain([-1, 5])
            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
            .interpolate(d3.interpolateHcl);

        var pack = d3.pack()
            .size([
                diameter - margin,
                diameter - margin
            ])
            .padding(2);

        let root = d3.hierarchy(REPEATS)
            .sum(function (d) {
                return d.size;
            })
            .sort(function (a, b) {
                return b.value - a.value;
            });

        var focus = root,
            nodes = pack(root).descendants(),
            view;

        var circle = g
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("class", function (d) {
                return d.parent
                    ? d.children
                        ? "node"
                        : "node node--leaf"
                    : "node node--root";
            })
            .style("fill", function (d) {
                return d.children
                    ? color(d.depth)
                    : null;
            })
            .on("click", function (d) {
                if (focus === d) {

                    if (d.depth !== 1 && !event.shiftKey) {
                        let selectedToggle = handleSelected(d)
                        if (selectedToggle) {
                            this.style.fill = "rgb(71, 166, 190)"
                        } else {
                            this.style.fill = "rgb(247, 191, 7)"
                        }
                    }
                }

                if (focus !== d && d.data.children) {
                    zoom(d)
                    event.stopPropagation()
                }

                if (focus !== d && !d.data.children) {
                    let selectedToggle = handleSelected(d)
                    if (!selectedToggle) {
                        this.style.fill = "rgb(255, 255, 255)"
                    } else {
                        this.style.fill = "rgb(185, 185, 185)"
                    }
                }
            })
            .on("mouseover", function (d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(d.data.name)
                    // .style("left", (event.pageX) + "px")
                    // .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        var text = g.selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .attr("class", "label-node")
            .style("fill-opacity", function (d) {
                return d.parent === root
                    ? 1
                    : 0;
            })
            .style("display", function (d) {
                return d.parent === root
                    ? "inline"
                    : "none";
            })
            .text(function (d) {
                return d.data.name;
            });

        var node = g.selectAll("circle,text");

        svg
            .style("background", color(-1))
            .on("click", function () {
                if (event.shiftKey) {
                    zoom(root);
                }
            });

        zoomTo([
            root.x, root.y, root.r * 2 + margin
        ]);

        function zoom(d) {
            var focus0 = focus;
            focus = d;

            var transition = d3.transition()
                .duration(event.altKey
                    ? 2500
                    : 750)
                .tween("zoom", function (d) {
                    var i = d3.interpolateZoom(view, [
                        focus.x, focus.y, focus.r * 2 + margin
                    ]);
                    return function (t) {
                        zoomTo(i(t));
                    };
                });

            // transition.selectAll("text")
            //     .filter(function (d) {
            //         return d.parent === focus || this.style.display === "inline";
            //     })
            //     .style("fill-opacity", function (d) {
            //         return d.parent === focus
            //             ? 1
            //             : 0;
            //     })
            //     .on("start", function (d) {
            //         if (d.parent === focus) 
            //             this.style.display = "inline";
            //         }
            //     )
            //     .on("end", function (d) {
            //         if (d.parent !== focus) 
            //             this.style.display = "none";
            //         }
            //     );
        }

        // let resetButton = d3.select(this.resetRef)
        //     .on("click", function () {
        //             zoom(root);
        //     });

        function zoomTo(v) {
            var k = diameter / v[2];
            view = v;
            node.attr("transform", function (d) {
                return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
            });
            circle.attr("r", function (d) {
                return d.r * k;
            });
        }
});


</script>

<div>
  <div id="tooltip" bind:this="{tooltipNodeRef}"></div>
  <svg bind:this="{nodeRef}" width=800 height=800></svg>
</div>
