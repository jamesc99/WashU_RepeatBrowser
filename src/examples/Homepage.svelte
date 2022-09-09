<LayoutGrid>
    <Cell span={12}>
        <div class="welcome-cell">
            <img src="./images/welcome.png" class="welcome-image">
        </div>
    </Cell>

    <Cell span={12}>
        <div class="img-cell">
            <img src="./images/washu_mainpage.png" class="mainpage-image">
        </div>
    </Cell>

<!--    <Cell span={12}>-->
<!--        <h1>-->
<!--            How to use this Browser:-->
<!--        </h1>-->
<!--        <p>-->
<!--            blablablabalba....-->
<!--        </p>-->
<!--    </Cell>-->

</LayoutGrid>

<script lang="ts">
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import ImageList, {
        Item,
        ImageAspectContainer,
        Image,
        Supporting,
        Label,
    } from '@smui/image-list';
</script>

<style>
    .welcome-cell {
        height: 5rem;
        margin-bottom: auto;
        display: block;
        text-align: center;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        color: var(--mdc-theme-secondary, #333);
    }

    .img-cell {
        height: 15rem;
        max-height: 15rem;
        display: block;
        text-align: center;
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

    .mainpage-image{
        max-width: 100%;
        text-align: center;
        display: inline;
    }

    .welcome-image{
        max-width: 50%;
        text-align: center;
        display: inline;
    }
</style>
