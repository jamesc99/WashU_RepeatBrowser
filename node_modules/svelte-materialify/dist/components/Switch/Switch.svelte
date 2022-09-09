<script context="module">
  import uid from '../../internal/uid';
</script>

<script>
  import TextColor from '../../internal/TextColor';

  // Add class to switch wrapper.
  let klass = '';
  export { klass as class };

  // Color of the switch when active.
  export let color = 'primary';

  // The value for the switch.
  export let value = null;

  // Combines components into a single group.
  export let group = [];

  // Get/Set checked state.
  export let checked = false;

  // make switch inset.
  export let inset = false;

  // Makes the switch dense.
  export let dense = false;

  // Disables the switch.
  export let disabled = false;

  // Id for switch.
  export let id = null;

  // Styles to add to switch.
  export let style = null;

  // The <input/> element of the switch.
  export let inputElement = null;

  id = id || `s-switch-${uid(5)}`;

  const hasValidGroup = Array.isArray(group);
  if (hasValidGroup && value) {
    if (group.indexOf(value) >= 0) checked = true;
  }

  function groupUpdate() {
    if (hasValidGroup && value) {
      const i = group.indexOf(value);
      if (i < 0) {
        group.push(value);
      } else {
        group.splice(i, 1);
      }
      group = group;
    }
  }
</script>

<style lang="scss" src="./Switch.scss" global>:global(.s-switch__thumb),:global(.s-switch__track){background-color:currentColor;pointer-events:none}:global(.s-switch__track){color:var(--theme-controls-track-inactive);border-radius:8px;width:36px;height:14px;left:2px;position:absolute;opacity:.6;right:2px;top:calc(50% - 7px);transition:background-color .3s cubic-bezier(.25,.8,.5,1);will-change:background-color}:global(.s-switch__thumb){color:var(--theme-controls-thumb-inactive);border-radius:50%;top:calc(50% - 10px);height:20px;position:relative;width:20px;display:flex;justify-content:center;align-items:center;transition:.3s cubic-bezier(.25,.8,.5,1);will-change:transform;box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}:global(.s-switch__thumb:before){background:currentColor;transform:scale(2);opacity:.2;border-radius:inherit;position:absolute;bottom:0;left:0;right:0;top:0;display:none;transform-origin:center center;content:""}:global(.s-switch){display:flex;margin-bottom:8px;align-items:center;position:relative}:global(.s-switch) :global(label){margin-left:8px}:global(.s-switch__wrapper){width:38px;display:inline-flex;flex:0 0 auto;height:24px;position:relative}:global(.s-switch__wrapper:hover) :global(.s-switch__thumb:before){display:block}:global(.s-switch__wrapper.inset){width:48px}:global(.s-switch__wrapper.inset) :global(.s-switch__track){width:48px;border-radius:14px;height:28px;left:-4px;opacity:.32;top:calc(50% - 14px)}:global(.s-switch__wrapper.inset) :global(.s-switch__thumb){box-shadow:none}:global(.s-switch__wrapper.dense) :global(.s-switch__thumb){width:18px;height:18px}:global(.s-switch__wrapper.dense) :global(.s-switch__track){height:12px;width:32px}:global(.s-switch__wrapper.dense.inset) :global(.s-switch__track){height:22px;width:44px;top:calc(50% - 12px);left:-3px}:global(.s-switch__wrapper.disabled){opacity:.6;pointer-events:none}:global(.s-switch__wrapper.disabled) :global(.s-switch__thumb){color:var(--theme-controls-thumb-disabled)}:global(.s-switch__wrapper.disabled) :global(.s-switch__thumb:before){display:none}:global(.s-switch__wrapper.disabled) :global(.s-switch__track){color:var(--theme-controls-track-disabled)}:global(.s-switch__wrapper)>:global(input){position:absolute;opacity:0;width:100%;height:100%;user-select:none;cursor:pointer}:global(.s-switch__wrapper)>:global(input:checked)~:global(.s-switch__thumb),:global(.s-switch__wrapper)>:global(input:checked)~:global(.s-switch__track){color:inherit}:global(.s-switch__wrapper)>:global(input:checked)~:global(.s-switch__thumb){transform:translate(20px)}</style>

<div class="s-switch {klass}" {style}>
  <div
    class="s-switch__wrapper"
    class:dense
    class:inset
    class:disabled
    use:TextColor={checked && color}>
    <input
      type="checkbox"
      bind:this={inputElement}
      role="switch"
      aria-checked={checked}
      bind:checked
      {id}
      {disabled}
      {value}
      on:change={groupUpdate}
      on:change />
    <div class="s-switch__track" />
    <div class="s-switch__thumb" />
  </div>
  <label for={id}>
    <slot />
  </label>
</div>
