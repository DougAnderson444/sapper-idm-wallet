<script>
  import Button, { Label, Icon } from "@smui/button";
  import Dialog from "../../../display/Dialog.svelte";
  import List, { Item, Graphic, Text } from "@smui/list";
  import Radio from "@smui/radio";
  import { onMount, setContext } from "svelte";

  import { selected } from "../../../stores";

  export let openChoices;
  let clicked;
  let selection = "Identity";
  let openSetupID, openPersonSetup, personsName, deviceName;

  $: {
    if (clicked === "Ok" && selection === "Identity") {
      // show identity setup Component
      openSetupID = true;
    }
  }

  $: {
    if (clicked === "Ok" && selection === "Person") {
      // show Person identity setup Component
      $selected = "PersonSetup";
      console.log(`Set context to ${$selected}`)
    }
  }

</script>

<Dialog bind:open={openChoices} bind:clicked>
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

<Dialog bind:open={openSetupID} bind:clicked>
  <span slot="title">Setup Identity</span>

  <div slot="contents">

    <List radioList>
      <Item>
        <Graphic>
          <Radio bind:group={selection} value="Person" />
        </Graphic>
        <Text>Person</Text>
      </Item>
      <Item>
        <Graphic>
          <Radio bind:group={selection} value="Organization" />
        </Graphic>
        <Text>Organization</Text>
      </Item>
    </List>

  </div>
</Dialog>
