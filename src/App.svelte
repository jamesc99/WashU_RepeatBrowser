<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
</svelte:head>

<script lang="ts">
  import {onMount} from 'svelte';
  import Tab, {Icon, Label} from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Button from "@smui/button";
  import type, { MenuComponentDev } from '@smui/menu';
  import Menu from '@smui/menu';
  import List, { Item, Separator, Text } from '@smui/list';
  import DataCenter from "./DataCenter.svelte";
  import IdeogramExample from "./examples/IdeogramExample.svelte";
  import PackChartRepeats from "./examples/PackChartRepeats.svelte";
  import PlotlyHeatmap from "./examples/PlotlyHeatmap.svelte";
  import PlotlyHeatmapContainer from "./examples/PlotlyHeatmapContainer.svelte";
  import PlotlyHeatmapRatio from "./examples/PlotlyHeatmapRatio.svelte";
  import PlotlyAreaChart from "./examples/PlotlyAreaChart.svelte";
  import ConsensusContainer from "./components/consensus/ConsensusContainer.svelte";
  import ConsensusRatioContainer from "./components/consensus/ConsensusRatioContainer.svelte";
  import GenomeViewContainer from "./components/genome-view/GenomeViewContainer.svelte";
  import GenomeViewRatioContainer from "./components/genome-view/GenomeViewRatioContainer.svelte";
  import PivotTable from './components/data-view/PivotTable.svelte';
  import LinearProgress from "./ui/LinearProgress.svelte";
  import Header from "./ui/header.svelte"
  import Footer from "./ui/footer.svelte"
  import Browser from "./ui/Browser.svelte"
  import Logo from "./ui/Logo.svelte";
  import CartComponent from "./components/Cart.svelte";
  import CartIndicator from './ui/CartIndicator.svelte';
  import Switch from './ui/Switch.svelte';
  import Modal from './ui/Modal.svelte';
  import _data from "./json/main.json";
  // import defaultData from './json/default_cart_data.json';
  // import defaultData from './json/zarr_default_data.json';
  import defaultData from './json/zarr_data_0912.json';
  import {getZarrParameters} from './api/inputdata';
  import DataTable from './examples/DataTab.svelte'
  import { TabContent, TabPane } from 'sveltestrap';


  import {Cart} from "./stores/CartStore";
  import DataTab from "./examples/DataTab.svelte";
  import Homepage from "./examples/Homepage.svelte";
  // import ZoomableSunburst from "./examples/ZoomableSunburst.svelte";
  import Zoom_Sunburst from "./examples/Zoom_Sunburst.svelte";

  let dataInStore;
  let repeatsInStore;
  let mode = 'files';

  const unsubscribe = Cart.subscribe(store => {
    const {data, repeats} = store;
    dataInStore = data;
    repeatsInStore = repeats;
    // console.log(data);
  });

  const data_test = defaultData.data.map(async x => {
    const _ = await getZarrParameters(x.Zarr).then(d => d);
    return Promise.resolve(_)
  })

  onMount(() => {
    Promise.all(data_test).then(d => Cart.addDataItems(d));
    // Cart.addDataItems(defaultData.data);
    Cart.addRepeats(defaultData.repeats);
    console.log("default", defaultData.data);
  })

  let iconTabs = [
    {
      k: 0,
      icon: "home",
      label: "Homepage"
    },
    // {
    //   k: 1,
    //   icon: "table",
    //   label: "Heatmap"
    // },
    // {
    //   k: 2,
    //   icon: "query_stats",
    //   label: "Consensus View"
    // },
    // {
    //   k: 3,
    //   icon: "toc",
    //   label: "Selected Data"
    // },
    {
      k: 4,
      icon: "toc",
      label: "Browser"
    },
    // {
    //   k: 4,
    //   icon: "pie_chart",
    //   label: "Repeats"
    // },
    // {
    //   k: 5,
    //   icon: "folder_open",
    //   label: "Data"
    // },
    // {
    //   k: 6,
    //   icon: "biotech",
    //   label: "Genome View"
    // },
    {
      k: 7,
      icon: "library_books",
      label: "Tutorial"
    },
    {
      k: 8,
      icon: "help_outline",
      label: "FAQ"
    },
  ];

  let keyedTabsActive = iconTabs[0];
  let combination = undefined;

  let vertical_active = true;
  let typemenu: MenuComponentDev;
  let heatmapmenu: MenuComponentDev;
  let menu: MenuComponentDev;
  let selected_type = 'Files';
  let heatmap_type = 'ALL';

  function handleHeatmapClick(event) {
    combination = event.detail;
    keyedTabsActive = iconTabs[2];
  }

  // function handleModeChange(event) {
  //   if (event.detail) {
  //     console.log('event:' + event.detail)
  //     mode = 'experiments';
  //     keyedTabsActive = iconTabs[1];
  //   } else {
  //     mode = 'files'
  //   }
  //   Cart.addDataItems([]);
  // }

  function ModeChangeExperiments(event){
    if(mode != 'experiments'){
      mode = 'experiments'
      Cart.addDataItems([]);
    }
  }

  function ModeChangeFiles(event){
    if(mode != 'files'){
      mode = 'files'
      Cart.addDataItems([]);
    }
  }

