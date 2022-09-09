<script>
  let klass = '';
  export { klass as class };
  export let inset = false;
  export let vertical = false;
  export let style = null;
</script>

<style lang="scss" src="./Divider.scss">.s-divider{display:block;flex:1 1 0;max-width:100%;height:0;max-height:0;border:solid;border-width:thin 0 0;border-color:var(--theme-dividers);transition:inherit}.s-divider.inset:not(.vertical){max-width:calc(100% - 72px);margin-left:72px}.s-divider.vertical{align-self:stretch;border:solid;border-width:0 thin 0 0;display:inline-flex;height:inherit;min-height:100%;max-height:100%;max-width:0;width:0;vertical-align:text-bottom}.s-divider.vertical.inset{margin-top:8px;min-height:0;max-height:calc(100% - 16px)}</style>

<hr
  class="s-divider {klass}"
  role="separator"
  aria-orientation={vertical ? 'vertical' : 'horizontal'}
  class:inset
  class:vertical
  {style} />
