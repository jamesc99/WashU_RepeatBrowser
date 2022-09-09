<script>
  import { getContext } from 'svelte';
  import { EXPANSION_PANELS } from './ExpansionPanels.svelte';
  import { slide } from 'svelte/transition';
  import Icon from '../Icon';
  import down from '../../internal/Icons/down';

  const { values, Disabled, selectPanel, index } = getContext(EXPANSION_PANELS);

  // Classes to add to the panel.
  let klass = '';
  export { klass as class };

  // Options for the slide transition.
  export let slideOpts = {};

  // Make the panel readonly.
  export let readonly = false;

  // Disable the panel.
  export let disabled = false;

  // Styles to add to the panel.
  export let style = null;

  const value = index();
  let active = false;

  function toggle() {
    selectPanel(value);
  }

  // Inheriting the disabled value from parent.
  $: disabled = $Disabled == null ? disabled : $Disabled;

  // Checking if panel is active everytime the value has changed.
  $: active = $values.includes(value);
</script>

<style lang="scss" src="./ExpansionPanel.scss" global>:global(.s-expansion-panel__header){align-items:center;border-top-left-radius:inherit;border-top-right-radius:inherit;display:flex;font-size:.9375rem;line-height:1;min-height:48px;outline:none;padding:16px 24px;position:relative;transition:min-height .3s cubic-bezier(.25,.8,.5,1);width:100%;text-align:left}:global(.s-expansion-panel__header:before){background-color:currentColor;border-radius:inherit;bottom:0;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:opacity .3s cubic-bezier(.25,.8,.5,1)}:global(.s-expansion-panel__header:hover:before){opacity:.04}:global(.s-expansion-panel__header.focus-visible:before){opacity:.12}:global(.s-expansion-panel){background-color:var(--theme-cards);color:var(--theme-text-primary);flex:1 0 100%;max-width:100%;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1)}:global(.s-expansion-panel:not(:first-child):after){border-color:var(--theme-dividers);border-top:thin solid;border-top-color:var(--theme-dividers);content:"";left:0;position:absolute;right:0;top:0;transition:border-color .2s cubic-bezier(.4,0,.2,1),opacity .2s cubic-bezier(.4,0,.2,1)}:global(.s-expansion-panel:before){border-radius:inherit;bottom:0;content:"";left:0;position:absolute;right:0;top:0;z-index:-1;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}:global(.s-expansion-panel.disabled){color:var(--theme-text-disabled)}:global(.s-expansion-panel.disabled) :global(.s-expansion-panel__header),:global(.s-expansion-panel.readonly) :global(.s-expansion-panel__header){pointer-events:none}:global(.s-expansion-panel.active)+:global(.s-expansion-panel),:global(.s-expansion-panel.active:not(:first-child)){margin-top:16px}:global(.s-expansion-panel.active)+:global(.s-expansion-panel:after),:global(.s-expansion-panel.active:not(:first-child):after){opacity:0}:global(.s-expansion-panel.active)>:global(.s-expansion-panel__header){min-height:64px}:global(.s-expansion-panel__icon){margin-left:auto;display:inline-flex;margin-bottom:-4px;margin-top:-4px;user-select:none}:global(.s-expansion-panel__content){display:flex;padding:0 24px 16px;flex:1 1 auto;max-width:100%}</style>

<div
  class="s-expansion-panel {klass}"
  aria-expanded={active}
  class:active
  class:readonly
  class:disabled
  {style}>
  <button
    type="button"
    class="s-expansion-panel__header"
    tabindex={disabled ? -1 : null}
    on:click={toggle}>
    <!-- Slot for the title of panel. -->
    <slot name="header" />
    <div class="s-expansion-panel__icon">
      <!-- Slot for the icon at the right of the header. -->
      <slot name="icon" {active}>
        <Icon {disabled} path={down} rotate={active ? 180 : 0} />
      </slot>
    </div>
  </button>
  {#if active}
    <div
      class="s-expansion-panel__content"
      transition:slide={slideOpts}
      on:introstart
      on:outrostart
      on:introend
      on:outroend>
      <slot />
    </div>
  {/if}
</div>
