<script>
  import Timer from "../../timer/Timer";
  import { walletSections } from "./sections";
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
  import { wallet, walletSection } from "../../stores.js";
  $walletSection = "Identities"; //init

  let open, menu, active, clicked;
  $: active = walletSections[$walletSection];

  onMount(async () => {
    $wallet.identities.load().then(() => console.log("Identities Loaded"));
    $wallet.locker.onLockedChange(handleLockedChanged);
  });

  const handleLockedChanged = () => {
    $walletSection = "Identities";
    $wallet = $wallet;
  };

  $: if ($wallet && $wallet.locker.isLocked()) $walletSection = "LockScreen";
</script>

<style>
  .vert {
    margin: 1em 0 1em 0;
  }

  .section {
    flex-grow: 1;
    max-width: 100%;
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

  <Fab color="primary" on:click={() => ($walletSection = 'Identities')}>
    <Icon class="material-icons">home</Icon>
  </Fab>

  <div class="section">
    <div class="content">
      {#if $wallet.locker.isLocked()}
        <svelte:component this={walletSections['LockScreen']} />
      {:else}
        <svelte:component this={active.component} />
      {/if}
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
        <Item on:SMUI:action={() => ($walletSection = 'PersonSetup')}>
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
