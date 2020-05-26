<script>
  import PropTypes from "prop-types";
  import SetupMasterLock from "./steps/SetupMasterLock";
  import SetupIdleTimer from "./steps/SetupIdleTimer";

  //export props fromparent to this component
  export let locker;
  export let onComplete;

  let step = 1;

  const handleStepComplete = () => {
    if (step === 2) {
      return onComplete();
    }

    step = step + 1;
  };
</script>

<div>
  <h1>Setup Locker</h1>
  {#if step == 1}
    <SetupMasterLock {locker} onComplete={handleStepComplete} />
  {:else if step == 2}
    <SetupIdleTimer {locker} onComplete={handleStepComplete} />
  {:else}
    <div />
  {/if}
</div>