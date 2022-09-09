<script>
  import Ripple from '../../actions/Ripple';
  import Icon from '../Icon';
  import closeIcon from '../../internal/Icons/close';
  import { createEventDispatcher } from 'svelte';

  // Classes to add to chip.
  let klass = '';
  export { klass as class };

  // Determines whether the chip is visible or not.
  export let active = true;

  // Selected state
  export let selected = false;

  /**
   * Specifies the size of chip.
   * @type {x-small|small|default|large|x-large}
   */
  export let size = 'default';
  export let outlined = false;
  export let pill = false;
  export let link = false;
  export let label = false;
  export let close = false;

  const dispatch = createEventDispatcher();

  function onClose(e) {
    active = false;
    dispatch('close', e);
  }
</script>

<style lang="scss" src="./Chip.scss" global>:global(.s-chip__close){cursor:pointer;margin-left:6px;margin-right:-6px}:global(.s-chip__close) :global(.s-icon){font-size:18px;max-height:18px;max-width:18px;user-select:none}:global(.s-chip__close:active),:global(.s-chip__close:focus),:global(.s-chip__close:hover){opacity:.72}:global(.s-chip){border-color:var(--theme-dividers);color:var(--theme-text-primary);align-items:center;cursor:default;display:inline-flex;line-height:20px;max-width:100%;outline:none;overflow:hidden;padding:0 12px;position:relative;text-decoration:none;transition-duration:.28s;transition-property:box-shadow,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);vertical-align:middle;white-space:nowrap}:global(.s-chip:before){background-color:currentColor;bottom:0;border-radius:inherit;content:"";left:0;opacity:0;position:absolute;pointer-events:none;right:0;top:0}:global(.s-chip) :global(.s-avatar){height:24px;min-width:24px;width:24px}:global(.s-chip) :global(.s-icon){font-size:24px}:global(.s-chip)>:global(.s-avatar),:global(.s-chip)>:global(.s-icon){color:inherit}:global(.s-chip)>:global(.s-avatar:first-child),:global(.s-chip)>:global(.s-icon:first-child){margin-left:-6px;margin-right:6px}:global(.s-chip)>:global(.s-avatar:last-child),:global(.s-chip)>:global(.s-icon:last-child){margin-left:6px;margin-right:-6px}:global(.s-chip.size-x-small){border-radius:8px;font-size:10px;height:16px}:global(.s-chip.size-small){border-radius:12px;font-size:12px;height:24px}:global(.s-chip.size-default){border-radius:16px;font-size:14px;height:32px}:global(.s-chip.size-large){border-radius:27px;font-size:16px;height:54px}:global(.s-chip.size-x-large){border-radius:33px;font-size:18px;height:66px}:global(.s-chip:not(.outlined).error-color),:global(.s-chip:not(.outlined).info-color),:global(.s-chip:not(.outlined).primary-color),:global(.s-chip:not(.outlined).secondary-color),:global(.s-chip:not(.outlined).success-color),:global(.s-chip:not(.outlined).warning-color){color:#fff}:global(.s-chip:not(.selected)){background-color:var(--theme-chips)}:global(.s-chip.pill)>:global(.s-avatar){height:32px;width:32px}:global(.s-chip.pill)>:global(.s-avatar:first-child){margin-left:-12px}:global(.s-chip.pill)>:global(.s-avatar:last-child){margin-right:-12px}:global(.s-chip.link){cursor:pointer;user-select:none}:global(.s-chip.link:active){box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}:global(.s-chip.outlined){border:thin solid;background:transparent}:global(.s-chip.outlined:active:before){opacity:.08}:global(.s-chip.label){border-radius:4px}:global(.s-chip.disabled){opacity:.4;pointer-events:none;user-select:none}</style>

{#if active}
  <span
    class="s-chip {klass} size-{size}"
    use:Ripple={link}
    class:outlined
    class:pill
    class:link
    class:label
    class:selected
    on:click>
    <slot />
    {#if close}
      <div class="s-chip__close" on:click={onClose}>
        <slot name="close-icon">
          <Icon path={closeIcon} />
        </slot>
      </div>
    {/if}
  </span>
{/if}
