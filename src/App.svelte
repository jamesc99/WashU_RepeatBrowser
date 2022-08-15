<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
</svelte:head>

<script>
  import {onMount} from 'svelte';
  import Tab, {Icon, Label} from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Button from "@smui/button";
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
  import Logo from "./ui/Logo.svelte";
  import CartComponent from "./components/Cart.svelte";
  import CartIndicator from './ui/CartIndicator.svelte';
  import Switch from './ui/Switch.svelte';
  import Modal from './ui/Modal.svelte';
  import _data from "./json/main.json";
  import defaultData from './json/default_cart_data.json';
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
    console.log(data);
  });

  onMount(() => {
    Cart.addDataItems(defaultData.data);
    Cart.addRepeats(defaultData.repeats);
  })

  let iconTabs = [
    {
      k: 0,
      icon: "home",
      label: "Homepage"
    },
    {
      k: 1,
      icon: "table",
      label: "Heatmap"
    },
    {
      k: 2,
      icon: "query_stats",
      label: "Consensus View"
    },
    {
      k: 3,
      icon: "toc",
      label: "Selected Data"
    },
    {
      k: 4,
      icon: "pie_chart",
      label: "Repeats"
    },
    {
      k: 5,
      icon: "folder_open",
      label: "Data"
    },
    {
      k: 6,
      icon: "biotech",
      label: "Genome View"
    },
  ];

  let keyedTabsActive = iconTabs[0];
  let combination = undefined;

  let vertical_active = true;

  function handleHeatmapClick(event) {
    combination = event.detail;
    keyedTabsActive = iconTabs[2];
  }

  function handleModeChange(event) {
    if (event.detail) {
      mode = 'experiments';
      keyedTabsActive = iconTabs[1];
    } else {
      mode = 'files'
    }
    Cart.addDataItems([]);
  }

</script>

<style>
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
    margin-top: 2rem;
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

  <div class="main-body">
    {#if keyedTabsActive.k === 0}
      <Homepage/>

    {:else if keyedTabsActive.k === 5}
      <!-- <DataCenter DATA={_data[mode]}/> -->
<!--      <Modal>-->
<!--        <PivotTable DATA={_data[mode]}/>-->
<!--      </Modal>-->
      <DataTab {mode}/>

    {:else if keyedTabsActive.k === 1}
      {#if mode === 'experiments'}
        <PlotlyHeatmapRatio on:heatmap-click={handleHeatmapClick} files={_data.files} />
      {:else}
        <TabContent vertical pills>
          <TabPane tabId="ALL" tab="ALL" bind:active={vertical_active}>
            <h2>ALL</h2>
          </TabPane>
          <TabPane tabId="Unique" tab="Unique">
            <h2>Unique</h2>
            <p>Todo: Add the uni div</p>
          </TabPane>
        </TabContent>
        <PlotlyHeatmapContainer on:heatmap-click={handleHeatmapClick} />

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

    {:else if keyedTabsActive.k === 4}
<!--      <PackChartRepeats />-->
<!--      <ZoomableSunburst />-->
      <Zoom_Sunburst/>
    {:else if keyedTabsActive.k === 3}
      <TabContent vertical pills>
        <TabPane tabId="ALL" tab="ALL" active>
          <h2>ALL</h2>
          <CartComponent />
        </TabPane>
        <TabPane tabId="Repeats" tab="Repeats">
          <h2>Repeat select</h2>
          <Zoom_Sunburst/>
        </TabPane>
        <TabPane tabId="File" tab="File">
          <h2>File Select</h2>
          <DataTab {mode}/>
        </TabPane>
      </TabContent>


    {:else if keyedTabsActive.k === 6}
      {#if combination !== undefined}
        {#if mode === 'experiments'}
           <GenomeViewRatioContainer {combination}/>
        {:else}
           <GenomeViewContainer {combination} />
        {/if}
			{:else}
				<p>Please select data and repeats and click on heatmap cell</p>
      {/if}
			
    {:else if keyedTabsActive.k === 1 && (dataInStore.length === 0 || repeatsInStore.length === 0)}
      <p>Please select data and repeats</p>
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
