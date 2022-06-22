<script>
  import { onMount, onDestroy } from "svelte";
  import { fetchConsensusDataAll } from "./utils";
  import PlotlyAreaChart from "../../examples/PlotlyAreaChart.svelte";
  import LinearProgress from "../../ui/LinearProgress.svelte";
  // import { Cart } from '../../stores/CartStore';
  import _data from "../../json/main.json";

  let loaded = false;
  let error = undefined;
  let consensusData = [];
  export let combination;
  export let files;


  const SUBFAM = "LTR48B";

  onMount(async () => {
    const { data, repeat } = combination;
    const experiment = _data.experiments.filter(exp => exp.id === data)[0];
    try {
      const res = await fetchConsensusDataAll(experiment, repeat, files);      
      consensusData = res;
      loaded = true;
    } catch (error) {
      console.log(error);
      loaded = false;
      error = error.message;
    }
  });
</script>

{#if loaded}
  {#each consensusData as { fileId, all, unique }, index}
    <PlotlyAreaChart consensusData={[all, unique]} data={fileId} repeat={combination.repeat} {index}/>
  {/each}
  
{:else if error !== undefined}
  <p>{error}</p>
{:else}
  <LinearProgress />
{/if}
