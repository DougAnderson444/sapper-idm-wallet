<script>
  import Button, { Label, Icon } from "@smui/button";
  import Dialog from "../../../display/Dialog.svelte";
  import List, { Item, Graphic, Text } from "@smui/list";
  import Radio from "@smui/radio";

  export let open;
  let clicked;
  let selection = "Identity";

  $: {
    if (clicked === "Ok") {
      console.log("selected", selection);
      console.log("clicked", clicked);
    }
  }
</script>

<Dialog bind:open bind:clicked>
  <span slot="title">Create Item</span>

  <div slot="contents">

    <List radioList>
      <Item>
        <Graphic>
          <Radio bind:group={selection} value="Identity" />
        </Graphic>
        <Text>Identity</Text>
      </Item>
      <Item>
        <Graphic>
          <Radio bind:group={selection} value="App" />
        </Graphic>
        <Text>Connect App</Text>
      </Item>
    </List>

  </div>
</Dialog>
