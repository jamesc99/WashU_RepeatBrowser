<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
</head>

<script lang="ts">
    import Modal from '../ui/Modal.svelte';
    import PivotTable from '../components/data-view/PivotTable.svelte';
    import _data from "../json/main.json";
    import List, {
        Group,
        Item,
        Graphic,
        Meta,
        Label,
        Separator,
        Subheader,
        Text,
        PrimaryText,
        SecondaryText
    } from "@smui/list";
    import IconButton from '@smui/icon-button';
    import { Button, Dialog, MaterialApp } from 'svelte-materialify';
    import Button, { Label } from '@smui/button';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import VirtualList from 'svelte-tiny-virtual-list';

    import {Cart} from "../stores/CartStore";
    import {onDestroy} from "svelte";
    import defaultData from "../json/default_cart_data.json";
    import {getZarrParameters} from '../api/inputdata';
    import {TabixIndexedFile} from "@gmod/tabix";

    import type, { MenuComponentDev } from '@smui/menu';
    import Menu from '@smui/menu';
    import Button from '@smui/button';

    let menu: MenuComponentDev;
    let clicked = 'nothing yet';
    let upload_active = false;

    let cartData;
    let cartRepeats;

    let tmp_url;
    let zarr_url;

    function handleClick(data) {
        alert(`${data.id} (${data.Assay}) uploaded.`)
    }

    async function setUn() {
        zarr_url = tmp_url;
        const data_json = await getZarrParameters(zarr_url).then(data => {
            handleClick(data);
            console.log(data);
            Cart.addDataItems([data]);
        });
    }

    // let upload_files;
    // $: if (upload_files) {
    //     // Note that `files` is of type `FileList`, not an Array:
    //     // https://developer.mozilla.org/en-US/docs/Web/API/FileList
    //     console.log(upload_files);
    //
    //     for (const file of upload_files) {
    //         console.log(`${file.name}: ${file.size} bytes`);
    //         console.log(`${file}`);
    //     }
    // }

    const unsubscribe = Cart.subscribe(async store => {
        const { data, repeats } = store;
        cartData = data;
        cartRepeats = repeats;
    });

    onDestroy(() => {
        unsubscribe();
    });

    let itemSize = 100;
    export let mode;
</script>

<LayoutGrid>
    <Cell span={12}>
        <h3 style="color: var(--mdc-theme-secondary, #333);margin-left: 10%">Zarr File Uploading: </h3>
        <div class="url-input-cell">
            <div style="width:80%; height:auto; float:left; display:inline; text-align: center">
                <input bind:value={tmp_url} placeholder="Enter the Zarr URL">
                <button on:click={setUn}>Upload</button>
            </div>
        </div>
        <hr>
    </Cell>

    <Cell span={12}>
        <div class="table-cell">
            <div style="width:80%; height:auto; float:left; display:inline">
                <Modal>
                    <h3>File Selection: </h3>
                    <PivotTable DATA={_data[mode]}/>
                </Modal>
            </div>
        </div>
    </Cell>

<!--    {#each Array(2) as _unused, _i}-->
<!--        {#if _i === 0}-->
<!--            <Cell span={8}>-->
<!--                <div class="demo-cell">-->
<!--                    <p> Data: {cartData.length} </p>-->
<!--                    <VirtualList-->
<!--                            height={200}-->
<!--                            width="auto"-->
<!--                            itemCount={cartData.length}-->
<!--                            itemSize={50}>-->

<!--                        <div slot="item" let:index let:style {style} class="row">-->
<!--                <span>-->
<!--                    <IconButton class="material-icons"-->
<!--                                on:click={() => Cart.addDataItems($Cart.data.filter(-->
<!--                            d => d._id !== cartData[index]._id))}>-->
<!--                    cancel</IconButton>-->
<!--                    File: {cartData[index].id}-->
<!--                </span>-->
<!--                        </div>-->
<!--                    </VirtualList>-->
<!--                </div>-->
<!--            </Cell>-->
<!--        {/if}-->

<!--        {#if _i === 1}-->
<!--            <Cell span={4}>-->
<!--                <div class="demo-cell">-->
<!--                    <p> Repeats: {cartRepeats.length} </p>-->
<!--                    <VirtualList-->
<!--                            height={200}-->
<!--                            width="auto"-->
<!--                            itemCount={cartRepeats.length}-->
<!--                            itemSize={50}>-->
<!--                        <div slot="item" let:index class="row">-->
<!--                            <Text>{cartRepeats[cartRepeats.length - 1 - index].name}</Text>-->
<!--                        </div>-->

<!--                    </VirtualList>-->
<!--                </div>-->
<!--            </Cell>-->
<!--        {/if}-->
<!--    {/each}-->
</LayoutGrid>



<!--    <label for="many">Upload multiple files of any type:</label>-->
<!--    <input-->
<!--            bind:files={upload_files}-->
<!--            id="many"-->
<!--            multiple-->
<!--            type="file"-->
<!--    />-->




<style>
    .table-cell {
        height: 550px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        color: var(--mdc-theme-secondary, #333);
    }

    .virtual-list-cell {
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        color: var(--mdc-theme-secondary, #333);
    }

    .url-input-cell {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        color: var(--mdc-theme-secondary, #333);
    }

    IconButton{
        float: right;
    }

    .align-right {
        text-align: right;
        border: 0;
    }

    :global(body), :global(html) {
        height: 100%;
        margin: 0;
        background-color: rgb(249, 249, 249);
    }

    :global(.virtual-list-wrapper) {
        margin: 20px;
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
        background: #fafafa;
        font-family: -apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;
        color: #333;
        -webkit-font-smoothing: antialiased;
    }

    .row {
        padding: 0 20px;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        line-height: 50px;
        font-weight: 500;
        background: #fff;
    }

    .actions {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        padding: 0 20px;
        padding-top: 15px;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }

    .actions label {
        padding: 10px 0;
        font-size: 18px;
        color: #999;
        font-family: -apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;
    }
</style>
