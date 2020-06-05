<script>
  // svelte stuff
  import { onMount } from "svelte";

  import { appSections } from "../components/login/sections";
  import Spinner from "../components/display/Spinner.svelte";

  //svelte stores
  import {
    appSection,
    rootHash
  } from "../components/stores.js";

  let mounted, active, path;

  $appSection = "LogIn";
  $: active = appSections[$appSection];

  onMount(() => {
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
  .vert {
    margin: 1em;
  }
</style>

<svelte:head>
  <title>Identity Manager App</title>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
</svelte:head>

<h1>PeerPiper.io</h1>
<p>
  Your place to manage your own digital footprint, that doesn't depend on
  Facebook or Google -- just your electricty and internet connection. 100% Owned
  and stored by you.
</p>
<p>Try it out!</p>

<div class="vert">
  {#if mounted}
    <div class="content">
      <svelte:component this={active.component} />
    </div>
    <br />
    {#if $rootHash}
    <p>Your DID Doc is published here:</p>
    <p>
      <a
        href="https://explore.ipld.io/#/explore/{$rootHash}"
        target="_blank"
        rel="noopener noreferrer">
        {$rootHash}
      </a>
    </p>
    {/if}
  {:else}
    <center>
      <Spinner />
    </center>
  {/if}
</div>
