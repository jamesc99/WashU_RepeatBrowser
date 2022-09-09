<script context="module">
  export const TABS = {};
</script>

<script>
  import SlideGroup from '../SlideGroup';
  import Window from '../Window';
  import { onMount, setContext } from 'svelte';

  let sliderElement;
  let windowComponent;
  const tabs = [];

  let klass = '';
  export { klass as class };
  export let value = 0;
  export let centerActive = false;
  export let showArrows = true;
  export let fixedTabs = false;
  export let grow = false;
  export let centered = false;
  export let right = false;
  export let icons = false;
  export let slider = true;
  export let sliderClass = '';
  export let ripple = {};
  export let vertical = false;

  setContext(TABS, {
    ripple,
    registerTab: (tab) => {
      tabs.push(tab);
    },
  });

  function moveSlider({ detail }) {
    if (slider) {
      const activeTab = tabs[detail];
      if (vertical) {
        sliderElement.style.top = `${activeTab.offsetTop}px`;
        sliderElement.style.height = `${activeTab.offsetHeight}px`;
      } else {
        sliderElement.style.left = `${activeTab.offsetLeft}px`;
        sliderElement.style.width = `${activeTab.offsetWidth}px`;
      }
    }
    windowComponent.set(value);
  }

  onMount(() => {
    moveSlider({ detail: value });
  });
</script>

<style lang="scss" src="./Tabs.scss" global>:global(.s-tabs-bar){border-radius:inherit;height:48px;display:flex;background-color:var(--theme-cards)}:global(.s-tabs-bar) :global([slot=tabs]){display:flex;flex:1 0 auto;position:relative;white-space:nowrap}:global(.s-tabs-bar) :global(.s-slide-group){width:100%}:global(.s-tabs-bar.grow) :global(.s-tab){flex:1 0 auto;max-width:none}:global(.s-tabs-bar.centered){justify-content:center}:global(.s-tabs-bar.right){justify-content:flex-end}:global(.s-tabs-bar.icons){height:72px}:global(.s-tabs-bar.icons) :global(.s-tab){flex-direction:column}:global(.s-tabs-bar.icons) :global(.s-tab)>:global(.s-icon){margin-bottom:6px}:global(.s-tabs-bar.fixed-tabs) :global(.s-tab){flex:1 1 auto;width:100%}:global(.s-tabs-bar.fixed-tabs) :global(.s-tab:last-child){margin-right:auto}:global(.s-tab-slider){bottom:0;margin:0!important;position:absolute;transition:.3s cubic-bezier(.25,.8,.5,1);z-index:1;background-color:currentColor;height:2px}:global(.s-tabs){flex:1 1 auto;width:100%}:global(.s-tabs.vertical){display:flex}:global(.s-tabs.vertical) :global(.s-tabs-bar){flex:1 0 auto;height:auto}:global(.s-tabs.vertical) :global(.s-tabs-bar) :global(.s-slide-group__next),:global(.s-tabs.vertical) :global(.s-tabs-bar) :global(.s-slide-group__prev){display:none}:global(.s-tabs.vertical) :global(.s-tabs-bar) :global([slot=tabs]){flex-direction:column}:global(.s-tabs.vertical) :global(.s-tabs-bar) :global(.s-tab-slider){left:0;width:2px}:global(.s-tabs.vertical) :global(.s-tabs-bar) :global(.s-tab){height:48px}:global(.s-tabs.vertical) :global(.s-tabs-bar.icons) :global(.s-tab){height:72px}</style>

<div class="s-tabs" role="tablist" class:vertical>
  <div
    class="s-tabs-bar {klass}"
    role="tablist"
    class:fixed-tabs={fixedTabs}
    class:grow
    class:centered
    class:right
    class:icons>
    <SlideGroup
      bind:value
      mandatory
      {centerActive}
      {showArrows}
      on:change={moveSlider}
      on:change>
      <slot name="tabs" />
      {#if slider}
        <div class="s-tab-slider {sliderClass}" bind:this={sliderElement} />
      {/if}
    </SlideGroup>
  </div>
  <Window bind:this={windowComponent}>
    <slot />
  </Window>
</div>
