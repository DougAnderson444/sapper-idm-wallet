<script>
  // Overview:
  // [Done] Create IPFS
  // [Done] Take PeerId privKey and encrypt pem with given password
  // [Done] Use IPFS to create wallet
  // [Done] Take username and create automatic default did doc
  // Take username and create dnslink
  // dnslink = cid of DIDDoc

  // [ Parking Lot ] Save encrypted pem somewhere online for cloud-like seamless login
  // Otherwise you need to login AND import your keys to that device (not the end of the world though)
  // Quick n dirty Options: to PouchDB, to IPFS, pointed to from DID Doc 
  // hash(did) points to orbitdb. I just need to replicate orbitdb on a server

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
  const LOCK_TYPE = "passphrase";

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
      setLock(LOCK_TYPE, $password);
      handleCreate(() => ($appSection = "SetupIdleTimer"));
      //$appSection = "SetupIdleTimer";
    })();

  const setLock = (lockType, solution) => {
    //loading = true;
    //.then(onComplete)

    $wallet.locker
      .getLock(lockType)
      .enable(solution)
      .catch(err => {
        loading = false;
        error = err;
      });
  };

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
<style>
span {
  margin: 0 1em;
}
</style>
Creating account:
<br />

{#if !$ipfsNode}
  <span>
    <Spinner size="small" />
  </span>
  Starting your IPFS node in the browser...
  <br />
{:else if typeof $ipfsNode.isOnline === 'function' && $ipfsNode.isOnline()}
  <Icon class="material-icons" style="margin-right: 4px; color: green;">
    check_circle
  </Icon>
  IPFS online.
  <br />
{/if}

{#if $ipfsNode && !$pemEncrypted}
  <span>
    <Spinner size="small" />
  </span>
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
  <span>
    <Spinner size="small" />
  </span>
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
  <span>
    <Spinner size="small" />
  </span>
  Creating digital identity...
  <br />
{/if}
