<script>
  // Overview:
  // [Done] Create IPFS
  // [Done] Take PeerId privKey and encrypt pem with given password
  // [Done] Use IPFS to create wallet
  // [ Testing ] Take username and create automatic default did doc
  // Save encrypted pem to IPFS, post cid in updated DID Doc
  // Take username and create dnslink
  // dnslink = cid of DIDDoc

// IPID creates a random key for each DID, so it's not linked to this IPFS PeerId at all... 
// I can export the key encrypted under the user's password

  // svelte stuff
  import { onMount } from "svelte";
  import Spinner from "../../display/Spinner.svelte";
  import createWallet from "streamlined-idm-wallet-sdk";
  import createIPFS from "../../Ipfs.js";
  import { Icon } from "@smui/common";

  import { DEVICE_TYPES } from "streamlined-idm-wallet-sdk/src/identities/identity/utils/constants/devices";

  // svelte stores
  import {
    ipfsNode,
    wallet,
    appSection,
    pemEncrypted,
    username,
    password,
    rootHash,
    nodeId
  } from "../../stores.js";

  let deviceName = `${$username}'s device`;
  let deviceType = DEVICE_TYPES[0];

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
      console.log("Wallet created.\nCreate ID and DID Doc.");
      handleCreate(() => ($appSection = "SetupIdleTimer"));
      //$appSection = "SetupIdleTimer";
    })();

  const handleCreate = cb => {
    $wallet.identities
      .create("ipid", {
        profileDetails: {
          "@context": "https://schema.org",
          "@type": "Person",
          name: $username
        },
        deviceInfo: {
          type: deviceType,
          name: deviceName
        }
      })
      .then(identity => {
        console.log("Created Identity:");
        console.log("Identity:", identity);
        console.log("Serialized:", {
          addedAt: identity.getAddedAt(),
          id: identity.getId(),
          did: identity.getDid(),
          devices: identity.devices.list(),
          backup: identity.backup.getData(),
          profile: identity.profile.getDetails()
        });
        console.log(" ");
        console.log("End of Created Identity.");

        (async () => {
          const match = identity.getDid().match(/did:(\w+):(\w+).*/);
          console.log(`Cid is ${match[2]}`);
          console.log(
            `Cid does ${match[2] == $nodeId ? "" : "NOT"} match identifier \n ${
              match[2]
            } =? ${$nodeId}`
          );

          try {
            for await (const name of $ipfsNode.name.resolve(match[2])) {
              console.log(name);
              // /ipfs/QmQrX8hka2BtNHa8N8arAq16TCVx5qHcb46c5yPewRycLm
              $rootHash = name.replace(/^\/ipfs\//, "");
              console.log(`$rootHash ${$rootHash}`);
              console.log(
                `resolves to https://explore.ipld.io/#/explore/${rootHash}`
              );
            }
          } catch (err) {
            console.log(`Error getting IPFS path: \n ${err}`);
          }
        })();
      })
      .catch(err => {
        console.log(`PersonSetup err ${err}`);
      })
      .finally(cb);
  };
</script>

<center>
  <Spinner />
</center>
Creating account:
<br />

{#if !$ipfsNode}
  Starting your IPFS node in the browser...
  <br />
{:else}
  <Icon class="material-icons" style="margin-right: 4px; color: green;">
    check_circle
  </Icon>
  IPFS node started.
  <br />
{/if}

{#if typeof $ipfsNode.isOnline === 'function' && $ipfsNode.isOnline()}
  <Icon class="material-icons" style="margin-right: 4px; color: green;">
    check_circle
  </Icon>
  IPFS online.
  <br />
{/if}

{#if $ipfsNode && !$pemEncrypted}
  Encrypting password...
  <br />
{:else if $pemEncrypted}
  <Icon class="material-icons" style="margin-right: 4px; color: green;">
    check_circle
  </Icon>
  Password encrypted.
  <br />
{/if}

{#if $pemEncrypted && !$wallet}
  Creating wallet...
  <br />
{:else if $wallet}
  <Icon class="material-icons" style="margin-right: 4px; color: green;">
    check_circle
  </Icon>
  Wallet Created.
  <br />
{/if}

{#if $wallet && !$wallet.identities.isLoaded()}
  Creating digital identity...
  <br />
{/if}
