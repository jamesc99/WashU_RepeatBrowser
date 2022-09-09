<script>
  import { getContext, onMount } from 'svelte';
  import { SLIDE_GROUP } from '../SlideGroup/SlideGroup.svelte';
  import { ITEM_GROUP } from '../ItemGroup/ItemGroup.svelte';
  import { TABS } from './Tabs.svelte';
  import Class from '../../internal/Class';
  import Ripple from '../../actions/Ripple';

  let tab;
  const click = getContext(SLIDE_GROUP);
  const ITEM = getContext(ITEM_GROUP);
  const { ripple, registerTab } = getContext(TABS);

  let klass = '';
  export { klass as class };
  export let value = ITEM.index();
  export let activeClass = ITEM.activeClass;
  export let disabled = false;

  let active;
  ITEM.register((values) => {
    active = values.includes(value);
  });

  function selectTab({ target }) {
    if (!disabled) {
      click(target);
      ITEM.select(value);
    }
  }

  onMount(() => {
    registerTab(tab);
  });
</script>

<style lang="scss" src="./Tab.scss" global>:global(.s-tab){align-items:center;display:flex;flex:0 1 auto;font-size:.875rem;font-weight:500;justify-content:center;letter-spacing:.0892857143em;line-height:normal;min-width:90px;max-width:360px;outline:none;padding:0 16px;position:relative;text-align:center;text-decoration:none;text-transform:uppercase;transition:none;user-select:none;color:inherit}:global(.s-tab:before){background-color:currentColor;bottom:0;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:.3s cubic-bezier(.25,.8,.5,1)}:global(.s-tab:hover:before){opacity:.16}:global(.s-tab.focus-visible:before){opacity:.2}:global(.s-tab:not(.disabled)){cursor:pointer}:global(.s-tab.disabled){pointer-events:none;opacity:.5}:global(.s-tab:not(.active)),:global(.s-tab:not(.active))>:global(.s-btn),:global(.s-tab:not(.active))>:global(.s-icon){color:var(--theme-tabs)}</style>

<button
  bind:this={tab}
  class="s-tab s-slide-item {klass}"
  role="tab"
  aria-selected={active}
  tabindex={disabled ? -1 : 0}
  class:disabled
  class:active
  use:Class={[active && activeClass]}
  on:click={selectTab}
  on:click
  use:Ripple={ripple}>
  <slot />
</button>
