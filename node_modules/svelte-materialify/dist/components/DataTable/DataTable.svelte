<script>
  let klass = '';
  export { klass as class };
</script>

<style lang="scss" src="./DataTable.scss" global>:global(.s-tbl){border:1px solid var(--theme-dividers);border-radius:4px;display:inline-flex}:global(.s-tbl) :global(table){border-collapse:collapse}</style>

<div class="s-tbl {klass}">
  <table>
    <slot />
  </table>
</div>
