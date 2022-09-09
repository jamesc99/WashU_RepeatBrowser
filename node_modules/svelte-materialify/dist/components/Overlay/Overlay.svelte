<script>
  import { fade } from 'svelte/transition';
  import BackgroundColor from '../../internal/BackgroundColor';

  let klass = '';
  export let transition = fade;
  export let inOpts = { duration: 250 };
  export let outOpts = { duration: 250 };
  export let active = true;
  export let opacity = 0.46;
  export let color = 'rgb(33, 33, 33)';
  export let index = 5;
  export let absolute = false;
  export let style = '';
  export { klass as class };
</script>

<style lang="scss" src="./Overlay.scss">.s-overlay{align-items:center;border-radius:inherit;display:flex;justify-content:center;position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:auto}.s-overlay.absolute{position:absolute}.s-overlay__scrim{border-radius:inherit;bottom:0;height:100%;left:0;position:absolute;right:0;top:0;transition:inherit;width:100%;will-change:opacity}.s-overlay__content{position:relative}</style>

{#if active}
  <div
    in:transition={inOpts}
    out:transition={outOpts}
    class="s-overlay {klass}"
    class:absolute
    on:click
    style="z-index:{index};{style}">
    <div class="s-overlay__scrim" use:BackgroundColor={color} style="opacity:{opacity}" />
    <div class="s-overlay__content">
      <slot />
    </div>
  </div>
{/if}
