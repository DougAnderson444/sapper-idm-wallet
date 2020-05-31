<script>
  
  //svelte stores
  import { wallet } from "../../stores.js";
  
  export let loading;
  export let onComplete;
  export let placeholder = 10;

  let value
  let error;

  const TIME_BASE = 60 * 1000;

  const setMaxTime = value => {
    $wallet.locker.idleTimer
      .setMaxTime(value)
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
      on:keypress={handleInputKeyPress} />
  </div>
{/if}
