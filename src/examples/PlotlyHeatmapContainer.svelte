<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Cart } from '../stores/CartStore';
  import { getDataForHeatmapAll, getZarrForHeatmapAll } from '../api/heatmap';
  import LinearProgress from '../ui/LinearProgress.svelte';
  import PlotlyHeatmap from './PlotlyHeatmap.svelte';
  import debug_data from "../json/subfam_stat_debug.json";
  import type { MenuComponentDev } from '@smui/menu';
  import Menu from '@smui/menu';
  import List, { Item, Separator, Text } from '@smui/list';
  import Button, { Label } from '@smui/button';

  let menu: MenuComponentDev;
  let clicked = 'DNA';

  let dataPromise_dna, dataPromise_rna;
  let heatmapData_dna, heatmapData_rna;
  let repeatLabels;
  let loaded = false;
  
  const unsubscribe = Cart.subscribe(async store => {
    loaded = false;
    const { data, repeats } = store;
    repeatLabels = repeats.map(d => d.name);
    if (data.length > 0 && repeats.length > 0) {
      //dataPromise = getDataForHeatmapAll(data, 'subfamStat', repeats);
      // dataPromise = getZarrForHeatmapAll(debug_data.files, 'Zarr', repeats);
      let rna_data = data.filter((el) => el.Assay.includes("RNA-seq"));
      let dna_data = data.filter((el) => !el.Assay.includes("RNA-seq"));

      dataPromise_dna = getZarrForHeatmapAll(dna_data, 'Zarr', repeats);
      dataPromise_rna = getZarrForHeatmapAll(rna_data, 'Zarr', repeats);
      heatmapData_dna = await dataPromise_dna;
      heatmapData_rna = await dataPromise_rna;
      loaded = true;
    }
  });
  
  onMount(unsubscribe);

</script>

{#await dataPromise_dna}
  <LinearProgress/>
{:then heatmapData}
  {#if loaded}
    <div style="min-width: 100px;">
      <Button on:click={() => menu.setOpen(true)}>
        <Label>Assay Type</Label>
      </Button>
      <Menu bind:this={menu}>
        <List>
          <Item on:SMUI:action={() => (clicked = 'DNA')}>
            <Text>DNA</Text>
          </Item>
          <Item on:SMUI:action={() => (clicked = 'RNA')}>
            <Text>RNA</Text>
          </Item>
        </List>
      </Menu>
    </div>

    {#if clicked == 'DNA'}
      <PlotlyHeatmap on:heatmap-click propsData={heatmapData_dna} repeatLabels={repeatLabels}/>
    {:else }
      <PlotlyHeatmap on:heatmap-click propsData={heatmapData_rna} repeatLabels={repeatLabels}/>
    {/if}

  {/if}
{:catch error}
  Some error has occured!
{/await}