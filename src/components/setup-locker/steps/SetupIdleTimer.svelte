<script>
  export let loading;
  export let locker;
  export let onComplete;
  export let value

  let error;

  const TIME_BASE = 60 * 1000;

  const setMaxTime = value => {
    locker.idleTimer
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
    <h3>Setup an expiration lock in minutes</h3>
    <input
      type="number"
      bind:value
      onKeyPress={handleInputKeyPress} />
  </div>
{/if}
