<LayoutGrid>
    <Cell span={12}>
        <div class="welcome-cell">
            <h1>
                Welcome to WashU Repeat Browser!
            </h1>
        </div>
    </Cell>

    <Cell span={12}>
        <div class="img-cell">
            <img src="wangLabLogo.png" alt="wanglabLogo">
        </div>
    </Cell>

    <Cell span={12}>
        <h1>
            How to use this Browser:
        </h1>
        <p>
            blablablabalba....
        </p>
    </Cell>

</LayoutGrid>

<script lang="ts">
    import LayoutGrid, { Cell } from '@smui/layout-grid';
</script>

<style>
    .welcome-cell {
        height: 130px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f7f7f7;
        color: var(--mdc-theme-secondary, #333);
    }

    .img-cell {
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        color: var(--mdc-theme-secondary, #333);
    }

    .intro-cell {
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f7f7f7;
        color: var(--mdc-theme-secondary, #333);
    }
</style>
