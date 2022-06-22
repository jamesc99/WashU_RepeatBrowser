<script>
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
  import { onDestroy } from "svelte";

  let selectionIndex = null;
  let selectionTwoLine = "Stephen Hawking";
  let cartData;
  let cartRepeats;

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
    max-width: 40%;
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
</style>

<div class="main-body">
  <List
    class="demo-list"
    twoLine
    avatarList
    singleSelection
    bind:selectedIndex={selectionIndex}>
      <div class="mdc-typography--headline3">Data</div>
    {#each cartData as item}
      <Item
        on:SMUI:action={() => selectionTwoLine = item._id, Cart.addDataItems($Cart.data.filter(d => d._id !== item._id))}
        selected={selectionTwoLine === item._id}>
        <Graphic
          style="background-image:
          url(https://via.placeholder.com/40x40.png?text={item._id});" />
        <Text>
          <PrimaryText>{item.Tissue}</PrimaryText>
          <SecondaryText>{item.Assay}</SecondaryText>
        </Text>
        <Meta class="material-icons">cancel</Meta>
      </Item>
    {/each}
  </List>

  <List class="demo-list">
    <div class="mdc-typography--headline3">Repeats</div>

    {#each cartRepeats as item}
      <Item>
        <Text>{item.name}</Text>
      </Item>
    {/each}
  </List>
</div>
