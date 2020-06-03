<script>
  import Timer from "../../timer/Timer";
  import { compArr } from "./sections";
  import Button, { Label, Icon } from "@smui/button";
  import Choices from "./create-steps/Choices.svelte";
  import Fab from "@smui/fab";
  import Menu, { SelectionGroup, SelectionGroupIcon } from "@smui/menu";
  import List, {
    Item,
    Separator,
    Text,
    PrimaryText,
    SecondaryText,
    Graphic
  } from "@smui/list";

  // svelte stuff
  import { onMount } from "svelte";

  //svelte stores
  import { wallet, selected } from "../../stores.js";
  $selected = "Identities"; //init

  let open, menu, active, clicked;
  $: active = compArr[$selected];

  onMount(async () => {
    $wallet.identities.load().then(() => console.log("Identities Loaded"));
  });

  const setOpen = () => {
    open = true;
  };

  /*
      display: flex;
    align-items: center;
  .flexy {
    margin: 0;
    top: 'auto';
    right: 20;
    bottom: 20;
    right: 'auto';
    position: 'fixed';
  }
  .margins {
    margin: 0 .4em .4em 0;
  }
  */
</script>

<style>
  .vert {
    margin: 1em 0 1em 0;
  }

  .section {
    flex-grow: 1;
    max-width: 500px;
    padding: 30px;
    box-sizing: border-box;
  }

  .section .content {
    border: 1px solid rgb(201, 213, 210);
    padding: 1em;
  }
</style>

<div class="vert">

  <Choices bind:openChoices={open} />

  <Fab color="primary" on:click={() => ($selected = 'Identities')}>
    <Icon class="material-icons">home</Icon>
  </Fab>

  <div class="section">
    <div class="content">
      <svelte:component this={active.component} />
    </div>
  </div>
  <!--
  <div class="flexy">
    <div class="margins">
      <Fab color="primary" on:click={() => menu.setOpen(true)}>
        <Icon class="material-icons">add</Icon>
      </Fab>
    </div>
  </div>
  <div style="min-width: 100px;">
    <Menu bind:this={menu}>
      <List>
        <Item on:SMUI:action={() => ($selected = 'PersonSetup')}>
          <Text>Identity</Text>
        </Item>
        <Separator />
        <Item on:SMUI:action={() => (clicked = 'Cancel')}>
          <Text>Cancel</Text>
        </Item>
      </List>
    </Menu>
  </div>
-->
  <Timer />

</div>
