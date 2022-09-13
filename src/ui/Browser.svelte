<script lang="ts">
    import Drawer, {
        AppContent,
        Content,
        Header,
        Title,
        Subtitle,
        Scrim,
    } from '@smui/drawer';
    import Button, { Label, Icon } from '@smui/button';
    import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import PlotlyHeatmapContainer from "../examples/PlotlyHeatmapContainer.svelte";
    import ConsensusContainer from "../components/consensus/ConsensusContainer.svelte";
    import GenomeViewContainer from "../components/genome-view/GenomeViewContainer.svelte";
    import {Cart} from "../stores/CartStore";
    import CartComponent from "../components/Cart.svelte";
    import defaultData from '../json/default_cart_data.json';
    import Zoom_Sunburst from "../examples/Zoom_Sunburst.svelte";
    import DataTab from "../examples/DataTab.svelte";
    import Menu, {MenuComponentDev} from '@smui/menu';
    import Modal from '../ui/Modal.svelte';
    import { H6 } from '@smui/common/elements';
    import {onDestroy, onMount} from "svelte";

    let typemenu: MenuComponentDev;
    let heatmapmenu: MenuComponentDev;
    let menu: MenuComponentDev;
    let selected_type = 'Files';
    let heatmap_type = 'ALL';

    let open = false;
    // let active = 'Inbox';

    let combination = undefined;
    let drawernames = ['Files Selection', 'Data View', 'Repeats Selection', 'Heatmap', 'Consensus View', 'Genome View']
    let active = drawernames[0];
    let mode = 'files';

    let cartData, cartRepeats;
    const unsubscribe = Cart.subscribe(async store => {
        const { data, repeats } = store;
        cartData = data;
        cartRepeats = repeats;
    });

    onDestroy(() => {
        unsubscribe();
    });

    // onMount(() => {
    //     Cart.addDataItems(defaultData.data);
    //     Cart.addRepeats(defaultData.repeats);
    // })

    function handleHeatmapClick(event) {
        combination = event.detail;
        active = 'Consensus View';
    }

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

    function setActive(value: string) {
        active = value;
        open = false;
    }
</script>


<div class="drawer-container">
    <!-- Don't include fixed={false} if this is a page wide drawer.
          It adds a style for absolute positioning. -->
    <Drawer variant="modal" fixed={false} bind:open>
        <Header>
            <Title>Repeat Browser</Title>
            <Subtitle>Browse WashU repeat browser!</Subtitle>
        </Header>
        <Content>
            <List>
                <Item
                        href="javascript:void(0)"
                        on:click={() => setActive('Data View')}
                        activated={active === 'Data View'}
                >
                    <Graphic class="material-icons" aria-hidden="true">folder_open</Graphic>
                    <Text>{cartData.length} Files and {cartRepeats.length} Repeats</Text>
                </Item>

                <Item
                        href="javascript:void(0)"
                        on:click={() => setActive('Files Selection')}
                        activated={active === 'Files Selection'}
                >
                    <Graphic class="material-icons" aria-hidden="true">toc</Graphic>
                    <Text>Files Selection</Text>
                </Item>

                <Item
                        href="javascript:void(0)"
                        on:click={() => setActive('Repeats Selection')}
                        activated={active === 'Repeats Selection'}
                >
                    <Graphic class="material-icons" aria-hidden="true">pie_chart</Graphic>
                    <Text>Repeats Selection</Text>
                </Item>

                <Separator />

                <Item
                        href="javascript:void(0)"
                        on:click={() => setActive('Heatmap')}
                        activated={active === 'Heatmap'}
                >
                    <Graphic class="material-icons" aria-hidden="true">table_chart</Graphic>
                    <Text>Heatmap</Text>
                </Item>

                <Separator />

                <Item
                        href="javascript:void(0)"
                        on:click={() => setActive('Consensus View')}
                        activated={active === 'Consensus View'}
                >
                    <Graphic class="material-icons" aria-hidden="true">show_chart</Graphic>
                    <Text>Consensus View</Text>
                </Item>

                <Item
                        href="javascript:void(0)"
                        on:click={() => setActive('Genome View')}
                        activated={active === 'Genome View' && combination.length != 0}
                >
                    <Graphic class="material-icons" aria-hidden="true">biotech</Graphic>
                    <Text>Genome View</Text>
                </Item>
