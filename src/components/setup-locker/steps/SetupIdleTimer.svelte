<script>
  //svelte stores
  import { wallet } from "../../stores.js";
  import Slider from "@smui/slider";
  import FormField from "@smui/form-field";
  import Button, { Label } from "@smui/button";

  // svelte stores
  import { appSection } from "../../stores.js";

  export let loading;

  let value = 6;
  let error;

  const TIME_BASE = 60 * 1000;

  const handleButtonClick = () => {
    setMaxTime(Math.abs(value * TIME_BASE));
  };

  const setMaxTime = value => {
    console.log(`Setting Idle timer to ${value} seconds`);
    $wallet.locker.idleTimer
      .setMaxTime(value)
      .then(onComplete)
      .catch(err => {
        loading = false;
        error = err;
        console.log(`Error setMaxTime: ${err}`);
      });
  };

  export let onComplete = () => {
    $wallet.locker.idleTimer.restart();
    // $wallet = $wallet;
     $appSection = "WalletContent"; //next screen
  };

</script>

{#if loading}
  <div>...Loading...</div>
{:else}
  <div>
    <h3>Expire your session in...</h3>
    {value} Minutes
  </div>
  <div>
    <FormField align="end" style="display: flex;">
      <Slider bind:value min={2} max={20} step={2} discrete displayMarkers />
      <span
        slot="label"
        style="padding-right: 12px; width: max-content; display: block;">
        Session Expires in:
      </span>
    </FormField>
  </div>
  <Button variant="raised" on:click={handleButtonClick}>
    <Label>Next</Label>
  </Button>
{/if}
