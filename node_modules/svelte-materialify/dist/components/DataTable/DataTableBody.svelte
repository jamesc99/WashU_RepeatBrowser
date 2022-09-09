<script>
  let klass = '';
  export { klass as class };
</script>

<style lang="scss" src="./DataTableBody.scss" global>:global(.s-tbl-body) :global(.s-tbl-row){border-top:1px solid var(--theme-dividers)}:global(.s-tbl-body) :global(.s-tbl-row:hover){background-color:var(--theme-datatables-row-hover)}</style>

<tbody class="s-tbl-body {klass}">
  <slot />
</tbody>
