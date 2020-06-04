<script>
  import InvalidWarning from "../../setup-locker/steps/InvalidWarning.svelte";
  import Warning from "../../display/Warning.svelte";
  import checkPassphraseStrength from "../CheckPassphraseStrength";
  import Button, { Label } from "@smui/button";
  import FormField from "@smui/form-field";
  import Checkbox from "@smui/checkbox";
  import { PasswordError } from "../errors";

  // svelte stuff
  import { onMount, createEventDispatcher } from "svelte";
  import { appSection, userReady, username, password } from "../../stores";

  // Svelte Material UI
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import { Icon } from "@smui/common";

  const dispatch = createEventDispatcher();

  //local state vars
  let loading, error;
  let validation = {};
  let match = true;
  let checked = false;
  let checkedTerms;
  let confirmValue = "";

  const LOCK_TYPE = "passphrase";

  async function validate(passphrase) {
    const result = checkPassphraseStrength(passphrase);
    if (result.score < 0.5) {
      throw new PasswordError("Passphrase is too weak", result);
    }
    return result;
  }

  onMount(() => {
    // confirmValue.focus(); //breaks
  });

  const validateStrength = (lockType, solution) => {
    validate(solution)
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

  const handlePasswordInput = event => {
    validateStrength(LOCK_TYPE, $password);
  };

  const handleInputKeyPress = event => {
    if (event.charCode === 13 && !validation.error && $password) {
      handleSubmit();
    }
  };

  const checkMatch = async () => {
    confirmValue === $password ? (match = true) : (match = false);
  };

  const handleSubmit = () => {
    if (!validation.error && $password && match) {
      // process creation
      // Create IPFS
      // Take PeerId privKey and encrypt with this password
      $userReady = true;
      $appSection = "ProcessCreateUser";
    }
  };
</script>

<style>
  div {
    margin-top: 1em;
    margin-bottom: 1em;
  }
</style>

{#if loading}
  <div>...Loading...</div>
{/if}

{#if error}
  <div>{error.message}</div>
{/if}

{#if !loading && !error}
  <div>
    <form on:submit|preventDefault={handleSubmit}>
      <h4>Create a new account</h4>
      <div>
        <Textfield
          bind:value={$username}
          type="text"
          variant="outlined"
          label="Username"
          input$aria-controls="super-helper-Username"
          input$aria-describedby="super-helper-Username" />
        <HelperText id="super-helper-Username">
          This will be your @username
        </HelperText>
      </div>

      <div>
        <Textfield
          bind:value={$password}
          type="password"
          variant="outlined"
          label="Passphrase"
          input$aria-controls="super-helper"
          input$aria-describedby="super-helper"
          on:keydown={handlePasswordInput}
          on:keydown={handleInputKeyPress} />
        <HelperText id="super-helper">
          Easy to remember phrase like "I grew up on Main Street back in 87"
        </HelperText>

        <InvalidWarning {validation} />
      </div>

      <h4>New Account: Type passphrase again to to confirm:</h4>
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

      <Warning show={!match}>
        <span slot="phrase">⛔️ Passphrases don't match ⛔️</span>
      </Warning>

      <div>
        <FormField>
          <Checkbox bind:checked />
          <span slot="label">Remember me</span>
        </FormField>
        <br clear="all" />
        <FormField>
          <Checkbox bind:checkedTerms />
          <span slot="label">I agree to the terms and conditions of use</span>
        </FormField>
      </div>

      <div>
        <Button variant="raised" on:click={handleSubmit}>
          <Label>Next</Label>
        </Button>
      </div>
    </form>
  </div>
{/if}
