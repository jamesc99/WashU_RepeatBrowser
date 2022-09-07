<script>
    import { getComparator, formatDate } from "../helper.js";
    import Button from "./Button.svelte";
    import Tag from "./Tag.svelte";
    import {createEventDispatcher} from "svelte";
    import {Cart} from "../../../stores/CartStore";

    export let columns = [];
    export let data = [];

    let sortColumn = null;
    let sortDirection = null;

    let dispatch = createEventDispatcher();

    let dataIds;
    const unsubscribe = Cart.subscribe(async store => {
        const { data } = store;
        dataIds = data.map(d => d.id);
    });

    function sortBy(column) {
        const sameColumn = column === sortColumn;
        const currentlyAscending = sortDirection === "ASC";
        const unsetSort = sameColumn && !currentlyAscending;

        sortColumn = unsetSort ? null : column;
        sortDirection = unsetSort
            ? null
            : sameColumn && currentlyAscending
                ? "DESC"
                : "ASC";
    }

    function sortData() {
        let items = [...data];

        if (!data.length) return data;

        const type = typeof data[0][sortColumn.toLowerCase()];

        items.sort(getComparator(type, sortColumn));

        return sortDirection === "ASC" ? items : items.reverse();
    }

    const handleClickRow = (row) => {
        dispatch('clickRow', {row} );
    }

    $: display = sortColumn && sortDirection ? sortData() : [...data];
</script>

<style>
    .selected {
        background-color: rgb(180, 213, 214);
    }

    table {
        width: 100%;
        min-width: 900px;
        border-spacing: 0;
        position: relative;
        overflow: auto;
        margin-bottom: 0.5rem;
        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
    }

    th {
        padding: 1.5rem 1.25rem;
        background-color: #ffffff;
        border-bottom: 1px solid #f0f2fa;
        position: sticky;
        top: 0;
    }

    th:first-child {
        left: 0;
        z-index: 1;
        border-right: 1px solid #f0f2fa;
    }

    td {
        margin: 0;
        padding: 1.25rem;
        vertical-align: top;
        text-align: inherit;
        font-size: 0.9rem;
        max-width: 20%;
        background-color: #ffffff;
    }

    td:first-child {
        position: sticky;
        left: 0;
        top: auto;
        width: 6rem;
        border-right: 1px solid #f0f2fa;
    }

    tbody tr:nth-child(odd) td {
        background-color: #fafbff;
    }

    thead th:first-child {
        border-top-left-radius: 5px;
    }

    thead th:last-child {
        border-top-right-radius: 5px;
    }

    tbody tr:last-child td:first-child {
        border-bottom-left-radius: 5px;
    }

    tbody tr:last-child td:last-child {
        border-bottom-right-radius: 5px;
    }

    svg {
        width: 1.25rem;
        height: 1.25rem;
        margin-right: 0.25rem;
        fill: rgba(0, 0, 0, 0.5);
        flex-shrink: 0;
    }

    .flex {
        display: flex;
        align-items: center;
    }

    .selected {
        background-color: rgb(180, 213, 214);
    }
</style>

<table>
    <thead>
    <tr>
        {#each columns as column}
            <th>
                <Button {sortBy} {column} {sortColumn} {sortDirection} />
            </th>
        {/each}
    </tr>
    </thead>
    <tbody>
    {#each display as row}
        <tr>
            <td class="id"><strong><em>#{row.id}</em></strong></td>
            <td class="Assay">{row.Assay}</td>
            <td class="Biosample_type">{row.Biosample_type}</td>
            <td class="Experiment">{row.Experiment}</td>
            <td class="Organism">{row.Organism}</td>
            <td class="Tissue">{row.Tissue}</td>
<!--            <td class="price"><strong>${row.price}</strong></td>-->
<!--            <td class="date"><div class="flex"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11,2A10,10,0,1,0,21,12,10,10,0,0,0,11,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,11,20Zm3.1-7.37L12,11.42V7a1,1,0,0,0-2,0v5s0,.08,0,.12a.65.65,0,0,0,.05.2.89.89,0,0,0,.08.17.86.86,0,0,0,.1.16l.16.13.09.09,2.6,1.5a1,1,0,0,0,.5.13,1,1,0,0,0,.5-1.87Z"/></svg>{formatDate(row.date)}</div></td>-->
            <td class="status"><Tag on:click={()=>{handleClickRow(row)}} status={dataIds.indexOf(row.id)>=0 ? 'Selected' : 'Available'} /></td>
        </tr>
    {/each}
    </tbody>
</table>