<!--                <Item-->
<!--                        href="javascript:void(0)"-->
<!--                        on:click={() => setActive('Drafts')}-->
<!--                        activated={active === 'Drafts'}-->
<!--                >-->
<!--                    <Graphic class="material-icons" aria-hidden="true">drafts</Graphic>-->
<!--                    <Text>Drafts</Text>-->
<!--                </Item>-->

<!--                <Separator />-->
<!--                <Subheader component={H6}>Labels</Subheader>-->
<!--                <Item-->
<!--                        href="javascript:void(0)"-->
<!--                        on:click={() => setActive('Family')}-->
<!--                        activated={active === 'Family'}-->
<!--                >-->
<!--                    <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>-->
<!--                    <Text>Family</Text>-->
<!--                </Item>-->
<!--                <Item-->
<!--                        href="javascript:void(0)"-->
<!--                        on:click={() => setActive('Friends')}-->
<!--                        activated={active === 'Friends'}-->
<!--                >-->
<!--                    <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>-->
<!--                    <Text>Friends</Text>-->
<!--                </Item>-->
<!--                <Item-->
<!--                        href="javascript:void(0)"-->
<!--                        on:click={() => setActive('Work')}-->
<!--                        activated={active === 'Work'}-->
<!--                >-->
<!--                    <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>-->
<!--                    <Text>Work</Text>-->
<!--                </Item>-->
            </List>
        </Content>
    </Drawer>

    <!-- Don't include fixed={false} if this is a page wide drawer.
          It adds a style for absolute positioning. -->
    <Scrim fixed={false} />
    <AppContent class="app-content">
        <main class="main-content">
            <Button on:click={() => (open = !open)}>
                <Label>Menu</Label>
            </Button>
            <br />
            {#if active === "Files Selection"}
                <DataTab {mode}/>
<!--                <LayoutGrid>-->
<!--                    <Cell span={2}>-->
<!--                        <div class="menu-cell">-->
<!--                            <div style="min-width: 100px;">-->
<!--                                <Button on:click={() => typemenu.setOpen(true)}>-->
<!--                                    <Label>Open Menu</Label>-->
<!--                                </Button>-->
<!--                                <Menu bind:this={typemenu}>-->
<!--                                    <List>-->
<!--                                        <Item on:SMUI:action={() => (selected_type = 'Files')}>-->
<!--                                            <Text>Files</Text>-->
<!--                                        </Item>-->
<!--                                        <Item on:SMUI:action={() => (selected_type = 'Data')}>-->
<!--                                            <Text>Data</Text>-->
<!--                                        </Item>-->
<!--                                        <Item on:SMUI:action={() => (selected_type = 'Repeats')}>-->
<!--                                            <Text>Repeats</Text>-->
<!--                                        </Item>-->
<!--                                    </List>-->
<!--                                </Menu>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </Cell>-->

<!--                    <Cell span={2}>-->
<!--                        <div class="menu-cell">-->
<!--                            <div style="min-width: 100px;">-->
<!--                                <Button on:click={() => menu.setOpen(true)}>-->
<!--                                    <Label>Mode Selection</Label>-->
<!--                                </Button>-->
<!--                                <Menu bind:this={menu}>-->
<!--                                    <List>-->
<!--                                        <Item on:click={ModeChangeFiles}>-->
<!--                                            <Text>Files</Text>-->
<!--                                        </Item>-->
<!--                                        <Item on:click={ModeChangeExperiments}>-->
<!--                                            <Text>Experiments</Text>-->
<!--                                        </Item>-->
<!--                                    </List>-->
<!--                                </Menu>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </Cell>-->

<!--                    &lt;!&ndash;        <Cell span={3}>&ndash;&gt;-->
<!--                    &lt;!&ndash;          <div class="demo-cell">&ndash;&gt;-->
<!--                    &lt;!&ndash;              <Switch on:mode-change={handleModeChange}/>&ndash;&gt;-->
<!--                    &lt;!&ndash;          </div>&ndash;&gt;-->
<!--                    &lt;!&ndash;        </Cell>&ndash;&gt;-->

<!--                    {#if selected_type==='Files'}-->
<!--                        <Cell span={12}>-->
<!--                            <div class="demo-cell">-->
<!--                                <h2>File Select</h2>-->
<!--                                <DataTab {mode}/>-->
<!--                            </div>-->
<!--                        </Cell>-->
<!--                    {:else if selected_type==='Data'}-->
<!--                        <Cell span={12}>-->
<!--                            <div class="demo-cell">-->
<!--                                <h2>Data View</h2>-->
<!--                                <CartComponent />-->
<!--                            </div>-->
<!--                        </Cell>-->
<!--                    {:else if selected_type==='Repeats'}-->
<!--                        <Cell span={12}>-->
<!--                            <div class="demo-cell">-->
<!--                                <h2>Repeat select</h2>-->
<!--                                <Zoom_Sunburst/>-->
<!--                            </div>-->
<!--                        </Cell>-->
<!--                    {/if}-->
<!--                </LayoutGrid>-->
            {:else if active === "Heatmap"}
                <div>
                    <PlotlyHeatmapContainer on:heatmap-click={handleHeatmapClick} />
                </div>
            {:else if active === "Repeats Selection"}
                <div class="demo-cell">
                    <h3>Repeat Selection</h3>
                    <Zoom_Sunburst/>
                </div>
            {:else if active === "Data View"}
                <CartComponent />
            {:else if active === "Consensus View"}
                <ConsensusContainer {combination} />
                <Button style="display: inline; margin-right: 76%;" on:click={() => {active = "Heatmap"}} touch variant="unelevated">
                    <Icon class="material-icons">arrow_back</Icon>
                    <Label>Heatmap</Label>
                </Button>

                <Button style="display: inline;" on:click={() => {active = "Genome View"}} touch variant="unelevated">
                    <Label>Genome View</Label>
                    <Icon class="material-icons">arrow_forward</Icon>
                </Button>
            {:else if active === "Genome View"}
                <Modal>
                    <GenomeViewContainer {combination} style="margin-bottom: 5%"/>
                    <Button style="display: inline; margin-right: 74%;" on:click={() => {active = "Heatmap"}} touch variant="unelevated">
                        <Icon class="material-icons">arrow_back</Icon>
                        <Label>Heatmap</Label>
                    </Button>

                    <Button style="display: inline" on:click={() => {active = "Consensus View"}} touch variant="unelevated">
                        <Label>Consensus View</Label>
                        <Icon class="material-icons">arrow_forward</Icon>
                    </Button>
                </Modal>
            {/if}

            <pre class="status">Active: {active}</pre>
            <div style="height: 700px;">&nbsp;</div>
<!--            And some stuff at the bottom.-->
        </main>
    </AppContent>
</div>

<style>
    /* These classes are only needed because the
      drawer is in a container on the page. */
    .drawer-container {
        position: relative;
        display: flex;
        /*height: 700px;*/
        max-width: 100%;
        /*border: 1px solid*/
        /*var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));*/
        overflow: hidden;
        z-index: 0;
    }

    * :global(.app-content) {
        flex: auto;
        overflow: auto;
        position: relative;
        flex-grow: 1;
    }

    .main-content {
        overflow: auto;
        padding: 16px;
        height: 100%;
        box-sizing: border-box;
    }
</style>