</script>

<style>
  .menu-cell {
    height: 50px;
    display: flex;
    background-color: #fff;
  }

  /*.demo-cell{*/
  /*  background-color: #fff;*/
  /*}*/

  Modal {
    width: 80%;
    margin-left: 40%;
  }

  section > div {
    margin-bottom: 40px;
  }

  .main-body {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 1rem;
  }

  .browser-body{
    width: 98%;
    margin-left: 1%;
    margin-right: 1%;
    margin-top: 1rem;
  }

  .tab-bar {
    width: 100%;
  }

  .heatmap-hide {
    display: none;
  }

  .svg-box {
    width: 100%;
    height: 10%;
    position: relative;
  }

</style>

<div>
  <Header />

  <TabBar
    tabs={iconTabs}
    let:tab key={tab => tab.k}
    bind:active={keyedTabsActive}>
    <Tab
      {tab}
      stacked={true}
      indicatorSpanOnlyContent={true}
      tabIndicator$transition="fade"
      >
      <Icon class="material-icons">{tab.icon}</Icon>
      <Label>
      {#if tab.k === 3}
        <CartIndicator {mode}/>
      {:else}
        {tab.label}
      {/if}
      </Label>
    </Tab>
  </TabBar>
  <hr>

  <div class="main-body">
    {#if keyedTabsActive.k === 0}
      <Homepage/>

    <!--{:else if keyedTabsActive.k === 5}-->
    <!--  <DataTab {mode}/>-->

    {:else if keyedTabsActive.k === 1}
      {#if mode === 'experiments'}
        <PlotlyHeatmapRatio on:heatmap-click={handleHeatmapClick} files={_data.files} />
      {:else}
        <LayoutGrid>
          <Cell span={4}>
            <div class="menu-cell">
              <div style="min-width: 100px;">
                <Button on:click={() => heatmapmenu.setOpen(true)}>
                  <Label>Change Heatmap type</Label>
                </Button>
                <Menu bind:this={heatmapmenu}>
                  <List>
                    <Item on:SMUI:action={() => (heatmap_type = 'ALL')}>
                      <Text>ALL</Text>
                    </Item>
                    <Item on:SMUI:action={() => (heatmap_type = 'Unique')}>
                      <Text>Unique</Text>
                    </Item>
                  </List>
                </Menu>
              </div>
            </div>
          </Cell>

          {#if heatmap_type === "ALL"}
            <Cell span={12}>
              <div>
                <PlotlyHeatmapContainer on:heatmap-click={handleHeatmapClick} />
              </div>
            </Cell>

          {:else if heatmap_type === "Unique"}
            <Cell span={12}>
              <div>
                <h1>Not yet.</h1>
              </div>
            </Cell>
          {/if}

        </LayoutGrid>


<!--        <TabContent vertical pills>-->
<!--          <TabPane tabId="ALL" tab="ALL" bind:active={vertical_active}>-->
<!--            <h2>ALL</h2>-->
<!--          </TabPane>-->
<!--          <TabPane tabId="Unique" tab="Unique">-->
<!--            <h2>Unique</h2>-->
<!--            <p>Todo: Add the uni div</p>-->
<!--          </TabPane>-->
<!--        </TabContent>-->

      {/if}

    {:else if keyedTabsActive.k === 2}
      {#if combination !== undefined}
        {#if mode === 'experiments'}
          <ConsensusRatioContainer {combination} files={_data.files}/>
        {:else}
          <ConsensusContainer {combination} />
        {/if}
      {:else}
        <p>Please select data and repeats and click on heatmap cell</p>
      {/if}

<!--    {:else if keyedTabsActive.k === 4}-->
<!--&lt;!&ndash;      <PackChartRepeats />&ndash;&gt;-->
<!--&lt;!&ndash;      <ZoomableSunburst />&ndash;&gt;-->
<!--      <Zoom_Sunburst/>-->
    {:else if keyedTabsActive.k === 3}
      <LayoutGrid>
        <Cell span={2}>
          <div class="menu-cell">
            <div style="min-width: 100px;">
              <Button on:click={() => typemenu.setOpen(true)}>
                <Label>Open Menu</Label>
              </Button>
              <Menu bind:this={typemenu}>
                <List>
                  <Item on:SMUI:action={() => (selected_type = 'Files')}>
                    <Text>Files</Text>
                  </Item>
                  <Item on:SMUI:action={() => (selected_type = 'Data')}>
                    <Text>Data</Text>
                  </Item>
                  <Item on:SMUI:action={() => (selected_type = 'Repeats')}>
                    <Text>Repeats</Text>
                  </Item>
                </List>
              </Menu>
            </div>
          </div>
        </Cell>

        <Cell span={2}>
          <div class="menu-cell">
            <div style="min-width: 100px;">
              <Button on:click={() => menu.setOpen(true)}>
                <Label>Mode Selection</Label>
              </Button>
              <Menu bind:this={menu}>
                <List>
                  <Item on:click={ModeChangeFiles}>
                    <Text>Files</Text>
                  </Item>
                  <Item on:click={ModeChangeExperiments}>
                    <Text>Experiments</Text>
                  </Item>
                </List>
              </Menu>
            </div>
          </div>
        </Cell>

<!--        <Cell span={3}>-->
<!--          <div class="demo-cell">-->
<!--              <Switch on:mode-change={handleModeChange}/>-->
<!--          </div>-->
<!--        </Cell>-->

        {#if selected_type==='Files'}
          <Cell span={12}>
            <div class="demo-cell">
              <h2>File Select</h2>
              <DataTab {mode}/>
            </div>
          </Cell>
        {:else if selected_type==='Data'}
          <Cell span={12}>
            <div class="demo-cell">
              <h2>Data View</h2>
              <CartComponent />
            </div>
          </Cell>
        {:else if selected_type==='Repeats'}
          <Cell span={12}>
            <div class="demo-cell">
              <h2>Repeat select</h2>
              <Zoom_Sunburst/>
            </div>
          </Cell>
        {/if}
      </LayoutGrid>

<!--      <TabContent vertical pills>-->
<!--        <TabPane tabId="ALL" tab="ALL" active>-->
<!--          <h2>ALL</h2>-->
<!--          <CartComponent />-->
<!--        </TabPane>-->
<!--        <TabPane tabId="Repeats" tab="Repeats">-->
<!--          <h2>Repeat select</h2>-->
<!--          <Zoom_Sunburst/>-->
<!--        </TabPane>-->
<!--        <TabPane tabId="File" tab="File">-->
<!--          <h2>File Select</h2>-->
<!--          <DataTab {mode}/>-->
<!--        </TabPane>-->
<!--      </TabContent>-->

    {:else if keyedTabsActive.k === 6}
      {#if combination !== undefined}
        {#if mode === 'experiments'}
           <GenomeViewRatioContainer {combination}/>
        {:else}
          <Modal>
            <GenomeViewContainer {combination} />
          </Modal>
        {/if}
			{:else}
				<p>Please select data and repeats and click on heatmap cell</p>
      {/if}

    {:else if keyedTabsActive.k === 1 && (dataInStore.length === 0 || repeatsInStore.length === 0)}
      <p>Please select data and repeats</p>
    {/if}



  </div>

  <div class="browser-body">
    {#if keyedTabsActive.k === 4}
      <Browser />
    {/if}
  </div>

  <Footer/>

<!--  <div class:heatmap-hide={keyedTabsActive.k !== 1}>-->
<!--    {#if mode === 'experiments'}-->
<!--      <PlotlyHeatmapRatio on:heatmap-click={handleHeatmapClick} files={_data.files} />    -->
<!--    {:else}-->
<!--      <PlotlyHeatmapContainer on:heatmap-click={handleHeatmapClick} />    -->
<!--    {/if}-->
<!--  </div>-->


</div>
