<script lang="ts">
  import List, {
    Group,
    Item,
    Graphic,
    Meta,
    Label,
    Separator,
    Subheader,
    Text,
    PrimaryText,
    SecondaryText
  } from "@smui/list";
  import { Cart } from "../stores/CartStore.js";
  import Button from '@smui/button';
  import { onDestroy } from "svelte";
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import VirtualList from 'svelte-tiny-virtual-list';
  import IconButton from '@smui/icon-button';
  import Menu, {MenuComponentDev} from '@smui/menu';

  let selectionIndex = null;
  let selectionTwoLine = "Stephen Hawking";
  let cartData;
  let cartRepeats;
  let menu: MenuComponentDev;
  let mode = 'files';

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

  const unsubscribe = Cart.subscribe(async store => {
    const { data, repeats } = store;
    cartData = data;
    cartRepeats = repeats;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<style>
  :global(.demo-list) {
    max-width: 50%;
    margin-top: 2rem;
    margin-right: 10%;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .main-body {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    height: 80%;
    width: 100%;
  }

  .virtual-list-cell {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    color: var(--mdc-theme-secondary, #333);
  }

  :global(.virtual-list-wrapper) {
    margin: 20px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    background: #fafafa;
    font-family: -apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;
    color: #333;
    -webkit-font-smoothing: antialiased;
  }

  .row {
    padding: 0 20px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    line-height: 50px;
    font-weight: 500;
    background: #fff;
  }

  .actions {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding: 0 20px;
    padding-top: 15px;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .actions label {
    padding: 10px 0;
    font-size: 18px;
    color: #999;
    font-family: -apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;
  }
</style>

<!--<div class="main-body">-->
<!--  <List-->
<!--    class="demo-list"-->
<!--    twoLine-->
<!--    avatarList-->
<!--    singleSelection-->
<!--    bind:selectedIndex={selectionIndex}>-->
<!--      <div class="mdc-typography&#45;&#45;headline3">Data</div>-->
<!--    {#each cartData as item}-->
<!--      <Item-->
<!--        on:SMUI:action={() => selectionTwoLine = item._id, Cart.addDataItems($Cart.data.filter(d => d._id !== item._id))}-->
<!--        selected={selectionTwoLine === item._id}>-->
<!--        <Graphic-->
<!--          style="background-image:-->
<!--          url(https://via.placeholder.com/40x40.png?text={item._id});" />-->
<!--        <Text>-->
<!--          <PrimaryText>{item.Tissue}</PrimaryText>-->
<!--          <SecondaryText>{item.Assay}</SecondaryText>-->
<!--        </Text>-->
<!--        <Meta class="material-icons">cancel</Meta>-->
<!--      </Item>-->
<!--    {/each}-->
<!--  </List>-->

<!--  <List class="demo-list">-->
<!--    <div class="mdc-typography&#45;&#45;headline3">Repeats</div>-->

<!--    {#each cartRepeats as item}-->
<!--      <Item>-->
<!--        <Text>{item.name}</Text>-->
<!--      </Item>-->
<!--    {/each}-->
<!--  </List>-->
<!--</div>-->

<LayoutGrid>

  <Cell span={10}>
    <div class="menu-cell">
      <div style="min-width: 100px;">
        <Button on:click={() => menu.setOpen(true)}>
          <Label>Mode Selection (Current: {mode})</Label>
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

{#each Array(2) as _unused, _i}
  {#if _i === 0}
    <Cell span={6}>
      <div class="demo-cell">
        <p> Data: {cartData.length} </p>
        <VirtualList
                height={200}
                width="auto"
                itemCount={cartData.length}
                itemSize={50}>

          <div slot="item" let:index let:style {style} class="row">
                <span>
                    <IconButton class="material-icons"
                                on:click={() => Cart.addDataItems($Cart.data.filter(
                            d => d._id !== cartData[index]._id))}>
                    cancel</IconButton>
                    File: {cartData[index].id}
                </span>
          </div>
        </VirtualList>
      </div>
    </Cell>
  {/if}

  {#if _i === 1}
    <Cell span={6}>
      <div class="demo-cell">
        <p> Repeats: {cartRepeats.length} </p>
        <VirtualList
                height={200}
                width="auto"
                itemCount={cartRepeats.length}
                itemSize={50}>
          <div slot="item" let:index class="row">
            <Text>{cartRepeats[cartRepeats.length - 1 - index].name}</Text>
          </div>

        </VirtualList>
      </div>
    </Cell>
  {/if}
{/each}
</LayoutGrid>
