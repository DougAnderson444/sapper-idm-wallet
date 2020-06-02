<script>
  import SetupMasterLock from "./steps/SetupMasterLock";
  import SetupIdleTimer from "./steps/SetupIdleTimer";

  //export props fromparent to this component
  export let onComplete;

  let step = 1;

  const handleStepComplete = () => {
    if (step === 1) {
      return onComplete();
    }

    step = step + 1;
  };
</script>

<style>
  .contain {
    margin: 1em;
  }
</style>

<div class="contain">
  <h1>Setup Locker</h1>
  {#if step == 1}
    <SetupMasterLock onComplete={handleStepComplete} />
  {:else if step == 2}
    <SetupIdleTimer onComplete={handleStepComplete} />
  {:else}
    <div />
  {/if}
</div>