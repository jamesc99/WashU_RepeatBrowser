<script>
    export let status = "";
</script>

<style>
    button {
        font-size: 0.75rem;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.75);
        padding: 0.25rem 0.5rem;
        border-radius: 5px;
    }

    .selected {
        background-color: #EE6055;
        cursor: pointer;
    }
    .default {
        background-color: #17d5ff;
        cursor: pointer;
    }
    .available {
        background-color: #80ED99;
        cursor: pointer;
    }
    /*.complete {*/
    /*    background-color: #bef559;*/
    /*}*/
</style>

<button on:click class={status.toLowerCase()}>{status}</button>
