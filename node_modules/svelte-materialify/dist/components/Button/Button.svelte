<script>
  import Ripple from '../../actions/Ripple';
  import Class from '../../internal/Class';

  let klass = '';
  export { klass as class };
  export let fab = false;
  export let icon = false;
  export let block = false;
  export let size = 'default';
  export let tile = false;
  export let text = false;
  export let depressed = false;
  export let outlined = false;
  export let rounded = false;
  export let disabled = null;
  export let active = false;
  export let activeClass = 'active';
  export let type = 'button';
  export let ripple = {};
  export let style = null;
  export let button = null;
</script>

<style lang="scss" src="./Button.scss" global>:global(.s-btn){align-items:center;border-radius:4px;display:inline-flex;flex:0 0 auto;overflow:hidden;position:relative;outline:0;justify-content:center;user-select:none;vertical-align:middle;white-space:nowrap;text-decoration:none;transition-duration:.28s;transition-property:box-shadow,transform,opacity;background-color:var(--theme-app-bar);box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}:global(.s-btn) :global(.s-icon),:global(.s-btn) :global(a){color:inherit}:global(.s-btn) :global(.s-btn__content){display:flex;align-items:center;flex:1 0 auto;color:inherit;justify-content:inherit;line-height:normal;position:relative;font-size:inherit;font-weight:500;letter-spacing:.0892857143em;text-transform:uppercase}:global(.s-btn:before){border-radius:inherit;bottom:0;color:inherit;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:opacity .2s cubic-bezier(.4,0,.6,1);background-color:currentColor}:global(.s-btn.size-x-small){font-size:.625rem}:global(.s-btn.size-small){font-size:.75rem}:global(.s-btn.size-default),:global(.s-btn.size-large){font-size:.875rem}:global(.s-btn.size-x-large){font-size:1rem}:global(.s-btn:not(.disabled):hover:before){opacity:.08}:global(.s-btn:not(.disabled).active:before){opacity:.18}:global(.s-btn:not(.disabled).focus-visible:before){opacity:.24}:global(.s-btn:not(.outlined).error-color),:global(.s-btn:not(.outlined).info-color),:global(.s-btn:not(.outlined).primary-color),:global(.s-btn:not(.outlined).secondary-color),:global(.s-btn:not(.outlined).success-color),:global(.s-btn:not(.outlined).warning-color){color:#fff}:global(.s-btn:not(.icon):not(.s-btn--fab).size-x-small){height:20px;min-width:36px;padding:0 8.8888888889px}:global(.s-btn:not(.icon):not(.s-btn--fab).size-small){height:28px;min-width:50px;padding:0 12.4444444444px}:global(.s-btn:not(.icon):not(.s-btn--fab).size-default){height:36px;min-width:64px;padding:0 16px}:global(.s-btn:not(.icon):not(.s-btn--fab).size-large){height:44px;min-width:78px;padding:0 19.5555555556px}:global(.s-btn:not(.icon):not(.s-btn--fab).size-x-large){height:52px;min-width:92px;padding:0 23.1111111111px}:global(.s-btn:not(.disabled):not(.depressed)){will-change:box-shadow}:global(.s-btn.block){display:flex;flex:1 0 auto;min-width:100%!important;max-width:auto}:global(.s-btn.tile){border-radius:0}:global(.s-btn.text){background-color:transparent}:global(.s-btn.depressed){box-shadow:none}:global(.s-btn.outlined){border:1px solid;background-color:transparent!important}:global(.s-btn.rounded){border-radius:9999px}:global(.s-btn.disabled){pointer-events:none;color:var(--theme-buttons-disabled)}:global(.s-btn.disabled:not(.flat):not(.text):not(.outlined)){background-color:var(--theme-buttons-disabled)}:global(.s-btn.icon.size-x-small){height:20px;width:20px}:global(.s-btn.icon.size-small){height:28px;width:28px}:global(.s-btn.icon.size-default){height:36px;width:36px}:global(.s-btn.icon.size-large){height:44px;width:44px}:global(.s-btn.icon.size-x-large){height:52px;width:52px}:global(.s-btn.icon),:global(.s-btn.s-btn--fab){border-radius:50%;min-width:0;min-height:0;padding:0}:global(.s-btn.icon.size-x-small) :global(.s-icon),:global(.s-btn.s-btn--fab.size-x-small) :global(.s-icon){font-size:18px}:global(.s-btn.icon.size-default) :global(.s-icon),:global(.s-btn.icon.size-small) :global(.s-icon),:global(.s-btn.s-btn--fab.size-default) :global(.s-icon),:global(.s-btn.s-btn--fab.size-small) :global(.s-icon){font-size:24px}:global(.s-btn.icon.size-large) :global(.s-icon),:global(.s-btn.s-btn--fab.size-large) :global(.s-icon){font-size:28px}:global(.s-btn.icon.size-x-large) :global(.s-icon),:global(.s-btn.s-btn--fab.size-x-large) :global(.s-icon){font-size:32px}:global(.s-btn.s-btn--fab.size-x-small){height:32px;width:32px}:global(.s-btn.s-btn--fab.size-small){height:40px;width:40px}:global(.s-btn.s-btn--fab.size-default){height:56px;width:56px}:global(.s-btn.s-btn--fab.size-large){height:64px;width:64px}:global(.s-btn.s-btn--fab.size-x-large){height:72px;width:72px}</style>

<button
  bind:this={button}
  class="s-btn size-{size} {klass}"
  class:s-btn--fab={fab}
  class:icon
  class:block
  class:tile
  class:text={text || icon}
  class:depressed={depressed || text || disabled || outlined || icon}
  class:outlined
  class:rounded
  class:disabled
  use:Class={[active && activeClass]}
  {type}
  {style}
  {disabled}
  aria-disabled={disabled}
  use:Ripple={ripple}
  on:click
  {...$$restProps}>
  <span class="s-btn__content">
    <slot />
  </span>
</button>
