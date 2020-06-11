<script>
  // Check for local wallet !isPristine (involves making a wallet then checking it for dirtyness)
  // If pristine, then either username or password was wrong...
  // If username is wrong, they won't be on our list. So check the list first, notify of no user, redirect to create page
  // If password is wrong, the wallet will be pristine,
  //    If they had an account and it's deleted, retrieve the keys from IPFS
  //    If the password doesnt decrypt a matching privKey, notify wrong passw, redirect w/ paid .eth option
  //       ...If the peerpiper username is taken, they can always buy the .eth link through us, and link to their ID
  /* 
1. Check username against our database. Exists ? Proceed create wallet : Redirect to create new page
2. Creating wallet using password. Pristine wallet ? Wrong password or buy .eth ID if taken : Dirty wallet means its all good
*/

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
      /* 
      1. Check username against our database. Exists ? Proceed create wallet : Redirect to create new page
      2. Creating wallet using password. Pristine wallet ? Wrong password or buy .eth ID if taken : Dirty wallet means its all good
      */

      // redirect to CreateNewUser
      $appSection = "ProcessLogin";
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
      <h3>Log In below</h3>
      <div>
        <Textfield
          bind:value={$username}
          type="text"
          variant="outlined"
          label="Username"
          input$aria-controls="super-helper-Username"
          input$aria-describedby="super-helper-Username"
          autocomplete="username" />
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
          on:keydown={handleInputKeyPress}
          autocomplete="current-password" />
        <HelperText id="super-helper">
          Your pass phrase you used to create your account
        </HelperText>

        <!--InvalidWarning {validation} /-->
      </div>

      <div>
        <FormField>
          <Checkbox bind:checked />
          <span slot="label">Remember me</span>
        </FormField>
        <br clear="all" />
      </div>

      <div>
        <Button
          on:click={() => ($appSection = 'LogInOrCreateChoice')}
          variant="outlined">
          <Icon class="material-icons">backspace</Icon>
          <Label>Cancel</Label>
        </Button>
        <Button variant="raised" on:click={handleSubmit}>
          <Label>Next</Label>
        </Button>
      </div>
    </form>
  </div>
{/if}
