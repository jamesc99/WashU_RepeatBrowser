<script>
  import { beforeUpdate, createEventDispatcher } from "svelte";
  import { PivotData } from "./Utilities";
  import { spanSize } from "./helper";
  import { formatCellInfo, getFiltered } from './data-helper';
  const dispatch = createEventDispatcher();
  export let data;

  let pivotData = new PivotData(data);
  let colAttrs = pivotData.props.cols;
  let rowAttrs = pivotData.props.rows;
  let rowKeys = pivotData.getRowKeys();
  let colKeys = pivotData.getColKeys();

  beforeUpdate(() => {
    pivotData = new PivotData(data);
    colAttrs = pivotData.props.cols;
    rowAttrs = pivotData.props.rows;
    rowKeys = pivotData.getRowKeys();
    colKeys = pivotData.getColKeys();
  });

  function handleCellClick(input) {
      let filteredResults = getFiltered(data.data, input);
      dispatch('cell-click', filteredResults);
  }


</script>

<style>
  table.pvtTable {
    font-size: 15px;
    border: 1px solid #1C6EA4;
    background-color: #EEEEEE;
    width: 100%;
    text-align: center;
    border-collapse: collapse;
  }
  table.pvtTable td, table.pvtTable th {
    border: 1px solid #AAAAAA;
    padding: 3px 2px;
  }
  table.pvtTable tbody td {
    font-size: 16px;
  }
  table.pvtTable tr:nth-child(even) {
    background: #D0E4F5;
  }
  table.pvtTable thead {
    background: #1C6EA4;
    background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
    background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
    background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
    border-bottom: 2px solid #444444;
  }
  table.pvtTable thead th {
    font-size: 18px;
    font-weight: bold;
    color: #FFFFFF;
    border-left: 2px solid #D0E4F5;
  }
  table.pvtTable thead th:first-child {
    border-left: none;
  }
</style>

<table class="pvtTable" align="center">
  <thead>
    {#each colAttrs as c, j}
      <tr key={`colAttr${j}`}>

        {#each rowAttrs as r, i}
          <th class="pvtAxisLabel" key={`rowAttr${i}`}
              rowspan="2">{r}</th> <!-- where 2 stands for rowAttrs and keys (1 + 1). -->
        {/each}

        <!--
        {#if j === 0 && rowAttrs.length !== 0}
          <th colSpan={rowAttrs.length} rowSpan={colAttrs.length} />
        {/if}
        -->

          <th colspan={colKeys.length} class="pvtAxisLabel">{c}</th>
      </tr>

      <tr>
        {#each colKeys as colKey, i}
          {#if spanSize(colKeys, i, j) !== -1}
            <th
              class="pvtColLabel"
              key={`colKey${i}`}
              colSpan={spanSize(colKeys, i, j)}
              rowSpan={(j === colAttrs.length - 1) && (rowAttrs.length !== 0) ? 2 : 1}>
              {colKey[j]}
              <!-- {#if colAttrs.length > 1 && colAttrs.length - 1 === j}
                <div class="rotate text-xs">{colKey[j]}</div>
              {:else}{colKey[j]}{/if} -->
            </th>
          {/if}
        {/each}
      </tr>
    {/each}
  </thead>


  <tbody>
    {#each rowKeys as rowKey, i}
      <tr key={`rowKeyRow${i}`}>

        {#each rowKey as txt, j}
          {#if spanSize(rowKeys, i, j) !== -1}
            <th
              key={`rowKeyLabel${i}-${j}`}
              class="pvtRowLabel"
              rowSpan={spanSize(rowKeys, i, j)}>
              <!-- colSpan={j === rowAttrs.length - 1 && colAttrs.length !== 0 ? 1 : 2} -->
              {#if rowAttrs.length !== 1 && spanSize(rowKeys, i, j) > 3}
                <div>{txt}</div>
              {:else}{txt}{/if}
            </th>
          {/if}
        {/each}
        {#each colKeys as colKey, j}
          <td
            class={`pvtVal pvtValue`}
            key={`pvtVal${i}-${j}`}
            on:click={() => handleCellClick(formatCellInfo(rowAttrs, rowKey, colAttrs, colKey, pivotData
                    .getAggregator(rowKey, colKey)
                    .value()))}>

            {pivotData
              .getAggregator(rowKey, colKey)
              .value() ? pivotData.getAggregator(rowKey, colKey).value() : ''}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>