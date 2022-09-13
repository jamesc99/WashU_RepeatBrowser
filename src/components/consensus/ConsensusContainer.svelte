<script>
  import { onMount, onDestroy } from "svelte";
  import {fetchConsensusData, fetchConsensusDatabyZarr} from "./utils";
  import PlotlyAreaChart from "../../examples/PlotlyAreaChart.svelte";
  import LinearProgress from "../../ui/LinearProgress.svelte";
  import debug_data from "../../json/subfam_stat_debug.json";
  import { Cart } from '../../stores/CartStore';
  let loaded = false;
  let error = undefined;
  // let consensusData = undefined;
  let consensusData_list = [];
  export let combination;


  const SUBFAM = "LTR48B";

  onMount(async () => {
    const { data, repeat } = combination;
    const dataFile = $Cart.data.filter(file => file.File_accession === data);
    try {
      // const res = await fetchConsensusData(dataFile, repeat);
      // const debug_file = debug_data.files;
      console.log(dataFile);
      const res = await fetchConsensusDatabyZarr(dataFile, repeat);
      console.log(res);
      consensusData_list = res;
      loaded = true;
    } catch (error) {
      console.log(error);
      loaded = false;
      error = error.message;
    }
  });
</script>

{#if loaded}
  {#each consensusData_list as consensusData, index}
    <PlotlyAreaChart consensusData={[consensusData.all, consensusData.unique]} data={consensusData.fileId} repeat={combination.repeat} {index}/>
  {/each}
{:else if error !== undefined}
  <p>{error}</p>
{:else}
  <LinearProgress />
{/if}
