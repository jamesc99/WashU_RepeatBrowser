<script>
  import { setContext } from 'svelte';

  let klass = '';
  export { klass as class };

  setContext('is-table-head', true);
</script>

<style lang="scss" src="./DataTableHead.scss" global>:global(.s-tbl-head){font-weight:500}</style>

<thead class="s-tbl-head {klass}">
  <slot />
</thead>
