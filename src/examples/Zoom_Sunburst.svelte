<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import VirtualList from 'svelte-tiny-virtual-list';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import IconButton from '@smui/icon-button';
    import {Text} from "@smui/list";

    import { Cart } from '../stores/CartStore';
    import REPEATS from '../json/mm10.subfamilies';
    import Typeahead from "svelte-typeahead";

    let events = [];
    import _flare from '../json/flare.json';
    import _flare2 from '../json/flare-2.json';
    let tooltipNodeRef;
    let uniqueRepeats;
    let nodeRef;

    let repeat_list = [];
    function treeTolist(Tree){
        let list = [];
        let temp_list = [...REPEATS.children];
        let temp_list2 = temp_list.map(x => [...x.children]);
        temp_list2.forEach(value_array => {
            value_array.forEach(value => {
                list.push(...value.children)
                }
            )
        } );
        return list
    }
    const REPEAT_list = treeTolist(REPEATS);

    function handleSelected(input) {
        Cart.addRepeats([...new Set([...$Cart.repeats, ...input.data.children])]);
    }

    function handleChildSelected(input) {
        Cart.addRepeats([...new Set([...$Cart.repeats, input.data])]);
    }

    function recoverSelected(input) {
        const selected_array = [...input.data.children];
        // selected_array.forEach((element) => {
        //     Cart.addRepeats($Cart.repeats.filter(d => d.name !== element.name));
        // })
        Cart.addRepeats($Cart.repeats.filter(r => {
            let repeat_name = r.name;
            let input_names = selected_array.map(e => e.name);

            return input_names.indexOf(repeat_name) === -1;
        }));
    }

    function color_function(input){

    }

    function recoverChildSelected(input) {
        const selected_array = [input.data];
        // selected_array.forEach((element) => {
        //     Cart.addRepeats($Cart.repeats.filter(d => d.name !== element.name));
        // })
        Cart.addRepeats($Cart.repeats.filter(r => {
            let repeat_name = r.name;
            let input_names = input.data.name;

            return input_names.indexOf(repeat_name) === -1;
        }));
    }

    function Sunburst(data, {format = d3.format(",d"), width = 932,
    } = {}) {

        let partition = data => {
            const root = d3.hierarchy(data)
                .sum(d => d.size)
                .sort((a, b) => b.size - a.size);
            return d3.partition()
                .size([2 * Math.PI, root.height + 1])
                (root);
        }

        let radius = width / 6;

        let arc = d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
            .padRadius(radius * 1.5)
            .innerRadius(d => d.y0 * radius)
            .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));

        let color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));


        const root = partition(data);

        root.each(d => d.current = d);

        const svg = d3.select(nodeRef)
            .attr("viewBox", [0, 0, width, width])
            .style("font", "10px sans-serif");

        const g = svg.append("g")
            .attr("transform", `translate(${width / 2},${width / 2})`);

        const path = g.append("g")
            .selectAll("path")
            .data(root.descendants().slice(1))
            .join("path")
            .attr("fill", d => { while (d.depth > 1) d = d.parent; console.log(d.data.name); return color(d.data.name); })
            .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
            .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")
            .attr("d", d => arc(d.current))
            .on("click", function (d) {
                d.noFill = d.noFill || false;
                if (!d.noFill && !d.parent.noFill) {
                    handleChildSelected(d);
                    this.style.fill = "#ccc";
                } else {
                    recoverChildSelected(d);
                    this.style.fill = color(d.parent.parent.data.name);
                }
                d.noFill = !d.noFill;
            });

        let dblclick_timer = false;
        path.filter(d => d.children)
            .style("cursor", "pointer")
            .on("click", function (d) {
                // if double click timer is active, this click is the double click
                if ( dblclick_timer )
                {
                    clearTimeout(dblclick_timer)
                    dblclick_timer = false
                    // double click code code comes here
                    if(d.depth == 2){
                        d.noFill = d.noFill || false;
                        if (!d.noFill) {
                            handleSelected(d);
                            this.style.fill = "#ccc";
                        } else {
                            recoverSelected(d);
                            this.style.fill = color(d.parent.data.name);
                        }
                        d.noFill = !d.noFill;
                    }

                    console.log("double click fired")
                }
                // otherwise, what to do after single click (double click has timed out)
                else dblclick_timer = setTimeout( function(){
                    dblclick_timer = false
                    // single click code code comes here
                    console.log("single click fired")
                    clicked(d)
                }, 300)
            });
            // .on("click", clicked);

        path.append("title")
            .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

        const label = g.append("g")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .style("user-select", "none")
            .selectAll("text")
            .data(root.descendants().slice(1))
            .join("text")
            .attr("dy", "0.35em")
            .attr("fill-opacity", d => +labelVisible(d.current))
            .attr("transform", d => labelTransform(d.current))
            .text(d => d.data.name);


        const parent = g.append("circle")
            .datum(root)
            .attr("r", radius)
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .on("click", clicked);

        function clicked(p) {
            parent.datum(p.parent || root);

            root.each(d => d.target = {
                x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth)
            });

            const t = g.transition().duration(750);

            // Transition the data on all arcs, even the ones that aren’t visible,
            // so that if this transition is interrupted, entering arcs will start
            // the next transition from the desired position.
            path.transition(t)
                .tween("data", d => {
                    const i = d3.interpolate(d.current, d.target);
                    return t => d.current = i(t);
                })
                .filter(function(d) {
                    return +this.getAttribute("fill-opacity") || arcVisible(d.target);
                })
                .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
                .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none")

                .attrTween("d", d => () => arc(d.current));

            label.filter(function(d) {
                return +this.getAttribute("fill-opacity") || labelVisible(d.target);
            }).transition(t)
                .attr("fill-opacity", d => +labelVisible(d.target))
                .attrTween("transform", d => () => labelTransform(d.current));
        }

        const dbclicked = d => {
            if(d.depth == 2){
                d.noFill = d.noFill || false;
                if (!d.noFill) {
                    handleSelected(d);
                    this.style.fill = "#ccc";
                } else {
                    recoverSelected(d);
                    this.style.fill = color(d.ancestors().reverse()[1]?.index);
                }
                d.noFill = !d.noFill;
            }
        }

        function arcVisible(d) {
            return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
        }

        function labelVisible(d) {
            return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
        }

        function labelTransform(d) {
            const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
            const y = (d.y0 + d.y1) / 2 * radius;
            return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        }

        return svg.node();
    }

    let cartRepeats;
    const unsubscribe = Cart.subscribe(async store => {
        const { repeats } = store;
        cartRepeats = repeats;
        console.log(cartRepeats);
    });

    onMount(()=>{
        let chart = Sunburst(REPEATS, {format: d3.format(",d"), width: 932});
    })

