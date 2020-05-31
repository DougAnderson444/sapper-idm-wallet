<script>
  //svelte stores
  import { wallet } from "../../../stores.js";

  let maxInputTime;

  const handleLockLocker = () => {
    $wallet.locker.lock();
  };

  const handleRestartTimer = () => {
    $wallet.locker.idleTimer.restart();
  };

  const handleMaxTimeInputSubmit = () => {
    if (maxInputTime > 0) {
      $wallet.locker.idleTimer.setMaxTime(maxInputTime * 60 * 1000);
    }
  };
</script>

<style>
  .section {
    flex-grow: 1;
    max-width: 500px;
    padding: 30px;
    box-sizing: border-box;
  }

  .section .content {
    border: 1px solid rgb(201, 213, 210);
  }

  .section .content .option {
    margin: 20px;
  }

  .section .content .option > * {
    margin: 0 10px;
  }
</style>

<div class="section">
  <h4>Locker</h4>
  <div class="content">
    <div class="option">
      <span>Lock Locker</span>
      <button on:click={handleLockLocker}>Lock</button>
    </div>
    <div class="option">
      <span>Timer Restart</span>
      <button on:click={handleRestartTimer}>Restart</button>
    </div>
    <div class="option">
      <span>Timer Set MaxTime (minutes)</span>
      <input type="number" bind:value={maxInputTime} placeholder="30" />
      <button on:click={handleMaxTimeInputSubmit}>Submit</button>
    </div>
  </div>
</div>
