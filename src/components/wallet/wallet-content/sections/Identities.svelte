<script>
  //svelte stores
  import { wallet, walletSection } from "../../../stores.js";
  import Button, { Label, Icon } from "@smui/button";

  let importValue, peekValue, removeIdValue, removeMnemonicValue, ids;

  if ($wallet.identities.isLoaded()) {
    try {
      const identities = $wallet.identities.list();

      ids = identities.map(identity => ({
        addedAt: identity.getAddedAt(),
        id: identity.getId(),
        did: identity.getDid(),
        devices: identity.devices.list(),
        backup: identity.backup.getData(),
        profile: identity.profile.getDetails()
      }));
    } catch (err) {
      console.error(`ids error`, err);
    }
  }

  const handleList = () => {
    try {
      const identities = $wallet.identities.list();

      console.log("List Identities:");
      identities.forEach(identity => {
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
      });
      console.log("Final List Identities.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = () => {
    $wallet.identities
      .create("ipid", {
        profileDetails: {
          "@context": "https://schema.org",
          "@type": "Person",
          name: "John Doe"
        },
        deviceInfo: {
          type: "laptop",
          name: "MacBook Pro"
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
      });
  };

  const handleImportSubmit = () => {
    $wallet.identities
      .import("ipid", {
        mnemonic: importValue,
        deviceInfo: {
          type: "laptop",
          name: "MacBook Pro"
        }
      })
      .then(result => console.log("Imported Identity:", result));
  };

  const handlePeekSubmit = () => {
    $wallet.identities
      .peek("ipid", {
        mnemonic: peekValue
      })
      .then(result => console.log("Peek Resolved:", result));
  };

  const handleRemoveSubmit = () => {
    const { wallet } = props;

    $wallet.identities
      .remove(removeIdValue, {
        mnemonic: removeMnemonicValue
      })
      .then(() => console.log("Removed Successfully!"));
  };
</script>

<style>
  .vert {
    margin: 1em;
  }
</style>

  <h4>Identities</h4>
    {#if ids && ids.length > 0}
      <ul>
        {#each $wallet.identities.list() as identity}
          <li>addedAt: {identity.getAddedAt()}</li>
          <li>id: {identity.getId()}</li>
          <li>did: {identity.getDid()}</li>
          <li>devices: {identity.devices.list()}</li>
          <li>backup: {identity.backup.getData()}</li>
          <li>profile: {identity.profile.getDetails()}</li>
        {/each}
      </ul>
    {:else}No Identity. Create one!{/if}

    <div class="vert">
      <Button
        on:click={() => {
          $walletSection = 'PersonSetup';
        }}
        variant="outlined">
        <Icon class="material-icons">add_circle</Icon>
        <Label>Create Personal Identity</Label>
      </Button>
    </div>

    <div class="vert">
      <Button
        on:click={() => {
          $walletSection = 'PersonSetup';
        }}
        variant="outlined">
        <Icon class="material-icons">add_circle</Icon>
        <Label>Create Organizational Identity</Label>
      </Button>
    </div>

    <!--
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
