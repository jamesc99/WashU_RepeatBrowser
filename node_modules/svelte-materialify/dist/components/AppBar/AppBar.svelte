<script>
  import Style from '../../internal/Style';

  let klass = '';
  export { klass as class };
  export let height = '56px';
  export let tile = false;
  export let flat = false;
  export let dense = false;
  export let prominent = false;
  export let fixed = false;
  export let absolute = false;
  export let collapsed = false;
  export let style = '';
</script>

<style lang="scss" src="./AppBar.scss" global>:global(.s-app-bar){background-color:var(--theme-app-bar);contain:layout;display:block;flex:1 1 auto;max-width:100%;position:relative;z-index:5;transition:.25s cubic-bezier(.4,0,.2,1)}:global(.s-app-bar) :global(.s-app-bar__wrapper){height:var(--s-app-bar-height);align-items:center;display:flex;padding:4px}:global(.s-app-bar) :global(.s-app-bar__wrapper) :global(.s-btn.fab){width:48px;height:48px}:global(.s-app-bar) :global(.s-app-bar__title){padding-left:16px;font-size:1.25rem;line-height:1.5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:global(.s-app-bar:not(.tile)){border-top-left-radius:inherit;border-top-right-radius:inherit}:global(.s-app-bar:not(.flat)){box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}:global(.s-app-bar.dense) :global(.s-app-bar__wrapper){height:48px;padding:0}:global(.s-app-bar.prominent) :global(.s-app-bar__wrapper){height:128px;align-items:flex-start}:global(.s-app-bar.prominent) :global(.s-app-bar__title){align-self:flex-end;padding-bottom:6px;padding-top:0}:global(.s-app-bar.fixed){position:fixed;top:0}:global(.s-app-bar.absolute){position:absolute;top:0}:global(.s-app-bar.hidden){transform:translate(-100%)}:global(.s-app-bar.collapsed){border-bottom-right-radius:24px;max-width:112px;overflow:hidden}</style>

<header
  class="s-app-bar {klass}"
  class:tile
  class:flat
  class:dense
  class:prominent
  class:fixed
  class:absolute
  class:collapsed
  use:Style={{ 'app-bar-height': height }}
  {style}>
  <div class="s-app-bar__wrapper">
    <slot name="icon" />
    {#if !collapsed}
      <div class="s-app-bar__title">
        <slot name="title" />
      </div>
    {/if}
    <slot />
  </div>
  <slot name="extension" />
</header>
