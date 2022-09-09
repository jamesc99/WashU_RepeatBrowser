<script>
  let klass = '';
  export { klass as class };
  export let absolute = false;
  export let fixed = false;
  export let inset = false;
  export let padless = false;
  export let style = null;
</script>

<style lang="scss" src="./Footer.scss" global>:global(.s-footer){background-color:var(--theme-app-bar);align-items:center;display:flex;flex:0 1 auto!important;flex-wrap:wrap;padding:6px 16px;position:relative;transition-duration:.2s;transition-property:background-color,left,right;transition-timing-function:cubic-bezier(.4,0,.2,1);border-radius:0;box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}:global(.s-footer.absolute),:global(.s-footer.fixed){z-index:3;bottom:0;left:0;right:0}:global(.s-footer.absolute){position:absolute}:global(.s-footer.absolute:not(.inset)){width:100%}:global(.s-footer.fixed){position:fixed}:global(.s-footer.padless){padding:0}</style>

<footer
  class="s-footer {klass}"
  class:absolute
  class:fixed
  class:inset
  class:padless
  {style}>
  <slot />
</footer>
