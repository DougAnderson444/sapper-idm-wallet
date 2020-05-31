<script>
  import InvalidWarning from "./InvalidWarning.svelte";

  //props from parent
  export let onComplete;
  
  //svelte stores
  import { wallet } from "../../stores.js";

  //local state vars
  let loading, error, value;
  let validation = {};

  //svelte stores
  //import { validation } from "../stores.js";

  const LOCK_TYPE = "passphrase";

  const validateStrength = (lockType, solution) => {
    $wallet.locker
      .getLock(lockType)
      .validate(solution)
      .then(v => {
        validation = v;
      })
      .catch(error => {
        validation = {
          score: error.score,
          suggestions: error.suggestions,
          warning: error.warning,
          error: true
        };
      });
  };

  const setLock = (lockType, solution) => {
    loading = true;

    $wallet.locker
      .getLock(lockType)
      .enable(solution)
      .then(onComplete)
      .catch(err => {
        loading = false;
        error = err;
      });
  };

  const handleInputChange = (event) => {
    validateStrength(LOCK_TYPE, value);
  };

  const handleInputKeyPress = event => {
    if (event.charCode === 13 && !validation.error && value) {
      setLock(LOCK_TYPE, value);
    }
  };
</script>

{#if loading}
  <div>...Loading...</div>
{/if}

{#if error}
  <div>{error.message}</div>
{/if}

{#if !loading && !error}
  <div>
    <h3>To setup your wallet please enter a passphrase as the Master Lock.</h3>
    <input
      type="text"
      bind:value
      id={LOCK_TYPE}
      name={LOCK_TYPE}
      on:keydown={handleInputChange}
      on:keypress={handleInputKeyPress} />
    <InvalidWarning {validation} />
  </div>
{/if}
