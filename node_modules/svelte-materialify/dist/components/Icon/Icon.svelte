<script>
  import Style from '../../internal/Style';

  let klass = '';
  export { klass as class };
  export let size = '24px';
  export let width = size;
  export let height = size;
  export let viewWidth = '24';
  export let viewHeight = '24';
  export let rotate = 0;
  export let spin = false;
  export let disabled = false;
  export let path = null;
  export let label = null;
  export let style = null;
  $: {
    width = size;
    height = size;
  }
</script>

<style type="scss" src="./Icon.scss" global>:global(.s-icon){color:var(--theme-icons-active);font-size:var(--s-icon-size);transform:rotate(var(--s-icon-rotate));line-height:1;letter-spacing:normal;text-transform:none;display:inline-flex;font-feature-settings:"liga";justify-content:center;position:relative;align-items:center;text-indent:0;vertical-align:middle;cursor:inherit;user-select:none;direction:ltr;transition:.3s cubic-bezier(.25,.8,.5,1),visibility 0s}:global(.s-icon.disabled){color:var(--theme-icons-inactive)}:global(.s-icon.spin){animation:s-icon-spin 1s linear infinite}:global(.s-icon)>:global(svg){fill:currentColor}@keyframes -global-s-icon-spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}</style>

<i
  aria-hidden="true"
  class="s-icon {klass}"
  class:spin
  aria-label={label}
  class:disabled
  use:Style={{ 'icon-size': size, 'icon-rotate': `${rotate}deg` }}
  aria-disabled={disabled}
  {style}>
  {#if path}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {width}
      {height}
      viewBox="0 0 {viewWidth} {viewHeight}">
      <path d={path}>
        {#if label}
          <title>{label}</title>
        {/if}
      </path>
    </svg>
  {/if}
  <slot />
</i>
