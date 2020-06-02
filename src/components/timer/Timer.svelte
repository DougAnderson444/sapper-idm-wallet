<script>
  // svelte stuff
  import { onMount, onDestroy } from "svelte";

  //svelte stores
  import { wallet } from "../stores.js";

  let timeDisplay;
  let time = 0;
  let idleTimeout;

  onMount(async () => {
      console.log(`Mounted, getting remaining time`)
    getRemainingTime();
  });

  onDestroy(() => {
    clearTimeout(idleTimeout);
  });

  const getRemainingTime = () => {

    idleTimeout = setTimeout(getRemainingTime, 250);

    time = $wallet.locker.idleTimer.getRemainingTime();

    const minutes = Math.trunc(time / (60 * 1000))
      .toString()
      .padStart(2, "0");
    const seconds = Math.trunc((time % (60 * 1000)) / 1000)
      .toString()
      .padStart(2, "0");

    timeDisplay = `${minutes}:${seconds}`;

  };
</script>
<style>

  .timer {
    font-size: 50px;
    margin: 12px;
  }

  .timer::before {
    content: "Current Session:";
    display: block;
    font-size: 12px;
  }

</style>
<div class="timer">
  <span>{timeDisplay}</span>
</div>
