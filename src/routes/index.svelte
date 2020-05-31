<script>
  // svelte stuff
  import { onMount } from "svelte";

  //svelte stores
  import { ipfsNode, elapsed, start } from "../components/stores.js";

  import IpfsComp from "../components/Ipfs.svelte";
  import Wallet from "../components/wallet/Wallet.svelte";

  import Spinner from "../components/display/Spinner.svelte";
  //import { ProgressBar } from "@colorfuldots/svelteit";

  let mounted;

  onMount(async () => {
    mounted = true;
  });
</script>

<style>
  h1,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Identity Manager App</title>
</svelte:head>

<h1>Identity Manager</h1>
<p>
    A place to manage your digital identity, that doesn't depend on Facebook or Google -- just your electricty and internet connection. 
    100% Owned and stored by you.
</p>

{#if mounted}
  <IpfsComp />

  {#if $ipfsNode}
    <Wallet />
  {:else}
    <Spinner />
  {/if}
{:else}
  <Spinner />
{/if}
<br />