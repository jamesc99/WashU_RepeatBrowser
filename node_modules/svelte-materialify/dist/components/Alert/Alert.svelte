<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  import Button from '../Button';

  let klass = '';
  export { klass as class };
  export let visible = true;
  export let transition = fade;
  export let transitionOpts = { duration: 0 };
  export let dense = false;
  export let outlined = false;
  export let text = false;
  export let tile = false;
  export let dismissible = false;
  export let border = false;
  export let coloredBorder = false;

  function dismiss() {
    visible = false;
    /**
     * Triggered when alert is dismissed.
     * @returns Nothing
     */
    dispatch('dismiss');
  }
</script>

<style lang="scss" src="./Alert.scss" global>:global(.s-alert){display:block;font-size:16px;margin-bottom:16px;padding:16px;position:relative;color:var(--theme-text-primary)}:global(.s-alert.error-color),:global(.s-alert.info-color),:global(.s-alert.primary-color),:global(.s-alert.secondary-color),:global(.s-alert.success-color),:global(.s-alert.warning-color){color:#fff}:global(.s-alert) :global(.s-btn),:global(.s-alert) :global(.s-icon){color:inherit!important}:global(.s-alert) :global(.s-icon){align-self:flex-start}:global(.s-alert) :global([slot=icon]){margin-right:16px}:global(.s-alert) :global(.s-alert__border){border-style:solid;border-width:4px;content:"";position:absolute}:global(.s-alert) :global(.s-alert__border.border-left),:global(.s-alert) :global(.s-alert__border.border-right){bottom:0;top:0}:global(.s-alert) :global(.s-alert__border.border-bottom),:global(.s-alert) :global(.s-alert__border.border-top){left:0;right:0}:global(.s-alert) :global(.s-alert__border.border-left){border-top-left-radius:inherit;border-bottom-left-radius:inherit;left:0}:global(.s-alert) :global(.s-alert__border.border-right){border-top-right-radius:inherit;border-bottom-right-radius:inherit;right:0}:global(.s-alert) :global(.s-alert__border.border-top){border-top-left-radius:inherit;border-top-right-radius:inherit;top:0}:global(.s-alert) :global(.s-alert__border.border-bottom){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit;bottom:0}:global(.s-alert.dense){padding-top:8px;padding-bottom:8px}:global(.s-alert.dense) :global(.s-alert__border){border-width:medium}:global(.s-alert.outlined){background:transparent;border:thin solid}:global(.s-alert.text){background:transparent!important}:global(.s-alert.text:before){background-color:currentColor;border-radius:inherit;bottom:0;content:"";left:0;opacity:.12;position:absolute;pointer-events:none;right:0;top:0}:global(.s-alert:not(.tile)){border-radius:4px}:global(.s-alert.colored-border){box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}:global(.s-alert:not(.colored-border)) :global(.s-alert__border){opacity:.26}:global(.s-alert__wrapper){align-items:center;border-radius:inherit;display:flex}:global(.s-alert__content){flex:1 1 auto}</style>

{#if visible}
  <div
    role="alert"
    class="s-alert {klass}"
    transition:transition={transitionOpts}
    on:introstart
    on:outrostart
    on:introend
    on:outroend
    class:dense
    class:outlined
    class:text
    class:tile
    class:colored-border={coloredBorder}>
    <div class="s-alert__wrapper">
      <!-- Slot for icon at beginning of alert. -->
      <slot name="icon" />
      <div class="s-alert__content">
        <slot />
      </div>
      {#if dismissible}
        <Button icon on:click={dismiss}>
          <!-- Slot for close button icon. -->
          <slot name="close">✖</slot>
        </Button>
      {/if}
      {#if border}
        <div class="s-alert__border border-{border}" />
      {/if}
    </div>
  </div>
{/if}
