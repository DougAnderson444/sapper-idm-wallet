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
  import { appSection, username, password } from "../../stores";

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
    console.log(`Key pressed \n ${JSON.stringify(event)}`);
    if (event.charCode === 13) {
      console.log(`Enter pressed, handle submit`);
      handleSubmit();
    }
  };

  const handleSubmit = event => {
    if (!validation.error && $password) {
      // if existing user, process login
      // TODO
      // if new user, create account
      // redirect to CreateNewUser
      $appSection = "CreateNewUser";
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
    <h3>Log in or create a new account.</h3>
    <Button on:click={() => ($appSection = 'LogIn')} variant="raised">
      <Icon class="material-icons">login</Icon>
      <Label>LogIn</Label>
    </Button>
    <Button on:click={() => ($appSection = 'CreateNewUser')} variant="outlined">
      <Icon class="material-icons">add_circle</Icon>
      <Label>Create New Account</Label>
    </Button>
  </div>
{/if}
