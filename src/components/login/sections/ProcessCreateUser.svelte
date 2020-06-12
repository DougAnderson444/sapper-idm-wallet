<script>
  // Overview:
  // [Done] Create IPFS
  // [Done] Take PeerId privKey and encrypt pem with given password
  // [Done] Use IPFS to create wallet
  // [Done] Take username and create automatic default did doc
  // [Done] Check to see if this username is allowed to be written (not taken, owned by me)
  // [Done] Take username and create dnslins, dnslink = cid of DIDDoc

  // [Done] Create user on pouchdb server,
  // [Done] if user exists redirect back to create user page with warning/error

  // [Done] Test that ipfs.name.reolve(doug.peerpiper.io) works from another node, both go and JS

  // For LogIn
  // Two components: peerpiper shortcut name (server fetch)
  // 2) Local wallet = pristine or not.
  // if pristine, fetch remote and decrypt
  // if not pristine, load it up (how to handle multiple wallets per device? by passphrase?)
  // what if passphrase mismatches username?

  // need to createWallet in order to find out if this passphrase unlocks it. but the lockers aren't named?

  // *** Super & Peers: Pin where the dnslink points + PeerPiper files...

  // Parking Lot
  // Save encrypted pem somewhere online for cloud-like seamless login
  // Otherwise you need to login AND import your keys to that device (not the end of the world though)
  // Quick n dirty Options: to PouchDB, to IPFS, pointed to from DID Doc
  // hash(did) points to orbitdb. I just need to replicate orbitdb on a server

  // IPID creates a random key for each DID, so it's not linked to this IPFS PeerId at all...
  // I can export the key encrypted under the user's password

  // svelte stuff
  import { onMount } from 'svelte'
  import Spinner from '../../display/Spinner.svelte'
  import createWallet from 'streamlined-idm-wallet-sdk'
  import createIPFS, { resolve, getCIDFromDNSName } from '../../Ipfs.js'
  import IPFS from 'ipfs'
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
    dnsSuccess
  } from '../../stores.js'

  let mounted
  const LOCK_TYPE = 'passphrase'

  onMount(async () => {
    mounted = true
    console.log(`1. Process create user request`)
    let userCreated = await createNewUser()
    console.log(`5. userCreated: ${userCreated}`)

    if (userCreated) {
      initIPFS()
    } else {
      console.log(`User ${$username} already exists`)
      $appSection = 'CreateNewUser'
    }
  })

  async function createNewUser() {
    let url = encodeURI(
      `/api/createUser?username=${$username.toLowerCase()}&password=${$password}`,
    )

    const res = await fetch(url)

    if (!res.ok) return false

    let response = await res.json()
    console.log(`3. Response ${JSON.stringify(response, null, 2)}`)

    // if exists: {"error":"conflict","reason":"Document update conflict."}
    if (response.error) {
      // set error to username already exists and return to createNewUser
      $error = 'That username already exists. Pick another one?'
      console.log(`4. Username ${$username} already exists`)
      // stop this script
      return false
    }
    console.log(`4. Username ${$username} created`)
    return true
  }

  async function initIPFS() {
    $ipfsNode = await createIPFS($username)
  }

  // make sure IPFS is online before using it
  $: {
    if (typeof $ipfsNode.isOnline === 'function') {
      if ($ipfsNode.isOnline()) {
        getPem()
      } else {
        console.log('ipfsNode is NOT Online')
      }
    }
  }

  async function getPem() {
    //export password protected pem
    // ipfs.key.export(name, password, [options])
    $pemEncrypted = await $ipfsNode.key.export('self', $password)
  }

  // when pemEncrypted changes (ie. gets set to non-zero), that means IPFS is ready, so generate the wallet
  $: if ($pemEncrypted)
    (async () => {
      $wallet = await createWallet({ ipfs: $ipfsNode })
      console.log('Creating ID and DID Doc.')
      setLock(LOCK_TYPE, $password)
      handleCreate(() => {})
    })()

  const setLock = (lockType, solution) => {
    //loading = true;
    //.then(onComplete)

    $wallet.locker
      .getLock(lockType)
      .enable(solution)
      .catch((err) => {
        loading = false
        error = err
      })
  }

  const handleCreate = (cb) => {
    $wallet.identities
      .create('ipid', {
        profileDetails: {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: $username,
        },
        deviceInfo: {
          type: $deviceType,
          name: $deviceName,
        },
      })
      .then(async (identity) => {
        console.log('Serialized:', {
          addedAt: identity.getAddedAt(),
          id: identity.getId(),
          did: identity.getDid(),
          devices: identity.devices.list(),
          backup: identity.backup.getData(),
          profile: identity.profile.getDetails(),
        })
        // encrypt the pem
        var backupData = identity.backup.getData()
        var privKeyRaw = await IPFS.crypto.keys.import(backupData.privateKey)
        var pemEncrypted = await privKeyRaw.export($password)
        // save mneumic to IPFS for cloud-like functionality
        // point to it with DID Doc as recovery service
        // load from IPFS if no identity loaded locally
        // $ipfsNode.

        ;(async () => {
          const match = identity.getDid().match(/did:(\w+):(\w+).*/)
          const ipnsHash = match[2]
          console.log(`ipnsHash is ${ipnsHash}`)

          try {
            $rootHash = await resolve($ipfsNode, ipnsHash)
            // add DNS record
            const dnsConfirmationCode = await fetch(
              `/api/dns?subdomain=${$username}&hash=${ipnsHash}`,
            )
            const code = await dnsConfirmationCode.text()
            console.log(
              `DNSuccess Confirmation Code: ${JSON.stringify(code, null, 2)} ${new Date(Date.now())}`,
            )
            $dnsSuccess = true
          } catch (err) {
            console.log(`Error in process: \n ${err}`)
          }
        })()

        $appSection = 'WalletContent'
      })
      .catch((err) => {
        $error = `Wallet Setup Error: ${err}`
        console.log(`PersonSetup err ${err}`)
        $appSection = 'LogInOrCreateChoice'
      })
      .finally(cb)
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
