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
  import Switch from '@smui/switch';
  import FormField from '@smui/form-field';

  let menu: MenuComponentDev;
  let clicked = 'DNA';
  let checked = false;

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
      let rna_data = data.filter((el) => el.Assay.includes("RNA"));
      let dna_data = data.filter((el) => !el.Assay.includes("RNA"));
      console.log(dna_data);
      console.log(rna_data);
      if (!(dna_data === undefined || dna_data.length == 0)){
        dataPromise_dna = getZarrForHeatmapAll(dna_data, 'Zarr', repeats);
        heatmapData_dna = await dataPromise_dna;}
      if (!(rna_data === undefined || rna_data.length == 0)){
        dataPromise_rna = getZarrForHeatmapAll(rna_data, 'Zarr', repeats);
        heatmapData_rna = await dataPromise_rna;}
      loaded = true;
    }
  });
  
  onMount(unsubscribe);

</script>

{#await dataPromise_dna}
  <LinearProgress/>
{:then heatmapData}
  {#if loaded}
    <div style="min-width: 100px; display: inline; margin-right: 5%;">
      <Button on:click={() => menu.setOpen(true)}>
        <Label>Assay Type: {clicked}</Label>
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

    <div style="margin-top: 1em; display:inline">
      <FormField>
        <Switch bind:checked={checked} color="secondary" icons={false} />
        <span slot="label">Alignment Type Selection: </span>
      </FormField>
    </div>
    {#if checked}
      <pre style="display: inline" class="status">Unique</pre>
    {:else}
      <pre style="display: inline" class="status">ALL</pre>
    {/if}

    {#if clicked == 'DNA' && heatmapData_dna}
      {#if checked}
        <PlotlyHeatmap on:heatmap-click propsData={heatmapData_dna} repeatLabels={repeatLabels} TYPE="unique"/>
      {:else}
        <PlotlyHeatmap on:heatmap-click propsData={heatmapData_dna} repeatLabels={repeatLabels} TYPE="all"/>
      {/if}
    {:else if  clicked == 'RNA' && heatmapData_rna}
      {#if checked}
        <PlotlyHeatmap on:heatmap-click propsData={heatmapData_rna} repeatLabels={repeatLabels} TYPE="unique"/>
      {:else}
        <PlotlyHeatmap on:heatmap-click propsData={heatmapData_rna} repeatLabels={repeatLabels} TYPE="all"/>
      {/if}
    {:else}
      <p>Some error has occured!</p>
    {/if}

  {/if}
{:catch error}
  Some error has occured!
{/await}