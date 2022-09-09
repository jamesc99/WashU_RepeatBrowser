<script>
  let klass = '';
  export { klass as class };
  export let style = null;
</script>

<style lang="scss" src="./CardTitle.scss" global>:global(.s-card-title){align-items:center;display:flex;flex-wrap:wrap;font-size:1.25rem;font-weight:500;letter-spacing:.0125em;line-height:2rem;word-break:break-all;padding:16px}:global(.s-card-title)+:global(.s-card-subtitle),:global(.s-card-title)+:global(.s-card-title){padding-top:0;margin-top:-16px}:global(.s-card-title)+:global(.s-card-subtitle){margin-top:-16px}</style>

<div class="s-card-title {klass}" {style}>
  <slot />
</div>
