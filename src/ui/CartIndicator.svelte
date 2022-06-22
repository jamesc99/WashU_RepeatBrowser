<script>
  import { Cart } from "../stores/CartStore.js";
  export let mode;
</script>
<div class="flex justify-center">
<span class="p-4">
  {$Cart.data.length} {mode}
  {$Cart.repeats.length} repeats
</span>
</div>