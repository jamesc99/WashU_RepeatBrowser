<script>
  import { onMount, onDestroy } from 'svelte';
  import { Cart } from '../stores/CartStore';
  import { getDataForHeatmapAll, getZarrForHeatmapAll } from '../api/heatmap';
  import LinearProgress from '../ui/LinearProgress.svelte';
  import PlotlyHeatmap from './PlotlyHeatmap.svelte';
  import debug_data from "../json/subfam_stat_debug.json";
  let dataPromise;
  let heatmapData;
  let repeatLabels;
  let loaded = false;
  
  const unsubscribe = Cart.subscribe(async store => {
    loaded = false;
    const { data, repeats } = store;
    repeatLabels = repeats.map(d => d.name);
    if (data.length > 0 && repeats.length > 0) {
      //dataPromise = getDataForHeatmapAll(data, 'subfamStat', repeats);
      dataPromise = getZarrForHeatmapAll(debug_data.files, 'Zarr', repeats);
      heatmapData = await dataPromise;
      loaded = true;
    }
  });
  
  onDestroy(unsubscribe);

</script>

{#await dataPromise}
  <LinearProgress/>
{:then heatmapData}
  {#if loaded}
    <PlotlyHeatmap on:heatmap-click propsData={heatmapData} repeatLabels={repeatLabels}/>
  {/if}
{:catch error}
  Some error has occured!
{/await}