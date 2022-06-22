<script>
  import { onMount, onDestroy } from "svelte";
  import fetchConsensusData from "./utils";
  import PlotlyAreaChart from "../../examples/PlotlyAreaChart.svelte";
  import LinearProgress from "../../ui/LinearProgress.svelte";
  import { Cart } from '../../stores/CartStore';
  let loaded = false;
  let error = undefined;
  let consensusData = undefined;
  export let combination;


  const SUBFAM = "LTR48B";

  onMount(async () => {
    const { data, repeat } = combination;
    const dataFile = $Cart.data.filter(file => file.File_accession === data);
    try {
      const res = await fetchConsensusData(dataFile, repeat);
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
  <PlotlyAreaChart consensusData={[consensusData.all, consensusData.unique]} data={combination.data} repeat={combination.repeat} index={0} />
{:else if error !== undefined}
  <p>{error}</p>
{:else}
  <LinearProgress />
{/if}
