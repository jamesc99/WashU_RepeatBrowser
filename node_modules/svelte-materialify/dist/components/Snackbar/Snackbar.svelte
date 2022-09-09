<script>
  import { scale } from 'svelte/transition';
  import Style from '../../internal/Style';

  let klass = '';
  export { klass as class };
  export let absolute = false;
  export let active = true;
  export let top = false;
  export let left = false;
  export let bottom = false;
  export let right = false;
  export let center = false;
  export let offsetX = '8px';
  export let offsetY = '8px';
  export let outlined = false;
  export let text = false;
  export let rounded = false;
  export let tile = false;
  export let timeout = false;
  export let transition = scale;
  export let style = '';

  $: {
    if (active && timeout) {
      setTimeout(() => {
        active = false;
      }, timeout);
    }
  }
</script>

<style lang="scss" src="./Snackbar.scss" global>:global(.s-snackbar__wrapper){display:flex;pointer-events:none;width:100%;bottom:0;top:0;left:0;right:0;padding:var(--s-snackbar-y) var(--s-snackbar-x)}:global(.s-snackbar__wrapper:not(.absolute)){position:fixed;z-index:1000}:global(.s-snackbar__wrapper.absolute){position:absolute;z-index:1}:global(.s-snackbar__wrapper.center){justify-content:center;align-items:center}:global(.s-snackbar__wrapper.left){justify-content:flex-start}:global(.s-snackbar__wrapper.top){align-items:flex-start}:global(.s-snackbar__wrapper.right){justify-content:flex-end}:global(.s-snackbar__wrapper.bottom){align-items:flex-end}:global(.s-snackbar){display:flex;align-items:center;position:relative;pointer-events:auto;padding:14px 16px;font-size:.875rem;letter-spacing:.0178571429em;background-color:#333;color:hsla(0,0%,100%,.87);margin:8px;min-height:48px;min-width:344px;box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}:global(.s-snackbar:not(.tile)){border-radius:4px}:global(.s-snackbar.outlined){background-color:transparent;color:#333;border:thin solid}:global(.s-snackbar.text){color:#333;background-color:inherit}:global(.s-snackbar.text:before){content:"";background-color:currentColor;border-radius:inherit;top:0;bottom:0;left:0;right:0;opacity:.12;position:absolute;pointer-events:none}:global(.s-snackbar.rounded){border-radius:9999px}:global(.s-snackbar) :global(.s-btn){padding:0 8px}</style>

<div
  class="s-snackbar__wrapper"
  class:absolute
  class:top
  class:left
  class:bottom
  class:right
  class:center
  use:Style={{ 'snackbar-x': offsetX, 'snackbar-y': offsetY }}>
  {#if active}
    <div
      transition:transition
      on:introstart
      on:outrostart
      on:introend
      on:outroend
      class="s-snackbar {klass}"
      class:outlined
      class:text
      class:rounded
      class:tile
      {style}>
      <slot />
    </div>
  {/if}
</div>
