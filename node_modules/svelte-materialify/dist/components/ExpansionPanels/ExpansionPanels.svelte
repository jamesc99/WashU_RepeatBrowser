<script context="module">
  export const EXPANSION_PANELS = {};
</script>

<script>
  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  // Classes to add to panel container.
  let klass = '';
  export { klass as class };

  // 0 based indices of the active panels.
  export let value = [];

  // Make multiple panels active at the same time.
  export let multiple = false;

  // Make is necessary for at least one panel to be selected.
  export let mandatory = false;

  // Accordion style panels.
  export let accordion = false;

  // Make panels popout when active.
  export let popout = false;

  // Make panels inset when active.
  export let inset = false;

  // Remove shadow from panels.
  export let flat = false;

  // Remove border radius from panels.
  export let tile = false;

  // Disable all the panels.
  export let disabled = null;

  // Styles to add to the panel container.
  export let style = null;

  const dispatch = createEventDispatcher();
  const values = writable(value);
  const Disabled = writable(disabled);

  $: values.set(value);
  $: Disabled.set(disabled);

  let startIndex = -1;

  setContext(EXPANSION_PANELS, {
    values,
    Disabled,
    selectPanel: (index) => {
      if (value.includes(index)) {
        if (!(mandatory && value.length === 1)) {
          value.splice(value.indexOf(index), 1);
          value = value;
          dispatch('change', { index, active: false });
        }
      } else {
        if (multiple) {
          value.push(index);
          value = value;
        } else {
          value = [index];
        }
        dispatch('change', { index, active: true });
      }
    },
    index: () => {
      startIndex += 1;
      return startIndex;
    },
  });
</script>

<style lang="scss" src="./ExpansionPanels.scss" global>:global(.s-expansion-panels){border-radius:4px;display:flex;flex:0 1 auto;position:relative;max-width:100%;transition:.3s cubic-bezier(.25,.8,.5,1);flex-wrap:wrap;justify-content:center;list-style-type:none;padding:0;width:100%;z-index:1}:global(.s-expansion-panels)>:global(:first-child){border-top-left-radius:inherit;border-top-right-radius:inherit}:global(.s-expansion-panels)>:global(:last-child){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}:global(.s-expansion-panels.accordion)>:global(.s-expansion-panel){margin-top:0!important}:global(.s-expansion-panels.accordion)>:global(.s-expansion-panel:after){opacity:1!important}:global(.s-expansion-panels.popout)>:global(.s-expansion-panel){max-width:calc(100% - 32px)}:global(.s-expansion-panels.popout)>:global(.s-expansion-panel.active){max-width:calc(100% + 16px)}:global(.s-expansion-panels.inset)>:global(.s-expansion-panel){max-width:100%}:global(.s-expansion-panels.inset)>:global(.s-expansion-panel.active){max-width:calc(100% - 32px)}:global(.s-expansion-panels.flat)>:global(.s-expansion-panel:after){border-top:none}:global(.s-expansion-panels.flat)>:global(.s-expansion-panel:before){box-shadow:none}:global(.s-expansion-panels.tile),:global(.s-expansion-panels.tile)>:global(.s-expansion-panel:before){border-radius:0}:global(.s-expansion-panels:not(.accordion):not(.tile))>:global(.s-expansion-panel.active){border-radius:4px}:global(.s-expansion-panels:not(.accordion):not(.tile))>:global(.s-expansion-panel.active)+:global(.s-expansion-panel){border-top-left-radius:4px;border-top-right-radius:4px}</style>

<div
  class="s-expansion-panels {klass}"
  class:accordion
  class:popout
  class:inset
  class:flat
  class:tile
  {style}>
  <slot />
</div>
