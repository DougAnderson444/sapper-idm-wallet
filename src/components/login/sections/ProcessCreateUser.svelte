<script>
  // Overview:
  // in routes/index.svelte
  // [Done] Create IPFS in routes/index.svelte by dispatching userReady() in CreateNewUser
  // [Done] Take PeerId privKey and encrypt pem with given password
  // [Done] Use IPFS to create wallet
  // [ Next ] Take username and create automatic default did doc
  // Save encrypted pem to IPFS, post cid in DID Doc
  // Take username and create dnslink
  // dnslink = cid of DIDDoc

  // svelte stuff
  import { onMount } from "svelte";
  import Spinner from "../../display/Spinner.svelte";
  import createWallet from "streamlined-idm-wallet-sdk";
  import createIPFS from "../../Ipfs.js";

  // svelte stores
  import {
    ipfsNode,
    wallet,
    appSection,
    pemEncrypted,
    username,
    password
  } from "../../stores.js";

  let mounted;

  onMount(async () => {
    mounted = true;
    initIPFS();
  });

  async function initIPFS() {
    $ipfsNode = await createIPFS($username);
  }

  // make sure IPFS is online before using it
  $: {
    if (typeof $ipfsNode.isOnline === "function") {
      console.log("ipfsNode isOnline is a fn");
      if ($ipfsNode.isOnline()) {
        console.log("ipfsNode isOnline");
        getPem();
      } else {
        console.log("ipfsNode is NOT Online");
      }
    }
  }

  async function getPem() {
    //export password protected pem
    // ipfs.key.export(name, password, [options])
    $pemEncrypted = await $ipfsNode.key.export("self", $password);
  }

  // when pemEncrypted changes (ie. gets set to non-zero), that means IPFS is ready, so generate the wallet
  $: if ($pemEncrypted)
    (async () => {
      $wallet = await createWallet({ ipfs: $ipfsNode });
      console.log('Wallet created')
      $appSection = "SetupIdleTimer";
    })();

  // when wallet gets set, change appSection component
  //$: if ($wallet) $appSection = "SetupIdleTimer";
</script>

<center>
  {#if !$pemEncrypted}
    <Spinner />
  {/if}

</center>
Creating account:
<br />

{#if !$ipfsNode}
  Starting your IPFS node in the browser...
  <br />
{:else}
  IPFS node started.
  <br />
{/if}

{#if (typeof $ipfsNode.isOnline === "function")  && ($ipfsNode.isOnline()) }
IPFS online.
{/if}

{#if $ipfsNode && !$pemEncrypted}
  Encrypting password...
  <br />
{:else if $pemEncrypted}
  Password encrypted!
  <br />
{/if}

{#if $pemEncrypted && !$wallet}
  Creating wallet...
  <br />
{:else if $wallet}
  Wallet Created.
  <br />
{/if}
