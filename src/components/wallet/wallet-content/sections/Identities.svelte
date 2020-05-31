<script>
  //svelte stores
  import { wallet } from "../../../stores.js";

  let importValue, peekValue, removeIdValue, removeMnemonicValue;

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
  .section {
    flex-grow: 1;
    max-width: 500px;
    padding: 30px;
    box-sizing: border-box;
  }

  .section .content {
    border: 1px solid rgb(201, 213, 210);
  }

  .section .content .option {
    margin: 20px;
  }

  .section .content .option > * {
    margin: 0 10px;
  }
</style>

<div class="section">
  <h4>Identities</h4>
  <div class="content">
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
        bind:value={removeMnemonicValue}
        />
      <button on:click={handleRemoveSubmit}>Remove</button>
    </div>
  </div>
</div>
