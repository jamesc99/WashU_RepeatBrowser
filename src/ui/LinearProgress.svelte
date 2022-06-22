
<script>
  import {onMount, onDestroy} from 'svelte';
  import LinearProgress from '@smui/linear-progress';
  // import Checkbox from '@smui/checkbox';
  // import FormField from '@smui/form-field';
  // import Button from '@smui/button';
  import './linear-progress.scss';
  let progress = 0;
  let closed = false;
  let timer;
  onMount(reset);
  onDestroy(() => {
    clearInterval(timer);
  });
  function reset() {
    progress = 0;
    closed = false;
    clearInterval(timer);
    timer = setInterval(() => {
      progress += .01;
      if (progress >= 1) {
        progress = 1;
        closed = true;
        clearInterval(timer);
      }
    }, 100);
  }
</script>

<div>
<LinearProgress indeterminate />
</div>