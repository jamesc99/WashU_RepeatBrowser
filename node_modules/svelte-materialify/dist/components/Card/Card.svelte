<script>
  import ProgressLinear from '../ProgressLinear';

  let klass = '';
  export { klass as class };
  export let flat = false;
  export let tile = false;
  export let outlined = false;
  export let raised = false;
  export let shaped = false;
  export let hover = false;
  export let link = false;
  export let loading = false;
  export let disabled = false;
  export let style = null;
</script>

<style lang="scss" src="./Card.scss" global>:global(.s-card){background-color:var(--theme-cards);color:var(--theme-text-primary);display:block;max-width:100%;outline:none;text-decoration:none;transition-property:box-shadow,opacity;overflow-wrap:break-word;position:relative;white-space:normal}:global(.s-card:not(.flat)){box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}:global(.s-card:not(.tile)){border-radius:4px}:global(.s-card.outlined){border:thin solid rgba(0,0,0,.12);box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}:global(.s-card.raised){box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}:global(.s-card.shaped){border-radius:24px 4px}:global(.s-card.hover){cursor:pointer;transition:box-shadow .4s cubic-bezier(.25,.8,.25,1)}:global(.s-card.hover:focus),:global(.s-card.hover:hover){box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}:global(.s-card.link),:global(.s-card.link) :global(.s-chip){cursor:pointer}:global(.s-card.link:before){background:currentColor;bottom:0;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:opacity .2s}:global(.s-card.link:focus:before){opacity:.08}:global(.s-card.disabled){pointer-events:none;user-select:none}:global(.s-card.disabled)>:global(:not(.s-progress-linear)){opacity:.6;transition:inherit}:global(.s-card)>:global(:first-child:not(.s-btn):not(.s-chip)),:global(.s-card)>:global([slot=progress])+:global(:not(.s-btn):not(.s-chip)){border-top-left-radius:inherit;border-top-right-radius:inherit}:global(.s-card)>:global(:last-child:not(.s-btn):not(.s-chip)){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}</style>

<div
  class="s-card {klass}"
  class:flat
  class:tile
  class:outlined
  class:raised
  class:shaped
  class:hover
  class:link
  class:disabled
  {style}>
  {#if loading}
    <slot name="progress">
      <ProgressLinear indeterminate />
    </slot>
  {/if}
  <slot />
</div>
