<script>
  import Timer from "../../timer/Timer";
  import { WalletMenu, Sessions, Locker, Identities } from "./sections";
  import Button, { Label, Icon } from "@smui/button";
  import Choices from "./create-steps/Choices.svelte";

  // svelte stuff
  import { onMount } from "svelte";
  //svelte stores
  import { wallet } from "../../stores.js";
  let active = "Identity";
  let open;

  onMount(async () => {
    $wallet.identities.load().then(() => console.log("Identities Loaded"));
  });

  const setOpen = () => {
    open = true;
  };
</script>

<style>

</style>

<Choices bind:openChoices={open} />

<Button on:click={setOpen} variant="outlined">
  <Icon class="material-icons">add_circle</Icon>
  <Label>Create</Label>
</Button>

<Timer />
<!--
<div>
  Your Identity Manager:
  <div class="drawer-container">
    <Drawer variant="dismissible" bind:this={myDrawer} bind:open={myDrawerOpen}>
      <Header>
        <Title>Super Drawer</Title>
        <Subtitle>It's the best drawer.</Subtitle>
      </Header>
      <Content>
        <List>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive('Identity')}
            activated={active === 'Identity'}>
            <Text>Create Identity</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive('Identities')}
            activated={active === 'Identities'}>
            <Text>Identities</Text>
          </Item>
        </List>
      </Content>
    </Drawer>

    <AppContent class="app-content">
      <main class="main-content">
        <Button on:click={() => (myDrawerOpen = !myDrawerOpen)}  variant="raised" >
          <Label>Menu</Label>
        </Button>
        <br />{active}
      </main>
    </AppContent>
  </div>
</div>

<p />

<div class="WalletContent">
  <div class="leftBar">
    <div class="container">
      <div class="top">
        <Locker />
        <Identities />
        <Sessions />
      </div>
      <div class="bottom">
        
      </div>
    </div>
  </div>
</div>
-->
