<script>
  import Style from '../../internal/Style';

  let klass = '';
  export { klass as class };
  export let size = 48;
  export let tile = false;
  export let style = null;
</script>

<style lang="scss" src="./Avatar.scss" global>:global(.s-avatar){align-items:center;display:inline-flex;justify-content:center;line-height:normal;position:relative;text-align:center;vertical-align:middle;overflow:hidden;width:var(--s-avatar-size);height:var(--s-avatar-size)}:global(.s-avatar.error-color),:global(.s-avatar.info-color),:global(.s-avatar.primary-color),:global(.s-avatar.secondary-color),:global(.s-avatar.success-color),:global(.s-avatar.warning-color){color:#fff}:global(.s-avatar:not(.tile)){border-radius:50%}:global(.s-avatar) :global(.s-icon),:global(.s-avatar) :global(img),:global(.s-avatar) :global(svg){color:inherit;border-radius:inherit;display:inline-flex;height:inherit;width:inherit}</style>

<div class="s-avatar {klass}" class:tile use:Style={{ 'avatar-size': size }} {style}>
  <slot />
</div>
