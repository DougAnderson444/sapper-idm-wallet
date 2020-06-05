<script>
  import Slider from "@smui/slider";
  import FormField from "@smui/form-field";
  import Button, { Label } from "@smui/button";
  import Textfield, { Input, Textarea } from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text/index";
  import Select, { Option } from "@smui/select";
  import Timer from "../../timer/Timer";

  //svelte stores
  import { wallet, deviceType, deviceName, appSection } from "../../stores.js";

  import { DEVICE_TYPES } from "streamlined-idm-wallet-sdk/src/identities/identity/utils/constants/devices";

  $deviceName = "My Samsung";
  $deviceType = DEVICE_TYPES[0];

  export let loading;

  let value = 6;
  let error;

  const TIME_BASE = 60 * 1000;

  const handleButtonClick = () => {
    setMaxTime(Math.abs(value * TIME_BASE));
  };

  $wallet.locker.idleTimer.restart();

  const setMaxTime = value => {
    console.log(`Setting Idle timer to ${value} seconds`);
    $wallet.locker.idleTimer.setMaxTime(value).then(() => {
      $wallet.locker.idleTimer.restart();
      $appSection = "WalletContent"; //next screen
    });
  };
</script>

{#if loading}
  <div>...Loading...</div>
{:else}

  <div>
    <Select variant="outlined" bind:value={$deviceType} label="Device Type">
      {#each DEVICE_TYPES as device}
        <Option value={device} selected={$deviceType === device}>
          {device}
        </Option>
      {/each}
    </Select>
    <HelperText id="helper-text-outlined-name" />
  </div>

  <div>
    <Textfield
      bind:value={$deviceName}
      variant="outlined"
      label="Device Nickname"
      input$aria-controls="helper-text-outlined-device"
      input$aria-describedby="helper-text-outlined-device" />
    <HelperText id="helper-text-outlined-device">Device Nickname</HelperText>
  </div>

  <div>
    <h3>Time out this device in...</h3>
    {value} Minutes
  </div>
  <div>
    <FormField align="end" style="display: flex;">
      <Slider bind:value min={1} max={20} step={1} discrete displayMarkers />
      <span
        slot="label"
        style="padding-right: 12px; width: max-content; display: block;">
        Session Expires in:
      </span>
    </FormField>
  </div>
  <Button variant="raised" on:click={handleButtonClick}>
    <Label>Next</Label>
  </Button>
{/if}

<Timer />
