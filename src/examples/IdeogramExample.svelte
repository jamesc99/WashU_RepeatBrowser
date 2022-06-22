<script>
  import Ideogram from 'ideogram';
  import { onMount } from "svelte";
  const config = {
    organism: 'human',
    chrHeight: 1200,
    chrMargin: 2,
    annotationsPath: 'https://unpkg.com/ideogram@1.16.0/dist/data/annotations/10_virtual_cnvs.json',
    annotationsLayout: 'overlay',
    orientation: 'horizontal',
    dataDir: 'https://unpkg.com/ideogram@1.16.0/dist/data/bands/native/',
    container: '#ideo-container'
  };
  onMount(() => {
    return new Ideogram(config);
  })
</script>

<div style="width:75%;">
<div id="ideo-container">
</div>
</div>

<style >
  #ideo-container {
    height: 600px;
  }
</style>
