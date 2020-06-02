<script>
  import InvalidWarning from "./InvalidWarning.svelte";
  import Warning from "../../display/Warning.svelte";

  //props from parent
  export let onComplete;

  //svelte stores
  import { wallet } from "../../stores.js";
  import { beforeUpdate, tick } from 'svelte';

  // Svelte Material UI
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import { Label, Icon } from "@smui/common";

  //local state vars
  let value = "";
  let confirmValue = "";
  let loading, error;
  let validation = {};
  let match = true

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

  const handleInputChange = event => {
    validateStrength(LOCK_TYPE, value);
  };

  const handleInputKeyPress = event => {
    if (event.charCode === 13 && !validation.error && value && match) {
      setLock(LOCK_TYPE, value);
    }
  };

  const checkMatch = async() =>{
    (confirmValue === value) ? match = true : match = false;
  }

</script>

{#if loading}
  <div>...Loading...</div>
{/if}

{#if error}
  <div>{error.message}</div>
{/if}

{#if !loading && !error}
  <div>
    <h5>To setup your wallet please enter a passphrase as the Master Lock.</h5>

    <Textfield
      bind:value
      type="password"
      variant="outlined"
      label="Passphrase"
      input$aria-controls="super-helper"
      input$aria-describedby="super-helper"
      on:keydown={handleInputChange} />
    <HelperText id="super-helper">
      Easy to remember phrase like "I grew up on Main Street back in 87"
    </HelperText>

    <InvalidWarning {validation} />

    <h5>Type passphrase again to to confirm:</h5>
    <Textfield
      bind:value={confirmValue}
      type="password"
      variant="outlined"
      label="Confirm Passphrase"
      input$aria-controls="super-helper-2"
      input$aria-describedby="super-helper-2"
      on:keypress={handleInputKeyPress}
      on:keyup={checkMatch} />
    <HelperText id="super-helper-2">
      Press Enter when you're ready!
    </HelperText>

    <Warning show={(!match)}>
    	<span slot="phrase">
		    ⛔️ Passphrases don't match ⛔️
	    </span>
    </Warning>

  </div>
{/if}
