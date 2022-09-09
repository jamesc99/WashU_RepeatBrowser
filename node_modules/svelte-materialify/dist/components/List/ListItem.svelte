<script>
  import { getContext } from 'svelte';
  import Ripple from '../../actions/Ripple';
  import Class from '../../internal/Class';

  const role = getContext('S_ListItemRole');
  const ITEM_GROUP = getContext('S_ListItemGroup');
  const DEFAULTS = {
    select: () => null,
    register: () => null,
    index: () => null,
    activeClass: 'active',
  };
  const ITEM = ITEM_GROUP ? getContext(ITEM_GROUP) : DEFAULTS;

  let klass = '';
  export { klass as class };
  export let activeClass = ITEM.activeClass;
  export let value = ITEM.index();
  export let active = false;
  export let dense = false;
  export let disabled = null;
  export let multiline = false;
  export let link = role;
  export let selectable = !link;
  export let ripple = getContext('S_ListItemRipple') || role || false;
  export let style = null;

  ITEM.register((values) => {
    active = values.includes(value);
  });

  function click() {
    if (!disabled) ITEM.select(value);
  }
</script>

<style lang="scss" src="./ListItem.scss" global>:global(.s-list-item__content){align-items:center;align-self:center;display:flex;flex-wrap:wrap;flex:1 1;overflow:hidden;padding:12px 0}:global(.s-list-item__content)>:global(*){line-height:1.1;flex:1 0 100%}:global(.s-list-item__content)>:global(:not(:last-child)){margin-bottom:2px}:global(.s-list-item__subtitle),:global(.s-list-item__title){flex:1 1 100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.2}:global(.s-list-item__title){align-self:center;font-size:1rem}:global(.s-list-item__subtitle){font-size:.875rem;color:var(--theme-text-secondary)}:global(.s-list-item){align-items:center;display:flex;flex:1 1 100%;letter-spacing:normal;min-height:48px;outline:none;padding:0 16px;position:relative;text-decoration:none}:global(.s-list-item) :global(.s-avatar){align-self:center;margin-top:8px;margin-bottom:8px}:global(.s-list-item) :global(.s-icon){align-self:flex-start;margin-top:16px;margin-bottom:16px}:global(.s-list-item) :global(.s-avatar),:global(.s-list-item) :global(.s-icon){display:inline-flex;min-width:24px}:global(.s-list-item) :global([slot=prepend]) :global(.s-avatar){margin-right:16px}:global(.s-list-item) :global([slot=prepend]) :global(.s-checkbox),:global(.s-list-item) :global([slot=prepend]) :global(.s-icon),:global(.s-list-item) :global([slot=prepend]) :global(.s-radio){margin-right:32px}:global(.s-list-item.link){cursor:pointer;user-select:none}:global(.s-list-item.link:before){background-color:currentColor;bottom:0;top:0;left:0;right:0;content:"";pointer-events:none;position:absolute;opacity:0;transition:.3s cubic-bezier(.25,.8,.5,1)}:global(.s-list-item.link:not(.active):hover:before){opacity:.04}:global(.s-list-item.selectable){user-select:auto}:global(.s-list-item.multiline) :global(.s-list-item__subtitle),:global(.s-list-item.multiline) :global(.s-list-item__title){white-space:normal}:global(.s-list-item:not(.disabled).focus-visible:before){opacity:.12}:global(.s-list-item.disabled){pointer-events:none;color:var(--theme-text-disabled)}:global(.s-list-item.flat:before){display:none}:global(.s-list-item.active:before){opacity:.12}:global(.s-list-item.active) :global(.s-icon){color:inherit}:global(.s-list-item:after){content:"";min-height:inherit;font-size:0}:global(.s-list-item:not(.active)){color:var(--theme-text-primary)}:global(.s-list-item.dense),:global(.s-list.dense) :global(.s-list-item){min-height:32px}:global(.s-list-item.dense) :global(.s-icon),:global(.s-list.dense) :global(.s-list-item) :global(.s-icon){margin-top:8px;margin-bottom:8px}:global(.s-list-item.dense) :global([slot=prepend]) :global(.s-checkbox),:global(.s-list-item.dense) :global([slot=prepend]) :global(.s-icon),:global(.s-list-item.dense) :global([slot=prepend]) :global(.s-radio),:global(.s-list.dense) :global(.s-list-item) :global([slot=prepend]) :global(.s-checkbox),:global(.s-list.dense) :global(.s-list-item) :global([slot=prepend]) :global(.s-icon),:global(.s-list.dense) :global(.s-list-item) :global([slot=prepend]) :global(.s-radio){margin-right:24px}:global(.s-list-item.dense) :global(.s-list-item__content),:global(.s-list.dense) :global(.s-list-item) :global(.s-list-item__content){padding:8px 0}:global(.s-list-item.dense) :global(.s-list-item__subtitle),:global(.s-list-item.dense) :global(.s-list-item__title),:global(.s-list.dense) :global(.s-list-item) :global(.s-list-item__subtitle),:global(.s-list.dense) :global(.s-list-item) :global(.s-list-item__title){font-size:.8125rem;font-weight:500;line-height:1rem}</style>

<div
  class="s-list-item {klass}"
  use:Class={[active && activeClass]}
  {role}
  tabindex={link ? 0 : -1}
  aria-selected={role === 'option' ? active : null}
  class:dense
  class:disabled
  class:multiline
  class:link
  class:selectable
  use:Ripple={ripple}
  on:click={click}
  on:click
  on:dblclick
  {style}>
  <slot name="prepend" />
  <div class="s-list-item__content">
    <div class="s-list-item__title">
      <slot />
    </div>
    <div class="s-list-item__subtitle">
      <slot name="subtitle" />
    </div>
  </div>
  <slot name="append" />
</div>
