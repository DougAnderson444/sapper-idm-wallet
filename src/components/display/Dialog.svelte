<script>
  import Dialog, { Title, Content, Actions, InitialFocus } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import List, { Item, Graphic, Text } from "@smui/list";
  import Radio from "@smui/radio";

  export let open;
  
  let showDialog;
  export let clicked = "Nothing yet.";
  let selection = "Identity";

  $: open ? showDialog.open() : null;

  function closeHandler(e) {
    //reset state vars
    open = false; 
    clicked = "Reset"
    switch (e.detail.action) {
    }
  }
</script>

<Dialog
  bind:this={showDialog}
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
  on:MDCDialog:closed={closeHandler}>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->

  <Title id="simple-title">
    <slot name="title">Title</slot>
  </Title>

  <Content id="list-selection-content">
    <slot name="contents">Contents</slot>
  </Content>

  <Actions>
    <Button on:click={() => (clicked = 'Cancel')}>
      <Label>Cancel</Label>
    </Button>
    <Button variant="raised" on:click={() => (clicked = 'Ok')}>
      <Label>Ok</Label>
    </Button>
  </Actions>
</Dialog>
