<script>
  import Slider from '@smui/slider';
  import Button from '@smui/button';
  import {Label, Icon} from '@smui/common';
  import { createEventDispatcher } from 'svelte';


  export let extent;
  let value = 0;
  const [min, max] = extent;
  function strToNum(input) {
    return parseFloat(input.toFixed(2));
  }

  function handleSliderChange(event) {
    // let newValue = value.detail.detail.value;
    dispatch("slider-move", value);
  }

  const dispatch = createEventDispatcher();

</script>

<div class="slider">
<span style="padding-right: 12px; width: max-content; display: block;">
  <Button variant="raised"><Label>{strToNum(value)}</Label></Button>
</span>

  <Label>{strToNum(min)}</Label>
  <Slider bind:value={value} on:MDCSlider:change={handleSliderChange} min={strToNum(min)} max={strToNum(max)} displayMarkers/>   
  <Label>{strToNum(max)}</Label>
</div>

<style>
  .slider {
    display: flex;
    width: 40%;
    margin-left: 20%;
    margin-block-start: 2rem;
  }
</style>