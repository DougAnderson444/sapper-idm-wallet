<script>
  import InvalidWarning from "../../setup-locker/steps/InvalidWarning.svelte";
  import Warning from "../../display/Warning.svelte";
  import checkPassphraseStrength from "../CheckPassphraseStrength";
  import Button, { Label } from "@smui/button";
  import FormField from "@smui/form-field";
  import Checkbox from "@smui/checkbox";
  import { PasswordError } from "../errors";

  // Svelte Material UI
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import { Icon } from "@smui/common";

  // svelte stores
  import { selected, username, password } from "../../stores";

  //local state vars
  let loading, error;
  let validation = {};
  let match = true;
  let checked = false;
  let checkedTerms;

  const LOCK_TYPE = "passphrase";

  async function validate(passphrase) {
    const result = checkPassphraseStrength(passphrase);
    if (result.score < 0.5) {
      throw new PasswordError("Passphrase is too weak", result);
    }
    return result;
  }

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
    if (event.charCode === 13) {
      console.log(`Enter pressed, handle submit`)
      handleSubmit();}
  };

  const handleSubmit = event => {
    if (!validation.error && $password) {
      // if existing user, process login
      // TODO
      // if new user, create account
      // redirect to CreateNewUser
      $selected = "CreateNewUser"
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
    <h5>Start with a username and password to protect your stuff.</h5>
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
        on:keyup={handlePasswordInput}
        on:keydown={handleInputKeyPress} />
      <HelperText id="super-helper">
        Easy to remember phrase like "I grew up on Main Street back in 87"
      </HelperText>

      <InvalidWarning {validation} />
    </div>

    <div>
      <FormField>
        <Checkbox bind:checked />
        <span slot="label">Remember me</span>
      </FormField>
      <br clear="all" />
    </div>

    <div>
      <Button variant="raised" on:click={handleSubmit}>
        <Label>Next</Label>
      </Button>
    </div>

  </div>
{/if}
