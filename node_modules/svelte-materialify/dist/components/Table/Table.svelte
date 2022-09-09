<script>
  let klass = '';
  export let dense = false;
  export let fixedHeader = false;
  export let style = null;
  export { klass as class };
</script>

<style lang="scss" src="./Table.scss" global>:global(.s-table__wrapper){overflow:auto}:global(.s-table){background-color:var(--theme-cards);color:var(--theme-text-primary);width:100%;border-spacing:0}:global(.s-table)>:global(tbody)>:global(tr)>:global(td),:global(.s-table)>:global(tbody)>:global(tr)>:global(th),:global(.s-table)>:global(tfoot)>:global(tr)>:global(td),:global(.s-table)>:global(tfoot)>:global(tr)>:global(th),:global(.s-table)>:global(thead)>:global(tr)>:global(td),:global(.s-table)>:global(thead)>:global(tr)>:global(th){padding:0 16px;transition:height cubic-bezier(.4,0,.6,1)}:global(.s-table)>:global(tbody)>:global(tr)>:global(th),:global(.s-table)>:global(tfoot)>:global(tr)>:global(th),:global(.s-table)>:global(thead)>:global(tr)>:global(th){user-select:none;font-size:.875rem;height:48px;letter-spacing:.0071428571em;text-align:left}:global(.s-table)>:global(tbody)>:global(tr)>:global(td),:global(.s-table)>:global(tfoot)>:global(tr)>:global(td),:global(.s-table)>:global(thead)>:global(tr)>:global(td){font-size:.875rem;height:48px}:global(.s-table)>:global(thead)>:global(tr)>:global(th){color:var(--theme-text-secondary)}:global(.s-table)>:global(thead)>:global(tr:last-child)>:global(th){border-bottom:thin solid var(--theme-dividers)}:global(.s-table)>:global(tbody)>:global(tr:not(:last-child))>:global(td),:global(.s-table)>:global(tbody)>:global(tr:not(:last-child))>:global(th){border-bottom:thin solid var(--theme-dividers)}:global(.s-table)>:global(tbody)>:global(tr.active){background:var(--theme-tables-active)}:global(.s-table)>:global(tbody)>:global(tr:hover){background:var(--theme-tables-hover)}:global(.s-table.dense)>:global(tbody)>:global(tr)>:global(td),:global(.s-table.dense)>:global(tbody)>:global(tr)>:global(th),:global(.s-table.dense)>:global(tfoot)>:global(tr)>:global(td),:global(.s-table.dense)>:global(tfoot)>:global(tr)>:global(th),:global(.s-table.dense)>:global(thead)>:global(tr)>:global(td),:global(.s-table.dense)>:global(thead)>:global(tr)>:global(th){height:32px}:global(.s-table.fixed-header)>:global(thead)>:global(tr)>:global(th){border-bottom:0!important;position:sticky;top:0;z-index:2;background-color:var(--theme-surface);box-shadow:inset 0 -1px 0 var(--theme-dividers)}:global(.s-table.fixed-header)>:global(thead)>:global(tr:nth-child(2))>:global(th){top:48px}</style>

<div class="s-table__wrapper {klass}" {style}>
  <table class="s-table" class:dense class:fixed-header={fixedHeader}>
    <slot />
  </table>
</div>
