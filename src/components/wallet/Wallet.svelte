<script>
  import IPFS from "ipfs";
  import createWallet from "streamlined-idm-wallet-sdk";

  // svelte stuff
  import { onMount, tick } from "svelte";

  //svelte stores
  import { wallet, ipfsNode } from "../stores.js";

  //svelte components
  import WalletContent from "./wallet-content/WalletContent.svelte";
  import SetupLocker from "../setup-locker/SetupLocker.svelte";
  import LockScreen from "../lock-screen/LockScreen.svelte";

  onMount(async () => {
    console.log("Mounted. Create wallet");
    $wallet = await createWallet({ ipfs: $ipfsNode });
    console.log(`Wallet Created`);
    $wallet.locker.onLockedChange(handleLockedChanged);
  });

  //never used?
  const unlockWallet = (lockType, challenge) => {
    $wallet.locker.getLock(lockType).unlock(challenge);
  };

  const handleLockedChanged = () => {
    $wallet = $wallet;
  };

  const handleSetupLockerComplete = async() => {
    $wallet.locker.idleTimer.restart();
    $wallet = $wallet;
  };
</script>

<style>
  .contain {
    margin: 1em 0 1em 0;
  }
</style>

<div class="contain">

{#if $wallet}
  {#if $wallet.locker.isPristine()}
    <SetupLocker
      onComplete={handleSetupLockerComplete} />
  {:else if $wallet.locker.isLocked()}
    <LockScreen />
  {:else}
    <WalletContent />
  {/if}
{:else}
  <div>Creating Wallet...</div>
{/if}
</div>
