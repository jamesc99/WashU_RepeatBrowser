<script>
  import { getContext } from 'svelte';
  import Button from '../Button';
  import { ITEM_GROUP } from '../ItemGroup/ItemGroup.svelte';

  const ITEM = getContext(ITEM_GROUP);

  let active;

  let klass = '';
  export { klass as class };
  export let value = ITEM.index();
  export let activeClass = ITEM.activeClass;
  export let disabled = null;

  ITEM.register((values) => {
    active = values.includes(value);
  });

  function click() {
    if (!disabled) ITEM.select(value);
  }
</script>

<style lang="scss" src="./ButtonGroupItem.scss" global>:global(.s-btn-group-item){border-radius:0;border-style:solid;border-width:thin;opacity:.8;padding:0 12px}:global(.s-btn-group-item:first-child){border-top-left-radius:inherit;border-bottom-left-radius:inherit}:global(.s-btn-group-item:last-child){border-top-right-radius:inherit;border-bottom-right-radius:inherit}:global(.s-btn-group-item:not(:first-child)){border-left-width:0}</style>

<Button
  class="s-btn-group-item {klass}"
  {activeClass}
  {active}
  {disabled}
  on:click={click}
  on:click>
  <slot />
</Button>
