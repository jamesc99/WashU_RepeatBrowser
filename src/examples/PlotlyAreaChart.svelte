<script>
  import { onMount } from "svelte";
  import Plotly from "plotly.js";

  export let consensusData;
  export let data;
  export let repeat;
  export let yrange;
  export let index;

  onMount(() => {
    const [all, unique] = consensusData;
    const trace1 = {
      y: all.map((d, i) => d.score),
      x: all.map((d, i) => i),
      fill: "tonexty",
      type: "scatter",
      mode: "none",
      name: "All reads"
    };

    const trace2 = {
      y: unique.map((d, i) => d.score),
      x: unique.map((d, i) => i),
      fill: "tozeroy",
      type: "scatter",
      mode: "none",
      name: 'Unique reads'
    };

    const layout = {
        yaxis: {
            range: [0, yrange]
        },
        title: `${repeat} - ${data}`
    };

    let _data = [trace1, trace2];

    Plotly.newPlot("area-div" + index, _data, layout);
  });
</script>

<!--<div id="area-divundefined" />-->
<div id="area-div0" />
<div id="area-div1" />
<div id="area-div2" />
<div id="area-div3" />
<div id="area-div4" />
<div id="area-div5" />
