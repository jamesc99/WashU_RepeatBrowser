<script>
  import SvelteTable from "./SvelteTable.svelte";
  import { onMount } from 'svelte';
  import { Cart } from './stores/CartStore.js';

  function updateCart(input) {
    let found = $Cart.data.filter(d => d._id === input.detail.row._id);
    if (found.length > 0) {
      Cart.addDataItems($Cart.data.filter(d => d._id !== input.detail.row._id));
    } else {
      Cart.addDataItems([...new Set([...$Cart.data, input.detail.row])]);
    }
  }

  export let DATA;
  let _data;
  let example = 0;
  let sortBy = 'id';
  let sortOrder = 1;
	let iconAsc = '↑';
  let iconDesc = '↓';
  const ROWS_PER_PAGE = 50;

  $: {
    _data = DATA.map((d, i) => {
      d._id = i + 1;
      return d;
  });
  }

  const cols = [
    {
      key: "id",
      title: "ACCESSION",
      value: v => v.id,
      sortable: true,
      filterOptions: rows => {
        let nums = {};
        rows.forEach(row => {
          let num = Math.floor(row._id / ROWS_PER_PAGE);
          if (nums[num] === undefined)
            nums[num] = { name: `${num * ROWS_PER_PAGE} to ${(num + 1) * ROWS_PER_PAGE}`, value: num };
        });
        // fix order
        nums = Object.entries(nums)
          .sort()
          .reduce((o, [k, v]) => ((o[k] = v), o), {});
        return Object.values(nums);
      },
      filterValue: v => Math.floor(v._id / ROWS_PER_PAGE),
      headerClass: 'text-left'
    },
    // {
    //   key: "Assay",
    //   title: "Assay",
    //   value: v => v.Assay,
    //   sortable: true,
    //   filterOptions: rows => {
    //     let letrs = {};
    //     rows.forEach(row => {
    //       let letr = row.Assay;
    //       if (letrs[letr] === undefined)
    //         letrs[letr] = {
    //           name: `${letr.toUpperCase()}`,
    //           value: letr.toLowerCase()
    //         };
    //     });
    //     // fix order
    //     letrs = Object.entries(letrs)
    //       .sort()
    //       .reduce((o, [k, v]) => ((o[k] = v), o), {});
    //     return Object.values(letrs);
    //   },
    //   filterValue: v => v.Assay.toLowerCase()
    // },
    {
      key: "Tissue",
      title: "Tissue",
      value: v => v.Tissue,
      sortable: true,
      filterOptions: rows => {
        let letrs = {};
        rows.forEach(row => {
          let letr = row.Tissue;
          if (letrs[letr] === undefined)
            letrs[letr] = {
              name: `${letr}`,
              value: letr.toLowerCase()
            };
        });
        // fix order
        letrs = Object.entries(letrs)
          .sort()
          .reduce((o, [k, v]) => ((o[k] = v), o), {});
        return Object.values(letrs);
      },
      filterValue: v => v.Tissue.toLowerCase(),
    }
  ];

  
</script>
{#if DATA !== undefined}

<SvelteTable
  on:clickRow={updateCart}
  columns={cols}
  rows={_data}
></SvelteTable>
{:else} 
  <div>
    Loading..
  </div>
{/if}

