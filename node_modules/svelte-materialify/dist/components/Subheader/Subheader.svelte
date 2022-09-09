<script>
  let klass = '';
  export let inset = false;
  export let style = null;
  export { klass as class };
</script>

<style lang="scss" src="./Subheader.scss">.s-subheader{align-items:center;display:flex;height:48px;font-size:.875rem;font-weight:400;padding:0 16px;color:var(--theme-text-secondary)}.s-subheader.inset{margin-left:56px}</style>

<div class="s-subheader {klass}" class:inset {style}>
  <slot />
</div>
