<script>
  // const TEST_DATA = require('../json/test.json');
  import { onMount, onDestroy, afterUpdate, createEventDispatcher } from 'svelte';
  import { Cart } from '../stores/CartStore';
  import Plotly from 'plotly.js';
  // import { combination } from '../stores/HeatmapClick';
  import Switch from '../ui/Switch.svelte';
  // let switchBoolean=false;
  let onlyData = undefined;
  let dataLabels;
  export let propsData;
  export let repeatLabels;
  let TYPE = 'all';
  const dispatch = createEventDispatcher();
  // const unsubscribe = Cart.subscribe(async store => {
  //   const { repeats, data } = store;
  //   repeatNames = repeats.map(d => d.name);
  //   dataNames = TEST_DATA['all'].map(d => d.id);
  //   onlyData = extractRequiredDataPoints(repeatNames);
  // });

  onMount(() => {
    dataLabels = propsData[TYPE].map(d => d.id);
    onlyData = extractRequiredDataPoints(propsData, repeatLabels, TYPE);
    if (onlyData !== undefined) {
      drawHeatMap(onlyData, repeatLabels, dataLabels);
    }
  })

  afterUpdate(() => {
      // if (onlyData !== undefined) {
      //   drawHeatMap(onlyData, repeatNames, dataNames);
      // }
  });

  // onDestroy(unsubscribe);

  function drawHeatMap(z, repeatLabels, dataLabels) {
    let myPlot = document.getElementById('myDiv');
    const data = [
    {
      z: z,
      x: repeatLabels,
      y: dataLabels,
      type: 'heatmap'
    }
    ];

    Plotly.newPlot('myDiv', data, {responsive: true, margin: { l: 100, b: 40, r: 18, t: 15 }});

    myPlot.on('plotly_click', function(data){
      var pts = {};
      for(var i=0; i < data.points.length; i++){
          pts.x = data.points[i].x;
          pts.y = data.points[i].y;
      }
      dispatch('heatmap-click', { data: pts.y, repeat: pts.x }); // TODO: a store should be informed about this click so the view can changed
    });
  }

  function extractRequiredDataPoints(DATA, repeats, TYPE) {
    const toReturn = DATA[TYPE].map(row => {
      let tmp = [];
      repeats.forEach(element => {
        tmp.push(row[element]);
      });
      return tmp;
    });

    if (toReturn[0].length === 0) {
      return undefined;
    } else {
      return toReturn;
    }
  }
</script>

<!-- <style>-->
<!--  #myDiv {-->
<!--    margin: 2rem;-->
<!--    padding-left: 2rem;-->
<!--  }-->
<!--</style>-->

<div>
  <div id="myDiv"></div>
  <!-- <Switch bind:checked={switchBoolean}></Switch> -->
</div>

