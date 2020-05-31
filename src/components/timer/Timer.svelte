<script>
  // svelte stuff
  import { onMount, onDestroy } from "svelte";

  //svelte stores
  import { wallet } from "../../stores.js";

  let timer;
  let time = 0;
  let idleTimeout;

  onMount(async () => {
    getRemainingTime();
  });

  onDestroy(() => {
    clearTimeout(idleTimeout);
  });

  function getTimeString() {
    const minutes = Math.trunc(this.state.time / (60 * 1000))
      .toString()
      .padStart(2, "0");
    const seconds = Math.trunc((this.state.time % (60 * 1000)) / 1000)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  }

  const getRemainingTime = () => {
    const { locker } = this.props;

    idleTimeout = setTimeout(this.getRemainingTime, 250);

    this.setState({ time: $wallet.locker.idleTimer.getRemainingTime() });
  };
</script>
<style>

  .timer {
    font-size: 100px;
    margin: 20px;
  }

  .timer::before {
    content: "Current Session:";
    display: block;
    font-size: 30px;
  }

</style>
<div class={timer}>
  <span>{getTimeString()}</span>
</div>
