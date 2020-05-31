<script>
  //svelte stores
  import { wallet } from "../../../stores.js";

  let getSessionId, isValidSessionId, createIdentityId, destroySessionId;

  const mockApp = {
    id: "1a2b3c",
    name: "MyDapp",
    homepageUrl: "http://mydapp.com",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f4/Icon_1_%28set_orange%29.png"
  };

  const handleGetSubmit = () => {

    try {
      const session = $wallet.sessions.getById(getSessionId);

      console.log(session);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleIsValidSubmit = () => {
    console.log(
      `Session ${isValidSessionId} is valid? ${$wallet.sessions.isValid(
        isValidSessionId
      )}`
    );
  };

  const handleCreateSubmit = () => {

    $wallet.sessions
      .create(createIdentityId, mockApp, { maxAge: 1000 * 60 * 3 })
      .then(session => {
        console.log("Session:", session);
        console.log("Serialized Session:", {
          id: session.getId(),
          appId: session.getAppId(),
          identityId: session.getIdentityId(),
          identityDid: session.getIdentityDid(),
          didPublicKeyId: session.getDidPublicKeyId(),
          keyMaterial: session.getKeyMaterial(),
          meta: session.getMeta(),
          createdAt: session.getCreatedAt()
        });
      })
      .catch(console.error);
  };

  const handleDestroySubmit = () => {
    $wallet.sessions
      .destroy(destroySessionId)
      .then(() => console.log(`Session destroyed: ${destroySessionId}`));
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
  <h4>Sessions</h4>
  <div class="content">
    <div class="option">
      <span>Get</span>
      <input type="text" placeholder="sessionId" bind:value={getSessionId} />
      <button on:click={handleGetSubmit}>Get</button>
    </div>
    <div class="option">
      <span>Is Valid</span>
      <input
        type="text"
        placeholder="sessionId"
        bind:value={isValidSessionId} />
      <button on:click={handleIsValidSubmit}>Check</button>
    </div>
    <div class="option">
      <span>Create</span>
      <input
        type="text"
        placeholder="identityId"
        bind:value={createIdentityId} />
      <button on:click={handleCreateSubmit}>Create</button>
    </div>
    <div class="option">
      <span>Destroy</span>
      <input
        type="text"
        placeholder="sessionId"
        bind:value={destroySessionId} />
      <button on:click={handleDestroySubmit}>Destroy</button>
    </div>
  </div>
</div>