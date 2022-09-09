<script>
  let klass = '';
  export let fluid = false;
  export let style = null;
  export { klass as class };
</script>

<style lang="scss" global>:global(.s-container){width:100%;padding:12px;margin-right:auto;margin-left:auto}:global(.s-container.fluid){max-width:100%}@media only screen and (min-width:960px){:global(.s-container){max-width:900px}}@media only screen and (min-width:1264px){:global(.s-container){max-width:1185px}}@media only screen and (min-width:1904px){:global(.s-container){max-width:1785px}}</style>

<div class="s-container {klass}" class:fluid {style}>
  <slot />
</div>
