<script>
  import { setContext, getContext } from 'svelte';

  let klass = '';
  export { klass as class };
  export let dense = null;
  export let disabled = null;
  export let flat = false;
  export let rounded = false;
  export let nav = false;
  export let outlined = false;
  export let style = null;

  let role = null;
  if (!getContext('S_ListItemRole')) {
    setContext('S_ListItemRole', 'listitem');
    role = 'list';
  }
</script>

<style lang="scss" src="./List.scss" global>:global(.s-list){color:var(--theme-text-primary);display:block;padding:8px 0;position:static}:global(.s-list) :global(.s-subheader){padding-top:0}:global(.s-list) :global(.s-list-item.active){color:inherit}:global(.s-list.disabled){pointer-events:none}:global(.s-list.dense) :global(.s-subheader){font-size:.75rem;height:40px;padding:0 8px}:global(.s-list.rounded){padding:8px}:global(.s-list.rounded) :global(.s-list-item){border-radius:32px!important}:global(.s-list.nav){padding-left:8px;padding-right:8px}:global(.s-list.nav) :global(.s-list-item){padding:0 8px;border-radius:4px}:global(.s-list.nav) :global(.s-list-item:before){border-radius:4px}:global(.s-list.nav) :global(.s-list-item:not(:last-child):not(:only-child)),:global(.s-list.rounded) :global(.s-list-item:not(:last-child):not(:only-child)){margin-bottom:8px}:global(.s-list.nav) :global(.s-list-item.dense:not(:last-child):not(:only-child)),:global(.s-list.rounded) :global(.s-list-item.dense:not(:last-child):not(:only-child)){margin-bottom:4px}:global(.s-list.outlined){border:thin solid var(--theme-dividers)}:global(.s-list.flat) :global(.s-list-item:before){display:none}</style>

<div
  {role}
  class="s-list {klass}"
  aria-disabled={disabled}
  class:dense
  class:disabled
  class:flat
  class:nav
  class:outlined
  class:rounded
  {style}>
  <slot />
</div>
