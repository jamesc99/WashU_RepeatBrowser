<script>
  import { scale } from 'svelte/transition';
  import Style from '../../internal/Style';

  let klass = '';
  export { klass as class };
  export let value = '';
  export let active = true;
  export let bordered = false;
  export let dot = false;
  export let tile = false;
  export let bottom = false;
  export let left = false;
  export let label = 'Badge';
  export let transition = scale;
  export let offsetX = 6;
  export let offsetY = 6;
</script>

<style lang="scss" src="./Badge.scss" global>:global(.s-badge){position:relative}:global(.s-badge),:global(.s-badge) :global(.s-badge__badge){display:inline-block;line-height:1}:global(.s-badge) :global(.s-badge__badge){color:#fff;font-size:12px;height:20px;letter-spacing:0;min-width:20px;padding:4px 6px;pointer-events:auto;position:absolute;text-align:center;text-indent:0;top:auto;transition:.3s cubic-bezier(.25,.8,.5,1);white-space:nowrap;right:auto}:global(.s-badge) :global(.s-badge__badge:after){color:var(--theme-cards)}:global(.s-badge) :global(.s-badge__badge) :global(.s-icon){color:inherit;font-size:12px;margin:0 -2px}:global(.s-badge) :global(.s-badge__badge) :global(.s-img){height:12px;width:12px}:global(.s-badge) :global(.s-badge__badge:not(.bottom)){bottom:calc(100% - var(--s-badge-offset-y))}:global(.s-badge) :global(.s-badge__badge:not(.left)){left:calc(100% - var(--s-badge-offset-x))}:global(.s-badge) :global(.s-badge__badge.bottom){bottom:auto;top:calc(100% - var(--s-badge-offset-y))}:global(.s-badge) :global(.s-badge__badge.left){left:auto;right:calc(100% - var(--s-badge-offset-x))}:global(.s-badge) :global(.s-badge__badge:not(.tile)){border-radius:10px}:global(.s-badge) :global(.s-badge__badge.bordered:after){border-radius:inherit;border-width:2px;border-style:solid;bottom:0;content:"";left:0;position:absolute;right:0;top:0;transform:scale(1.15)}:global(.s-badge) :global(.s-badge__badge.dot){border-radius:4.5px;height:9px;min-width:0;padding:0;width:9px}:global(.s-badge) :global(.s-badge__badge.dot:after){border-width:1.5px}:global(.s-badge) :global(.s-badge__wrapper){flex:0 1;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}</style>

<span class="s-badge">
  <slot />
  <span class="s-badge__wrapper">
    {#if active}
      <span
        class="s-badge__badge {klass}"
        transition:transition
        on:introstart
        on:outrostart
        on:introend
        on:outroend
        class:bordered
        class:dot
        class:tile
        class:bottom
        class:left
        role="status"
        aria-label={label}
        aria-live="polite"
        aria-atomic="true"
        use:Style={{ 'badge-offset-x': offsetX, 'badge-offset-y': offsetY }}>
        <slot name="badge">{value}</slot>
      </span>
    {/if}
  </span>
</span>
