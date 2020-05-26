<script>
  import IPFS from "ipfs";
  import createWallet from "streamlined-idm-wallet-sdk";

  // svelte stuff
  import { onMount } from "svelte";

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
    //$wallet.locker.onLockedChange(handleLockedChanged); //prolly not even needed
  });

  //never used?
  const unlockWallet = (lockType, challenge) => {
    $wallet.locker.getLock(lockType).unlock(challenge);
  };

  const handleLockedChanged = () => {
    //forceUpdate();
    console.log("LockedChanged");
    $wallet = $wallet;
  };

  const handleSetupLockerComplete = () => {
    //this.forceUpdate();
    console.log("SetupLockerComplete");
    $wallet = $wallet;
  };
</script>

{#if $wallet}
  {#if $wallet.locker.isPristine()}
    <SetupLocker
      wallet={$wallet.locker}
      onComplete={handleSetupLockerComplete} />
  {:else if $wallet.locker.isLocked()}
    <LockScreen locker={$wallet.locker} />
  {:else}
    <WalletContent wallet={$wallet} />
  {/if}
{:else}
  <div>No Wallet</div>
{/if}
