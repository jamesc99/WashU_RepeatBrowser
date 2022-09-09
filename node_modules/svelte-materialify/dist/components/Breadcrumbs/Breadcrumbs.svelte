<script>
  let klass = '';
  export { klass as class };
  export let large = false;
  export let items = [];
  export let style = null;

  const defaults = {
    disabled: false,
    href: '',
    text: '',
    class: '',
    props: {},
  };

  items = items.map((x) => ({ ...defaults, ...x }));
</script>

<style lang="scss" src="./Breadcrumbs.scss" global>:global(.s-breadcrumbs){align-items:center;display:flex;flex-wrap:wrap;flex:0 1 auto;list-style-type:none;margin:0;padding:18px 12px}:global(.s-breadcrumbs) :global(.s-breadcrumb-item){align-items:center;display:inline-flex;text-decoration:none}:global(.s-breadcrumbs) :global(.s-breadcrumb-item.disabled){color:var(--theme-text-disabled);pointer-events:none}:global(.s-breadcrumbs) :global(li){align-items:center;display:inline-flex;font-size:14px}:global(.s-breadcrumbs) :global(li) :global(.s-icon){font-size:16px}:global(.s-breadcrumbs) :global(li:nth-child(2n)){padding:0 12px}:global(.s-breadcrumbs) :global(li.divider){color:var(--theme-text-disabled)}:global(.s-breadcrumbs.large) :global(li),:global(.s-breadcrumbs.large) :global(li) :global(.s-icon){font-size:16px}</style>

<ul class="s-breadcrumbs {klass}" class:large {style}>
  {#each items as item, i}
    {#if i !== 0}
      <li class="divider">
        <!-- The slot used for divider -->
        <slot name="divider">/</slot>
      </li>
    {/if}
    <li>
      <slot {item}>
        {#if item.href}
          <a
            href={item.href}
            class="s-breadcrumb-item {item.class}"
            class:disabled={item.disabled}
            {...item.props}>
            {item.text}
          </a>
        {:else}
          <span
            class="s-breadcrumb-item {items.class}"
            class:disabled={item.disabled}
            {...item.props}>
            {item.text}
          </span>
        {/if}
      </slot>
    </li>
  {/each}
</ul>
