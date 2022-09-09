<script>
  import ItemGroup from '../ItemGroup';

  // Classes to add to button group.
  let klass = '';
  export { klass as class };

  // Does not remove box shadow.
  export let elevated = false;

  // Remove border.
  export let borderless = false;

  // Remove border radius.
  export let tile = false;

  // Add border radius to the first and last button.
  export let rounded = false;

  // Identifies buttons as active with this class.
  export let activeClass = 'active';

  // Array or string with the active button(s) value.
  export let value = [];

  // Forces a value to always be selected (if available).
  export let mandatory = false;

  // Allow multiple selections, makes the value prop an array.
  export let multiple = false;

  // Maximun number of selections.
  export let max = Infinity;

  // Styles to apply to button group.
  export let style = null;
</script>

<style lang="scss" src="./ButtonGroup.scss" global>:global(.s-btn-group){border-radius:4px;display:inline-flex;max-width:100%;flex:0 1 auto;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1)}:global(.s-btn-group:not(.elevated)) :global(.s-btn-group-item.s-btn){box-shadow:none}:global(.s-btn-group.borderless) :global(.s-btn-group-item.s-btn){border-width:0}:global(.s-btn-group.tile){border-radius:0}:global(.s-btn-group.rounded){border-radius:24px}</style>

<ItemGroup on:change bind:value {activeClass} {multiple} {mandatory} {max}>
  <div
    class="s-btn-group {klass}"
    class:elevated
    class:borderless
    class:tile
    class:rounded
    {style}>
    <slot />
  </div>
</ItemGroup>
