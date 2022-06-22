<script>
  import { onMount } from "svelte";
  import Chromosome from "./Chromosome.svelte";
  import Slider from "../../ui/Slider.svelte";
  import Button from "@smui/button";
  import uuid from "uuid";
  import LinearProgress from "../../ui/LinearProgress.svelte";
  import { Cart } from "../../stores/CartStore";
  import { createSession } from './createSession';


  import { filterDataAboveCutoff } from "./helper";
  import { fetchRPKMTabixChrAll } from "./helper-flat";
  import fileDownload from 'js-file-download';

  //let { experiment, subfam } // comes from URL params
  const experiment = "ENCSR658AGP";
  const subfam = "LTR48B";
  const DATAHUB_MONGO_API =
    "https://5dum6c4ytb.execute-api.us-east-1.amazonaws.com/dev/datahub";
  let dataToRender;
  let loaded = false;
  let error = undefined;
  let sliderValue = 0;
  export let combination;
  let sessionFile = undefined;
  let UUID;

  // let data;

  function handleSliderValue(value) {
    sliderValue = value.detail;
  }

  function handleDownload() {
    const UUID = uuid.v4();
    let selectedData = filterDataAboveCutoff(data, sliderValue);

    //   fileDownload(sessionFile, `${UUID}_region_sets.json`);
  }

  function handleSessionDownload() {
    fileDownload(sessionFile, `${UUID}_region_sets.json`);
  }

  onMount(async () => {
    UUID = uuid.v4(); 

    const { data, repeat } = combination;
    // console.log(data, repeat);
    // fetch(`${DATAHUB_MONGO_API}/${experiment}-${subfam}`) // pre-saved data from MONGO
    // .then(res => {
    //   if (!res.ok) {
    //     throw new Error(`Error fetching data for ${experiment}-${subfam}`);
    //   }

    //   return res.json();
    // })
    // .then(res => {
    //   data = res;
    //   console.log(data);
    //   loaded = true;
    // })
    // .catch(err => {
    //   console.log(err);
    //   loaded = false;
    //   });
    const URL = $Cart.data.filter(file => file.File_accession === data)[0].subfamLoci;

    try {
      dataToRender = await fetchRPKMTabixChrAll(data, repeat, URL);
      console.log(dataToRender);
      loaded = true;
      let result = [];
      dataToRender.forEach(chr => {
        result.push({
          key: chr.key,
          values: chr.values
        });
      });

      sessionFile = createSession(result, 10, repeat, UUID);
    } catch (error) {
      console.log(error);
      error = error.message;
      loaded = false;
    }

  });
</script>


<div>
  {#if sessionFile !== undefined}
    <Button on:click={handleSessionDownload}> Download Region Set </Button>
  {/if}
  {#if loaded}
    <!-- <Slider on:slider-move={handleSliderValue} extent={data.extent} />-->
    <div class="tooltip" id="genome-tooltip" />
    {#each dataToRender as item, i}
      <Chromosome key={item.key} chr={item.key} data={item.values} />
    {/each}
  {:else if error !== undefined}
    <p>{error}</p>
  {:else}
    <LinearProgress />
  {/if}
</div>


<style>
  :global(.tooltip) {
    position: absolute;
    text-align: center;
    display: flex;
    justify-content: start;
    align-content: center;
    width: 130px;
    height: 45px;
    padding: 18px;
    /* margin-top: -20px; */
    font: 15px sans-serif;
    background: #ddd;
    pointer-events: none;
  }
</style>