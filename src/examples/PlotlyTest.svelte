<script>
  import Plotly from "plotly.js";
  import { onMount } from "svelte";

  onMount(() => {
    var data = [
      {
        z: [[1, 20, 30], [20, 1, 60], [30, 60, 1]],
        type: "heatmap"
      }
    ];

    Plotly.newPlot("myDiv", data);
  });
</script>

<div id="myDiv" />