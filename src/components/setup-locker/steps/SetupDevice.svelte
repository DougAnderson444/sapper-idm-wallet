<script>
  import FormField from "@smui/form-field";
  import Button, { Label } from "@smui/button";
  import Textfield, { Input, Textarea } from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text/index";
  import Select, { Option } from "@smui/select";

  //svelte stores
  import { wallet, deviceType, deviceName, appSection } from "../../stores.js";

  import { DEVICE_TYPES } from "streamlined-idm-wallet-sdk/src/identities/identity/utils/constants/devices";

  $deviceName = "My Samsung";
  $deviceType = DEVICE_TYPES[0];
  
  export let loading;
  let error;

  const handleButtonClick = () => {
    $appSection = "ProcessCreateUser";
  };

</script>

{#if loading}
  <div>...Loading...</div>
{:else}

<h3>Name this device</h3>
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
      on:focus|once={ ()=>{$deviceName=""} }
      variant="outlined"
      label="Device Nickname"
      input$aria-controls="helper-text-outlined-device"
      input$aria-describedby="helper-text-outlined-device" />
    <HelperText id="helper-text-outlined-device">Device Nickname</HelperText>
  </div>

  <Button variant="raised" on:click={handleButtonClick}>
    <Label>Next</Label>
  </Button>
{/if}
