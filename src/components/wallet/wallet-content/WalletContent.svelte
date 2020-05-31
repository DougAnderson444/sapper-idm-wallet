<script>
  import Timer from "../../timer/Timer";
  import { Sessions, Locker, Identities } from "./sections";

  // svelte stuff
  import { onMount } from "svelte";
  //svelte stores
  import { wallet } from "../../stores.js";

  onMount(async () => {
    $wallet.identities.load().then(() => console.log("Identities Loaded"));
  });
</script>

<style>
  .WalletContent {
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: row;

    text-align: start;
    font-family: "Times New Roman", Times, serif;
  }

  .WalletContent .leftBar {
    flex-basis: 60px;
  }

  .WalletContent .container {
    flex-grow: 1;
  }

  .WalletContent .container .top {
    height: 40vh;
    background-color: #f3ece5;
    overflow: hidden;
  }

  .WalletContent .container .bottom {
    height: 60vh;
    display: flex;
    overflow: hidden;
    background-color: #334a43;
    color: rgb(201, 213, 210);
  }
</style>

<div class="WalletContent">
  <div class="leftBar">
    <div class="container">
      <div class="top">
        <Timer />
      </div>
      <div class="bottom">
        <Locker />
        <Identities />
        <Sessions />
      </div>
    </div>
  </div>
</div>
