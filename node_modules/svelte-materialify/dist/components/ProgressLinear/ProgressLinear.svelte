<script>
  import BackgroundColor from '../../internal/BackgroundColor';

  let klass = '';
  export { klass as class };
  export let value = 0;
  export let active = true;
  export let indeterminate = false;
  export let height = '4px';
  export let backgroundColor = 'primary';
  export let backgroundOpacity = 0.3;
  export let color = backgroundColor;
  export let buffer = 100;
  export let reversed = false;
  export let stream = false;
  export let rounded = false;
  export let striped = false;
  export let style = '';
</script>

<style lang="scss" src="./ProgressLinear.scss">.s-progress-linear{background:transparent;overflow:hidden;position:relative;transition:.2s cubic-bezier(.4,0,.6,1);width:100%;color:var(--theme-text-primary)}.s-progress-linear.inactive{height:0!important}.s-progress-linear.rounded{border-radius:4px}.s-progress-linear .background,.s-progress-linear .determinate,.s-progress-linear .indeterminate{top:0;bottom:0;position:absolute;transition:inherit}.s-progress-linear .determinate.striped{background-image:linear-gradient(135deg,hsla(0,0%,100%,.25) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.25) 0,hsla(0,0%,100%,.25) 75%,transparent 0,transparent);background-size:40px 40px;background-repeat:repeat}.s-progress-linear .indeterminate{right:auto;width:auto;will-change:left,right;background-color:inherit;animation-duration:2.2s;animation-iteration-count:infinite}.s-progress-linear .indeterminate.long{animation-name:indeterminate}.s-progress-linear .indeterminate.short{animation-name:indeterminate-short}.s-progress-linear .stream{background:transparent!important;animation:stream .25s linear infinite;bottom:0;opacity:.3;pointer-events:none;position:absolute;border-top:4px dotted;top:calc(50% - 2px);transition:inherit}.s-progress-linear.reversed .background,.s-progress-linear.reversed .determinate,.s-progress-linear.reversed .indeterminate{right:0}.s-progress-linear.reversed .indeterminate{animation-direction:reverse}.s-progress-linear.reversed .stream{right:auto;animation-direction:reverse}.s-progress-linear:not(.reversed) .background,.s-progress-linear:not(.reversed) .determinate,.s-progress-linear:not(.reversed) .indeterminate{left:0}.s-progress-linear:not(.reversed) .stream{left:auto;right:-8px}.s-progress-linear__content{align-items:center;display:flex;height:100%;left:0;justify-content:center;position:absolute;top:0;width:100%;z-index:2;pointer-events:none}@keyframes indeterminate{0%{left:-90%;right:100%}60%{left:-90%;right:100%}to{left:100%;right:-35%}}@keyframes indeterminate-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}@keyframes stream{to{transform:translateX(-8px)}}</style>

<div
  role="progressbar"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow={value}
  class="s-progress-linear {klass}"
  class:inactive={!active}
  class:reversed
  class:rounded
  style="height:{height};{style}">
  <div
    use:BackgroundColor={backgroundColor}
    class="background"
    style="opacity:{backgroundOpacity};{reversed ? 'right' : 'left'}:{value}%;width:{buffer - value}%" />

  {#if indeterminate}
    <div use:BackgroundColor={color}>
      <div class="indeterminate long" />
      <div class="indeterminate short" />
    </div>
  {:else}
    <div
      use:BackgroundColor={color}
      class="determinate"
      class:striped
      style="width:{value}%" />
  {/if}

  <div class="s-progress-linear__content">
    <slot />
  </div>

  {#if stream}
    <div class="stream {color}" style="width:{100 - buffer}%" />
  {/if}
</div>