</script>


<style>
    .row {
        padding: 0 20px;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        line-height: 50px;
        font-weight: 500;
        background: #fff;
    }

    :global([data-svelte-typeahead]) {
        margin: 1rem;

    }

</style>


<LayoutGrid>
    <Cell span={8}>
        <div class="demo-cell">
            <svg bind:this="{nodeRef}" width=90% height=90%>    </svg>
        </div>
    </Cell>

    <Cell span={4}>
        <div>
            <h2>#Repeats: {cartRepeats.length}</h2>
<!--            <VirtualList-->
<!--                    height={200}-->
<!--                    width = 'auto'-->
<!--                    itemCount={cartRepeats.length}-->
<!--                    itemSize={50}>-->
<!--                <div slot="item" let:index let:style {style} class="row">-->
<!--                    <Text> {cartRepeats[cartRepeats.length - 1 - index].name} </Text>-->
<!--                </div>-->
<!--            </VirtualList>-->
            <VirtualList
                    height={200}
                    width="auto"
                    itemCount={cartRepeats.length}
                    itemSize={50}>
                <div slot="item" let:index let:style {style} class="row">
            <span>
                <IconButton class="material-icons"
                            on:click={() =>
                            Cart.addRepeats($Cart.repeats.filter(d => d.name !== cartRepeats[cartRepeats.length - 1 - index].name))}>
                cancel</IconButton>
                Subfamilies: {cartRepeats[cartRepeats.length - 1 - index].name}
            </span>
                    <!--            <Text>{cartRepeats[cartRepeats.length - 1 - index].name}</Text>-->
                </div>
            </VirtualList>

            <hr>

            <h2>Repeats Search</h2>
            <Typeahead
                    label="Repeats Search"
                    hideLabel
                    placeholder={`Search Repeats (e.g. "MER125")`}
                    data={REPEAT_list}
                    extract={(item) => item.name}
                    on:select={({ detail }) => {
                        console.log(detail);
                        Cart.addRepeats([...new Set([...$Cart.repeats, detail.original])]);
                    }}
                    on:clear={() => events = [...events, "clear"]}
            />
            <hr>

        </div>
    </Cell>
</LayoutGrid>

