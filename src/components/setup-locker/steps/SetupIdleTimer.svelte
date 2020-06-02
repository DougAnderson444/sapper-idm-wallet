<script>
  //svelte stores
  import { wallet } from "../../stores.js";
  import Slider from "@smui/slider";
  import FormField from "@smui/form-field";

  export let loading;
  export let onComplete;
  export let placeholder = 6;

  let value = 6;
  let error;

  const TIME_BASE = 60 * 1000;

  const setMaxTime = value => {
    console.log(`Setting Idle timer to ${value} seconds`);
    $wallet.locker.idleTimer
      .setMaxTime(value)
      .then()
      .then(onComplete)
      .catch(err => {
        loading = false;
        error = err;
      });
  };

  const handleInputKeyPress = event => {
    if (event.charCode === 13) {
      setMaxTime(Math.abs(value * TIME_BASE));
    }
  };
</script>

{#if loading}
  <div>...Loading...</div>
{:else}
  <div>
    <h3>Setup an expiration lock in minutes [then press Enter]</h3>
    <input
      type="number"
      {placeholder}
      bind:value
      on:keypress={handleInputKeyPress}
      min="0"
      max="15" />
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
{/if}
