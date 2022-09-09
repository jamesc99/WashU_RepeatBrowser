<script>
  import { getContext, onMount } from 'svelte';
  import { WINDOW } from './Window.svelte';

  let window;
  const registerWindow = getContext(WINDOW);

  let klass = '';
  export { klass as class };
  export let style = null;

  onMount(() => {
    registerWindow(window);
  });
</script>

<style lang="scss" src="./WindowItem.scss" global>:global(.s-window-item){position:relative;display:none;align-items:center;width:100%;float:left;margin-right:-100%;backface-visibility:hidden;transition:.3s cubic-bezier(.25,.8,.5,1)}:global(.s-window-item.active),:global(.s-window-item.next),:global(.s-window-item.prev){display:block}</style>

<div bind:this={window} class="s-window-item {klass}" {style}>
  <slot />
</div>
