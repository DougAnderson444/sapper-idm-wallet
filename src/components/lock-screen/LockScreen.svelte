<script>
  //svelte stores
  import { wallet } from "../stores.js";

  const LOCK_TYPE = "passphrase";

  let loading = false;
  let error = undefined;
  let value;

  const unlock = (lockType, challenge) => {
    loading = true;

    $wallet.locker
      .getLock(lockType)
      .unlock(challenge)
      .catch(err => {
        loading: false;
        error = err;
      });
  };

  const handleInputKeyPress = event => {
    if (event.charCode === 13) {
      this.unlock(LOCK_TYPE, value);
    }
  };
</script>

{#if loading}
  <div>...Loading...</div>
{:else}
  <div>
    <h1>Lock Screen</h1>
    <input
      type="text"
      bind:value
      onKeyPress={this.handleInputKeyPress} />
    {#if error}
      <p>{`⛔️ ${error.message} ⛔️`}</p>
    {/if}
  </div>
{/if}
