<script>
  import Input from '../Input';
  import { onMount, createEventDispatcher } from 'svelte';

  let sliderElement;
  let slider;
  let internalValue;
  const dispatch = createEventDispatcher();

  export let min = 0;
  export let max = 100;
  export let value = (min + max) / 2;
  export let connect = Array.isArray(value) ? true : 'lower';
  export let color = 'primary';
  export let step = null;
  export let precision = 0;
  export let margin = null;
  export let limit = null;
  export let padding = null;
  export let thumb = false;
  export let persistentThumb = false;
  export let thumbClass = 'primary-color';
  export let vertical = false;
  export let inverseLabel = false;
  export let readonly = false;
  export let disabled = null;
  export let style = null;

  function format(val) {
    if (Array.isArray(val)) {
      if (val.length === 1) return Number(val[0]);
      return val.map((v) => Number(v));
    }
    return Number(val);
  }

  function tooltip() {
    if (Array.isArray(thumb)) {
      return thumb.map((x) => {
        if (typeof x === 'function') return { to: x };
        return x;
      });
    }
    if (typeof thumb === 'function') {
      return { to: thumb };
    }
    return thumb;
  }

  onMount(async () => {
    const { default: noUiSlider } = await import('./nouislider.min');

    noUiSlider.cssClasses.tooltip = `tooltip ${thumbClass}`;
    noUiSlider.create(sliderElement, {
      cssPrefix: 's-slider__',
      format: {
        to: (v) => v.toFixed(precision),
        from: (v) => Number(v),
      },
      start: value,
      connect,
      margin,
      limit,
      padding,
      range: { min, max },
      orientation: vertical ? 'vertical' : 'horizontal',
      step,
      tooltips: tooltip(),
    });
    slider = sliderElement.noUiSlider;
    slider.on('update', (val, handle) => {
      value = format(val);
      internalValue = value;
      dispatch('update', { value: val, handle });
    });
    slider.on('change', (val, handle) => {
      dispatch('change', { value: val, handle });
    });

    return () => {
      slider.destroy();
    };
  });

  $: if (slider) {
    if (value !== internalValue) slider.set(value, false);
    slider.updateOptions({
      start: value,
      range: { min, max },
      orientation: vertical ? 'vertical' : 'horizontal',
      connect,
      margin,
      limit,
      padding,
      step,
    }, false);
  }
</script>

<style lang="scss" src="./Slider.scss" global>/*! nouislider - 14.6.1 - 8/17/2020 */:global(.s-slider__label:not(.inverse-label)){margin-right:12px}:global(.s-slider__label.inverse-label){order:1;margin-left:12px}:global(.s-slider__connect),:global(.s-slider__origin){will-change:transform;position:absolute;z-index:1;top:0;right:0;transform-origin:0 0;transform-style:preserve-3d}:global(.s-slider__connect){height:100%;width:100%;background-color:currentColor}:global(.s-slider__origin){height:10%;width:10%}:global(.s-slider__touch-area){height:100%;width:100%}:global(.s-slider__state-tap) :global(.s-slider__connect),:global(.s-slider__state-tap) :global(.s-slider__origin){transition:transform .3s cubic-bezier(.25,.8,.5,1)}:global(.s-slider__state-drag) :global(*){cursor:inherit!important}:global(.s-slider__draggable){cursor:ew-resize}:global(.s-slider__vertical) :global(.s-slider__draggable){cursor:ns-resize}:global(.s-slider__base),:global(.s-slider__connects){width:100%;height:100%;position:relative;z-index:1}:global(.s-slider__connects){overflow:hidden;z-index:0;color:inherit;border-radius:3px}:global(.s-slider__connects:before){position:absolute;background-color:currentColor;content:"";width:100%;height:100%;opacity:.26}:global(.s-slider__handle){backface-visibility:hidden;position:absolute;width:12px;height:12px;right:-5px;top:-5px;border-radius:50%;background:currentColor;cursor:default;outline:none}:global(.s-slider__handle:before){content:"";z-index:-1;color:inherit;background-color:currentColor;width:36px;height:36px;left:-12px;top:-12px;opacity:.3;pointer-events:none;position:absolute;border-radius:inherit;transition:transform .3s cubic-bezier(.25,.8,.5,1);transform:scale(.1)}:global(.s-slider__handle:hover:before){transform:scale(1)}:global(.s-slider__handle.focus-visible:before){transform:scale(1.2)}:global(.s-slider__active:before){transform:scale(1.5)!important}:global(.s-slider__tooltip){transition:opacity .3s cubic-bezier(.25,.8,.25,1);position:absolute;bottom:0;user-select:none;font-size:.75rem;color:#fff;display:flex;justify-content:center;align-items:center}:global(.s-slider__tooltip:before){position:absolute;z-index:-1;content:"";background-color:inherit;width:32px;height:32px;border-radius:50% 50% 0}:global(.s-slider__horizontal){height:2px;width:100%}:global(.s-slider__horizontal) :global(.s-slider__tooltip){left:50%;transform:translateY(-100%) translateY(-12px) translateX(-50%)}:global(.s-slider__horizontal) :global(.s-slider__tooltip:before){transform:rotate(45deg)}:global(.s-slider__horizontal) :global(.s-slider__origin){height:0}:global(.s-slider__vertical){margin-left:auto;margin-right:auto;width:2px}:global(.s-slider__vertical) :global(.s-slider__tooltip){bottom:50%;transform:translateX(-100%) translateX(-18px) translateY(50%)}:global(.s-slider__vertical) :global(.s-slider__tooltip:before){transform:rotate(-45deg)}:global(.s-slider__vertical) :global(.s-slider__origin){width:0}:global(.s-slider__vertical) :global(.s-slider__base){min-height:150px}:global(.s-slider__vertical) :global(.s-slider__connects){min-height:inherit}:global(.s-slider__target){-webkit-touch-callout:none;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;user-select:none;position:relative;border-radius:4px}:global(.s-slider__target:not(.persistent-thumb)) :global(.s-slider__tooltip){opacity:0}:global(.s-slider__target:not(.persistent-thumb)) :global(.s-slider__active) :global(.s-slider__tooltip){opacity:1}:global(.s-slider) :global(.s-input__slot){min-height:32px}:global(.s-slider.readonly){pointer-events:none}:global([disabled].s-slider__target) :global(.s-slider__connect),:global([disabled].s-slider__target) :global(.s-slider__connects),:global([disabled].s-slider__target) :global(.s-slider__handle){background-color:var(--theme-text-disabled)}:global([disabled].s-slider__target) :global(.s-slider__handle){cursor:not-allowed}</style>

<!-- svelte-ignore a11y-label-has-associated-control -->
<Input class="s-slider" {color} {readonly} {disabled}>
  <!-- Slot for prepend outside the input. -->
  <slot slot="prepend-outer" name="prepend-outer" />
  <label class="s-slider__label" class:inverse-label={inverseLabel}><slot /></label>
  <div
    class:persistent-thumb={persistentThumb}
    bind:this={sliderElement}
    {disabled}
    {style} />

  <!-- Slot for append outside the input. -->
  <slot slot="append-outer" name="append-outer" />
</Input>
