<script>
  import Button from '@smui/button';
  import {Label, Icon} from '@smui/common';
</script>

<Button on:click={() => alert('Clicked!')}>Just a Button</Button>
<Button variant="raised"><Label>Raised Button, Using a Label</Label></Button>
<Button some-arbitrary-prop="placed on the actual button">Button</Button>