<script>
  import Button, { Label, Icon } from "@smui/button";
  import Dialog from "../../../display/Dialog.svelte";
  import List, { Item, Graphic, Text } from "@smui/list";
  import Radio from "@smui/radio";
  import Textfield, { Input, Textarea } from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text/index";

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
      openPersonSetup = true;
    }
  }

  $: {
    if (clicked === "Ok" && personsName !== null) {
      // show Person identity setup Component
      console.log(`Person's name is ${personsName}`);
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

<Dialog bind:open={openPersonSetup} bind:clicked>
  <span slot="title">Personal ID Setup</span>
  <div slot="contents">
    <List>
      <Item>

      </Item>
    </List>
  </div>
</Dialog>

<!-- Can't put Textfield in dialog. 

          <Textfield
          variant="outlined"
          bind:value={personsName}
          label="Person's Name"
          input$aria-controls="helper-text-outlined-name"
          input$aria-describedby="helper-text-outlined-name" />
        <HelperText id="helper-text-outlined-name">
          First Name Last Name works well
        </HelperText>

      <Item>
        <Textfield
          variant="outlined"
          bind:value={deviceName}
          label="Device Nickname"
          input$aria-controls="helper-text-outlined-device"
          input$aria-describedby="helper-text-outlined-device" />
        <HelperText id="helper-text-outlined-device">Device Nickname</HelperText>
      </Item>

-->
