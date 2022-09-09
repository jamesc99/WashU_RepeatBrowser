<script>
  let klass = '';
  export { klass as class };
  export let style = null;
</script>

<style lang="scss" src="./CardText.scss" global>:global(.s-card-text){width:100%;color:var(--theme-text-secondary);font-size:.875rem;font-weight:400;line-height:1.375rem;letter-spacing:.0071428571em;padding:16px}</style>

<div class="s-card-text {klass}" {style}>
  <slot />
</div>
