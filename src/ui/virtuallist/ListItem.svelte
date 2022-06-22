<script>
    export let _id;
    export let Tissue;
    export let Assay;

    function handleClick() {
        alert('clicked')
    }
</script>

<div on:click={handleClick} class='card'>
    <span class='avatar' style='background: url(https://via.placeholder.com/40x40.png?text={_id})' ></span>
    <h2>{Tissue}</h2>
    <p>{Assay}</p>
</div>

<style>
    .card {
        position: relative;
        margin: 0.5em;
        padding: 0.5em 0.5em 0.5em 6em;
        border: 1px solid #eee;
        border-radius: 4px;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        min-height: 5em;
    }

    .card::after {
        clear: both;
        display: block;
    }

    .avatar {
        position: absolute;
        width: 5em;
        height: 5em;
        left: 0.5em;
        top: 0.5em;
        border-radius: 50%;
        background: no-repeat 50% 50%;
        background-size: cover;
    }

    h2 {
        margin: 0 0 0.5em 0;
        font-size: 16px;
    }

    p {
        margin: 0;
        font-size: 14px;
    }
</style>