<script>
  // your script goes here
  import { onMount, onDestroy } from 'svelte';
  import { Cart } from '../stores/CartStore';
  import PlotlyHeatmapSimple from './PlotlyHeatmapSimple';
  import {getDataMatrix, makeClusterServerRequest, getDataMatrixSingle, getDataMatrix_debug} from '../api/ratio';
  import ClusterDraw from '../components/Clusterdraw.svelte';
  import LinearProgress from "../ui/LinearProgress.svelte";
  import debug_data from "../json/subfam_stat_debug.json";

  // import DATA from '../json/test.datahubs.json';
  let dataPromise;
  let heatmapData;
  let clusterPromise;
  let clusterData;
  export let files;

  const unsubscribe = Cart.subscribe(async store => {
    const { data, repeats } = store;
    // if (data.length > 0 && repeats.length > 0) {
    if (repeats.length > 0) {
      // dataPromise = getDataMatrix(data, files, repeats.map(d => d.name));
      dataPromise = getDataMatrix_debug(debug_data.files, repeats.map(r => r.name));
      heatmapData = await dataPromise;
      //console.log('heatmapData: ' + dataPromise);
      // const dataFrame = JSON.stringify(heatmapData);
      // clusterPromise = makeClusterServerRequest(dataFrame);
      // clusterData = await clusterPromise;
    }
  });

  onDestroy(() => {
    unsubscribe();
  });

  onMount(() => {
    // console.log(DATA);
  });
</script>

<style>
  /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->

{#if dataPromise !== undefined}
{#await dataPromise}
  <LinearProgress/>
{:then heatmapData}
  <p>raw data loaded!</p>
  <PlotlyHeatmapSimple on:heatmap-click DATA={heatmapData}/>
{:catch error}
  Some error has occured retreiving data
{/await}
{/if}
<!-- 
{#if clusterPromise !== undefined}
  {#await clusterPromise}
    loading ...
  {:then clusterData}
    clustered data loaded!
    <ClusterDraw data={clusterData.data.data}/>
  {:catch error}
    Some error has occured during cluster step.
  {/await}
{/if} -->
