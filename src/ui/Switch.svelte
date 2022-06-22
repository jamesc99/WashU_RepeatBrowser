<script>
  import { createEventDispatcher } from "svelte";
  import Switch from "@smui/switch";
  import FormField from "@smui/form-field";
  let selected = false;
  const dispatch = createEventDispatcher();

  $: {
    dispatch("mode-change", selected);
  }
</script>


<div class="flex">
    <span class="mx-4"> 
      <FormField>
        <span slot="label">Files</span>
      </FormField>
    </span>
    <span class='pl-2'>
    <FormField>
      <Switch bind:checked={selected} />
      <span slot="label">Experiments</span>
    </FormField>
    </span>
</div>