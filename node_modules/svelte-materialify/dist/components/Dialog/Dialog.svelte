<script>
  import Overlay from '../Overlay';
  import Style from '../../internal/Style';
  import { scale } from 'svelte/transition';

  let klass = '';
  export { klass as class };
  export let active = false;
  export let persistent = false;
  export let disabled = false;
  export let width = 500;
  export let fullscreen = false;
  export let transition = scale;
  export let overlay = {};

  function close() {
    if (!persistent) active = false;
  }
  $: visible = active && !disabled;
</script>

<style lang="scss" src="./Dialog.scss" global>:global(.s-dialog){align-items:center;display:flex;height:100%;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition:.2s cubic-bezier(.25,.8,.25,1),z-index 1ms;width:100%;z-index:6;outline:none}:global(.s-dialog__content){background-color:var(--theme-surface);border-radius:4px;margin:24px;overflow-y:auto;pointer-events:auto;z-index:inherit;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}:global(.s-dialog__content:not(.fullscreen)){max-height:90%;width:var(--s-dialog-width)}:global(.s-dialog__content.fullscreen){border-radius:0;margin:0;height:100%;width:100%;position:fixed;overflow-y:auto;top:0;left:0}:global(.s-dialog__content)>:global(.s-card)>:global(.s-card-title){font-size:1.25rem;font-weight:500;letter-spacing:.0125em;padding:16px 24px 10px}:global(.s-dialog__content)>:global(.s-card)>:global(.s-card-subtitle),:global(.s-dialog__content)>:global(.s-card)>:global(.s-card-text){padding:0 24px 20px}:global(.fullscreen){border-radius:0;margin:0;height:100%;position:fixed;overflow-y:auto;top:0;left:0}:global(.fullscreen)>:global(.s-card){min-height:100%;min-width:100%;margin:0!important;padding:0!important}</style>

{#if visible}
  <div role="document" class="s-dialog" use:Style={{ 'dialog-width': width }}>
    <div
      class="s-dialog__content {klass}"
      class:fullscreen
      transition:transition={{ duration: 300, start: 0.1 }}
      on:introstart
      on:outrostart
      on:introend
      on:outroend>
      <slot />
    </div>
  </div>
{/if}
<Overlay {...overlay} active={visible} on:click={close} />
