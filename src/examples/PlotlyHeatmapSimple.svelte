<script>
  import { onMount, onDestroy, afterUpdate, createEventDispatcher } from 'svelte';
  import Plotly from 'plotly.js';
  // import DATA from '../json/dataframe.json';
  export let DATA;
  onMount(() => {
    drawHeatMap(DATA);
  });

  const dispatch = createEventDispatcher();

  function drawHeatMap(input) {
    const { data, colLabels, rowNames } = input;
    console.log(data);
    let myPlot = document.getElementById('myDiv');
    const dataDisplay = [
    {
      z: data,
      x: colLabels,
      y: rowNames,
      type: 'heatmap'
    }
    ];
    

    Plotly.newPlot('myDiv', dataDisplay, {displayModeBar: false, margin: { l: 100, b: 40, r: 18, t: 15 }}, {responsive: true});

    myPlot.on('plotly_click',
        function(data){
          var pts = {};
          for(var i=0; i < data.points.length; i++){
              pts.x = data.points[i].x;
              pts.y = data.points[i].y;
          };
          dispatch('heatmap-click', {data: pts.y, repeat: pts.x});
        });
  }
</script>

<style>
  /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->
<div id="myDiv"></div>
