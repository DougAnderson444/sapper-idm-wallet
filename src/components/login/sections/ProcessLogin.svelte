<script>
  // Overview:

  // get wallet from localStorage
  // try to unlock with given password

  // svelte stuff
  import { onMount } from 'svelte'
  import Spinner from '../../display/Spinner.svelte'
  import createWallet from 'streamlined-idm-wallet-sdk'
  import createIPFS, { resolve } from '../../Ipfs.js'
  import { Icon } from '@smui/common'

  import { DEVICE_TYPES } from 'streamlined-idm-wallet-sdk/src/identities/identity/utils/constants/devices'

  // svelte stores
  import {
    ipfsNode,
    wallet,
    appSection,
    pemEncrypted,
    username,
    password,
    rootHash,
    nodeId,
    deviceType,
    deviceName,
    error,
  } from '../../stores.js'

  let mounted
  let mnemonicEncr
  const LOCK_TYPE = 'passphrase'

  onMount(async () => {
    mounted = true
    initIPFS()

    console.log(`1. Get saved wallet from LS`)
    mnemonicEncr = localStorage.getItem(`backup-${$username}`)
    $deviceType = localStorage.getItem(`deviceType-${$username}`)
    $deviceName = localStorage.getItem(`deviceName-${$username}`)

    // create Wallet
  })

  async function initIPFS() {
    $ipfsNode = await createIPFS($username)
  }

  let initialized
  $: if (typeof $ipfsNode.isOnline === 'function') {
    if ($ipfsNode.isOnline() && !initialized) {
      initialized = true
      ;(async () => {
        console.log('Creating Wallet....')
        $wallet = await createWallet({ ipfs: $ipfsNode })
        $wallet.locker
          .getLock(LOCK_TYPE)
          .enable($password)
          .then($wallet.locker.getLock(LOCK_TYPE).unlock($password))
          .catch((err) => {
            $error = err
          })
        $wallet.identities.load().then(() => {
          console.log('ProcessLogin loaded Identities')
          $wallet = $wallet
          $appSection = 'WalletContent'
        })

        /** Just wait for load
        $wallet.identities
          .import('ipid', {
            mnemonic: mnemonicEncr,
            deviceInfo: {
              type: $deviceType,
              name: $deviceName,
            },
          })
          .then((result) => console.log('Imported Identity:', result))
         */
      })()
    }
  }
</script>

<style>
  span {
    margin: 0 1em;
    position: relative;
    top: -0.4em;
    left: -0.2em;
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
  Loading digital identity...
  <br />
{/if}
