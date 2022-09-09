<script>
  import { getContext } from 'svelte';

  let klass = '';
  export { klass as class };

  export let numeric = false;

  const isTableHead = getContext('is-table-head') === true;
</script>

<style lang="scss" src="./DataTableCell.scss" global>:global(.s-tbl-cell){padding-left:16px;padding-right:16px}:global(.s-tbl-cell.numeric){text-align:right}:global(th.s-tbl-cell){height:56px;text-align:left}:global(td.s-tbl-cell){height:52px}</style>

{#if isTableHead}
  <th class="s-tbl-cell {klass}" class:numeric>
    <slot />
  </th>
{:else}
  <td class="s-tbl-cell {klass}" class:numeric>
    <slot />
  </td>
{/if}
