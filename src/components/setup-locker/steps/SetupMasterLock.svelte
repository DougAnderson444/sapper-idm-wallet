<script>
  import InvalidWarning from "./InvalidWarning.svelte";

  //props from parent
  export let locker;
  export let onComplete;

  //local state vars
  let loading, error, inputValue;
  let validation = {};

  //svelte stores
  //import { validation } from "../stores.js";

  const LOCK_TYPE = "passphrase";

  const validateStrength = (lockType, solution) => {
    locker
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

    locker
      .getLock(lockType)
      .enable(solution)
      .then(onComplete)
      .catch(err => {
        loading = false;
        error = err;
      });
  };

  const handleInputChange = () => {
    validateStrength(LOCK_TYPE, inputValue);
  };

  const handleInputKeyPress = event => {
    if (event.charCode === 13 && !validation.error && inputValue) {
      setLock(LOCK_TYPE, inputValue);
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
      bind:value={inputValue}
      id={LOCK_TYPE}
      name={LOCK_TYPE}
      onChange={handleInputChange}
      onKeyPress={handleInputKeyPress} />
    <InvalidWarning {validation} />
  </div>
{/if}
