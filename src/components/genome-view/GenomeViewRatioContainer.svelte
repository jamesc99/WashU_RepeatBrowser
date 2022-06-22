<script>
  import { onMount, beforeUpdate } from "svelte";
  import Button from "@smui/button";
  import LinearProgress from "../../ui/LinearProgress.svelte";
  import Chromosome from "./Chromosome.svelte";
  // import { Cart } from "../../stores/CartStore";
  import _data from "../../json/main.json";


  // import EXPERIMENT from '../../json/ratio_experiment.json';
  // const SUBFAM = 'L1MB3';
  import { experimentToChrData, calcRatioForALocation } from "./ratio-helper";
  import { createSession } from "./createSession";
  import CHROMOSOMES from "../../json/chromosomes.json";
  import uuid from "uuid";
  import fileDownload from "js-file-download";
  export let combination;
  // export let files;
  let sessionFile = undefined;
  let dataToRender;
  let loaded = false;
  let error = false;
  let UUID;
  let EXPERIMENT;
  let SUBFAM;
  let dataInStore;
  let repeatsInStore;
  let files;

  /*
  1. experimentToChrData
  2. calcRatioForALocation
  3. calcExtentAll
  4. prepare POST object
  5. Post to MongoDB
  */

  function handleSessionDownload() {
    fileDownload(sessionFile, `${UUID}_region_sets.json`);
  }

  onMount(() => {
    const experimentId = combination.data;
    SUBFAM = combination.repeat;
    EXPERIMENT = _data.experiments.filter(experiment => experiment.id === experimentId)[0];
    let allFiles = [];
    let repFiles = [];
    let cntlFiles = [];

    if (EXPERIMENT.hasOwnProperty('Replicates')) {
      repFiles = _data.files.filter((el) => {
        return EXPERIMENT.Replicates.some((f) => {
          return f === el.File_accession;
        });
      });
    }
    if (EXPERIMENT.hasOwnProperty('Controls')) {
      cntlFiles = _data.files.filter((el) => {
        return EXPERIMENT.Controls.some((f) => {
          return f === el.File_accession;
        });
      });
    }

    allFiles = [...repFiles, ...cntlFiles ];

    files = allFiles;
    
    fetchData();

  })

  async function fetchData() {
    UUID = uuid.v4();
    try {
      error = false;
      let res = await experimentToChrData(EXPERIMENT, SUBFAM, files); // TODO: may be just send required files?
      let result = [];
      CHROMOSOMES.forEach(chr => {
        result.push({
          key: chr,
          values: calcRatioForALocation(res[chr])
        });
      });
      loaded = true;
      dataToRender = result;
      // sessionFile = createSession(result, 10, SUBFAM, UUID);
    } catch (err) {
      console.log(err);
      error = err;
      loaded = false;
    }
  }

</script>

{#if sessionFile !== undefined}
  <Button on:click={handleSessionDownload}>Download Region Set</Button>
{/if}
{#if loaded}
  <!-- <Slider on:slider-move={handleSliderValue} extent={data.extent} /> -->
  <div class="tooltip" id="genome-tooltip" />
  {#each dataToRender as item, i}
    <Chromosome key={item.key} chr={item.key} data={item.values} />
  {/each}
{:else if error}
  <p>{error}</p>
{:else}
  <LinearProgress />
{/if}
