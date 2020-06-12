<script>
  //svelte stores
  import {
    wallet,
    walletSection,
    username,
    rootHash,
    ipfsNode,
    dnsSuccess,
  } from '../../../stores.js'
  import Button, { Label, Icon } from '@smui/button'
  import createIPFS, { resolve, getCIDFromDNSName } from '../../../Ipfs.js'
  // svelte stuff
  import { onMount } from 'svelte'

  let importValue,
    peekValue,
    removeIdValue,
    removeMnemonicValue,
    ids,
    idLoaded,
    mounted

  onMount(async () => {
    mounted = true
  })
  $: {
    if (mounted && $dnsSuccess) {
      console.log(`dnsSuccess ` + new Date(Date.now()))
      setTimeout(getDNS, 500) // 5 sec too short. 15s?
     }
  }

  const getDNS = async () => {
    console.log(`getDNS ` + new Date(Date.now()))
    try {
      let r = await getCIDFromDNSName($ipfsNode, `${$username}.peerpiper.io`)
      console.log(`(IDs.svelte) ${$username}.peerpiper.io resolves to ${r}`)
      if (r) $rootHash = r
    } catch (err) {
      console.log(err)
    }
  }

  $: {
    idLoaded = $wallet.identities.isLoaded()
    //console.log(`Identities loaded in ID.svelte`)
  }

  $: if (idLoaded) {
    try {
      const identities = $wallet.identities.list()

      ids = identities.map((identity) => ({
        addedAt: identity.getAddedAt(),
        id: identity.getId(),
        did: identity.getDid(),
        devices: identity.devices.list(),
        backup: identity.backup.getData(),
        profile: identity.profile.getDetails(),
      }))
      var ipnsHash = ids[0].did.replace('did:ipid:', '')
      console.log(`did ${ipnsHash}`)
    } catch (err) {
      console.error(`ids error`, err)
    }
  }

  const handleList = () => {
    try {
      const identities = $wallet.identities.list()

      console.log('List Identities:')
      identities.forEach((identity) => {
        console.log('Identity:', identity)
        console.log('Serialized:', {
          addedAt: identity.getAddedAt(),
          id: identity.getId(),
          did: identity.getDid(),
          devices: identity.devices.list(),
          backup: identity.backup.getData(),
          profile: identity.profile.getDetails(),
        })
        console.log(' ')
      })
      console.log('Final List Identities.')
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreate = () => {
    $wallet.identities
      .create('ipid', {
        profileDetails: {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'John Doe',
        },
        deviceInfo: {
          type: 'laptop',
          name: 'MacBook Pro',
        },
      })
      .then((identity) => {
        console.log('Created Identity:')
        console.log('Identity:', identity)
        console.log('Serialized:', {
          addedAt: identity.getAddedAt(),
          id: identity.getId(),
          did: identity.getDid(),
          devices: identity.devices.list(),
          backup: identity.backup.getData(),
          profile: identity.profile.getDetails(),
        })
        console.log(' ')
        console.log('End of Created Identity.')
      })
  }

  const handleImportSubmit = () => {
    $wallet.identities
      .import('ipid', {
        mnemonic: importValue,
        deviceInfo: {
          type: 'laptop',
          name: 'MacBook Pro',
        },
      })
      .then((result) => console.log('Imported Identity:', result))
  }

  const handlePeekSubmit = () => {
    $wallet.identities
      .peek('ipid', {
        mnemonic: peekValue,
      })
      .then((result) => console.log('Peek Resolved:', result))
  }

  const handleRemoveSubmit = () => {
    const { wallet } = props

    $wallet.identities
      .remove(removeIdValue, {
        mnemonic: removeMnemonicValue,
      })
      .then(() => console.log('Removed Successfully!'))
  }
</script>

<style>
  .vert {
    margin: 1em;
  }
</style>

<h3>{$username} Digital Identities</h3>
{#if !idLoaded}Loading identities...{/if}
{#if ids && ids.length > 0}
  Share your ID with others: {$username}.peerpiper.io
  <ul>
    {#each $wallet.identities.list() as identity, i}
      {i + 1}.
      {#if $rootHash}
        {#await $rootHash then $rootHash}
          <a
            href="https://explore.ipld.io/#/explore/{$rootHash}"
            target="_blank"
            rel="noopener noreferrer">
            {identity.getDid()}
          </a>
        {/await}
      {:else}{identity.getDid()}{/if}
      <br />
      added on: {new Date(identity.getAddedAt())}
      <ul>devices:</ul>
      {#each identity.devices.list() as device}
        {device.name} ({device.type}) added {new Date(device.createdAt)}
        <br />
        {device.name}'s Public Key:
        <!--
        <br />
        {device.keyMaterial.publicKeyPem}
        {device.keyMaterial.publicExtendedKeyBase58}
        -->
        <br />
      {/each}
      {#each [...Object.entries(identity.profile.getDetails()).sort()] as [key, val]}
        {#if key == '@type'}
          <p>{key}: {val}</p>
        {/if}
      {/each}

      {#each [...Object.entries(identity.backup.getData()).sort()] as [key, val]}
        {#if key != ''}
          <p>{key}: {val}</p>
        {/if}
      {/each}

      {#each [...Object.entries(identity.profile.getDetails()).sort()] as [key, val]}
        {#if key != ''}
          <p>{key}: {val}</p>
        {/if}
      {/each}
      <!--br />
      {identity.profile.getDetails().then(p => {
        p.name;
      })}
      -->
    {/each}
  </ul>
{:else}
  No Identity Saved.
  <br />
  If you cleared your browser, you'll need to import your ID from your backup
  card.
{/if}

<!--

<div class="vert">
  <Button
    on:click={() => {
      $walletSection = 'PersonSetup'
    }}
    variant="outlined">
    <Icon class="material-icons">add_circle</Icon>
    <Label>Add Personal Identity</Label>
  </Button>
</div>

<div class="vert">
  <Button
    on:click={() => {
      $walletSection = 'PersonSetup'
    }}
    variant="outlined">
    <Icon class="material-icons">add_circle</Icon>
    <Label>Add Organizational Identity</Label>
  </Button>
</div>

    <div class="option">
      <span>List</span>
      <button on:click={handleList}>List</button>
    </div>
    <div class="option">
      <span>Create</span>
      <button on:click={handleCreate}>Create</button>
    </div>
    <div class="option">
      <span>Peek</span>
      <input type="text" placeholder="mnemonic" bind:value={peekValue} />
      <button on:click={handlePeekSubmit}>Submit</button>
    </div>
    <div class="option">
      <span>Import</span>
      <input type="text" placeholder="mnemonic" bind:value={importValue} />
      <button on:click={handleImportSubmit}>Submit</button>
    </div>
    <div class="option">
      <span>Remove</span>
      <input type="text" placeholder="id" bind:value={removeIdValue} />
      <input
        type="text"
        placeholder="mnemonic"
        bind:value={removeMnemonicValue} />
      <button on:click={handleRemoveSubmit}>Remove</button>
    </div>
    -->
