<script>
  let klass = '';
  export { klass as class };
  export let style = null;
</script>

<style lang="scss" src="./CardActions.scss" global>:global(.s-card-actions){align-items:center;display:flex;padding:8px}</style>

<div class="s-card-actions {klass}" {style}>
  <slot />
</div>
