<script>
  let klass = '';
  export let dense = false;
  export let noGutters = false;
  export { klass as class };
  export let style = null;
</script>

<style lang="scss" src="./Row.scss" global>:global(.s-row){display:flex;flex-wrap:wrap;flex:1 1 auto;margin-right:-12px;margin-left:-12px}:global(.s-row.dense){margin-right:-4px;margin-left:-4px}:global(.s-row.dense)>:global(.s-col){padding:4px}:global(.s-row.no-gutters){margin-right:0;margin-left:0}:global(.s-row.no-gutters)>:global(.s-col){padding:0}</style>

<div class="s-row {klass}" class:dense class:no-gutters={noGutters} {style}>
  <slot />
</div>
