<script>
  import SvelteTable from "./SvelteTable.svelte";
  import { onMount } from 'svelte';
  import { Cart } from './stores/CartStore.js';
  import Table from "./components/data-view/components/Table.svelte";
  import { formatDate } from "./components/data-view/helper.js";
  // import data_test from "./components/data-view/data_test.js";

  let search = "";
  const columns = ["ID", "Assay", "Biosample Type", "Experiment", "Organism", "Tissue", "Status"];

  function searchFor(search) {
    return _data.filter(item => {
      return Object.values(item).some(value => {
        if (typeof value === "number") {
          value = String(value);
        }
        if (typeof value === "object") {
          value = formatDate(value);
        }
        return value.toLowerCase().includes(search.toLowerCase());
      });
    });
  }

  $: filtered = search ? searchFor(search) : _data;

  let cartData;
  const unsubscribe = Cart.subscribe(async store => {
    const { data, repeats } = store;
    cartData = data;
  });


  function updateCart(input) {
    let found = $Cart.data.filter(d => d.id === input.detail.row.id);
    console.log(found);
    if (found.length > 0) {
      Cart.addDataItems($Cart.data.filter(d => d.id !== input.detail.row.id));
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
    console.log(_data);
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

<style>
  :global(body) {
    margin: 0;
    color: #4e4e52;
    background-color: #f3f4fb;
    font-family: sans-serif;
    line-height: 1.4;
    box-sizing: border-box;
  }

  :global(*) {
    box-sizing: border-box;
  }

  main {
    padding: 2rem;
    margin: 0 auto;
    max-width: 1240px;
  }

  header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  h1 {
    font-size: 1.75rem;
    margin: 0 1rem 0 0;
    display: flex;
    align-items: center;
  }

  svg {
    width: 2rem;
    height: 2rem;
    margin: -0.25rem 0.5rem 0 0.25rem;
    background-color: #fff;
    border-radius: 50%;
    padding: 0.25rem;
  }

  .count {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.25rem;
    font-size: 0.75rem;
    text-align: center;
    background-color: #fefeff;
    margin-left: 0.5rem;
    border-radius: 50%;
  }

  input {
    font-size: inherit;
    padding: 0.5rem 1rem 0.5rem 2rem;
    width: 15.75rem;
    border: none;
    background-size: 1.25rem;
    background-repeat: no-repeat;
    background-position: left 0.5rem center;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%234f4f4f' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' %3e%3ccircle cx='11' cy='11' r='8'%3e%3c/circle%3e%3cline x1='21' y1='21' x2='16.65' y2='16.65'%3e%3c/line%3e%3c/svg%3e");
    border-radius: 5rem;
    transition: all 0.25s ease;
  }

  input:focus {
    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.05);
  }
</style>

{#if DATA !== undefined}
  <main>
    <header>
      <h1>
        <svg class="svg-icon" style="width: 1.5em; height: 1.5em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M669.536 608H416a32 32 0 0 1 0-64h284.832c2.112-10.24 3.168-20.864 3.168-32 0-62.816-35.36-111.456-106.496-155.84a32 32 0 0 1 33.92-54.304C719.424 356.8 768 423.584 768 512c0 104.288-59.616 171.968-179.776 234.56 21.952 9.344 42.816 18.176 51.072 21.856C726.912 807.68 768 840.992 768 896a32 32 0 0 1-64 0c0-18.976-26.176-40.192-90.88-69.152-14.56-6.528-73.664-31.264-102.72-43.744-27.808 11.904-78.944 33.504-93.152 39.904C348.416 853.856 320 876.448 320 896a32 32 0 0 1-64 0c0-56 42.816-90.048 135.04-131.392 18.24-8.192 91.36-38.976 108.032-46.336 82.112-36.288 138.016-70.72 170.464-110.272zM323.168 480c-2.112 10.24-3.168 20.864-3.168 32 0 62.816 35.36 111.456 106.496 155.84a32 32 0 0 1-33.92 54.304C304.576 667.2 256 600.416 256 512c0-103.808 59.04-171.328 178.112-233.728-19.712-8.416-38.08-16.32-46.176-19.968C298.08 217.664 256 183.68 256 128a32 32 0 1 1 64 0c0 19.552 27.424 41.76 94.304 72 14.88 6.72 69.12 29.696 97.248 41.792 27.232-11.712 80.64-34.24 95.2-40.8C675.584 170.144 704 147.552 704 128a32 32 0 0 1 64 0c0 56-42.816 90.048-135.04 131.392-16.992 7.648-81.568 34.88-103.84 44.512a32.192 32.192 0 0 1-8.704 3.84c-79.68 35.552-134.112 69.44-165.952 108.256H608a32 32 0 0 1 0 64H323.168z" fill="#2BBFD6" /></svg>
        Current Selcted Files: {cartData.length}
<!--        <span class="count">{filtered.length}</span>-->
      </h1>
      <input type="text" bind:value={search} />
    </header>
    <Table on:clickRow={updateCart} {columns} data={filtered} />
  </main>
{:else}
  <div>
    Loading...
  </div>
{/if}

<!--{#if DATA !== undefined}-->
<!--<SvelteTable-->
<!--  on:clickRow={updateCart}-->
<!--  columns={cols}-->
<!--  rows={_data}-->
<!--&gt;</SvelteTable>-->
<!--{:else}-->
<!--  <div>-->
<!--    Loading..-->
<!--  </div>-->
<!--{/if}-->

