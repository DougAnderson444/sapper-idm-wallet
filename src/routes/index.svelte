<script>
  // svelte stuff
  import { onMount } from "svelte";

  import { appSections } from "../components/login/sections";
  import Spinner from "../components/display/Spinner.svelte";

  //svelte stores
  import {
    ipfsNode,
    appSection,
    pemEncrypted
  } from "../components/stores.js";

  let mounted, active;

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

<h1>Identity Manager</h1>
<p>
  A place to manage your digital identity, that doesn't depend on Facebook or
  Google -- just your electricty and internet connection. 100% Owned and stored
  by you.
</p>
<p>Try it out!</p>

<div class="vert">
  {#if mounted}
    <div class="content">
      <svelte:component
        this={active.component} />
    </div>
    <br />
    <p>{$pemEncrypted}</p>
  {:else}
    <Spinner />
  {/if}
</div>
