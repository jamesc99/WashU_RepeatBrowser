<script>
  let klass = '';
  export { klass as class };
  export let style = null;
</script>

<style lang="scss" src="./CardSubtitle.scss" global>:global(.s-card-subtitle){color:var(--theme-text-secondary);font-size:.875rem;font-weight:400;line-height:1.375rem;letter-spacing:.0071428571em;padding:16px}:global(.s-card-subtitle)+:global(.s-card-text){padding-top:0}</style>

<div class="s-card-subtitle {klass}" {style}>
  <slot />
</div>
