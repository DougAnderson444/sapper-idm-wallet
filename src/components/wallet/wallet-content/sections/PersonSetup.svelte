<script>
  //svelte stores
  import { wallet, walletSection } from "../../../stores.js";

  import Textfield, { Input, Textarea } from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text/index";
  import Button, { Label } from "@smui/button";
  import { DEVICE_TYPES } from "streamlined-idm-wallet-sdk/src/identities/identity/utils/constants/devices";
  import Select, { Option } from "@smui/select";
  import FormField from "@smui/form-field";

  export let personsName = "";
  export let deviceName = `My Samsung`;
  export let deviceType = DEVICE_TYPES[0];

  const handleCreate = () => {
    $wallet.identities
      .create("ipid", {
        profileDetails: {
          "@context": "https://schema.org",
          "@type": "Person",
          name: personsName
        },
        deviceInfo: {
          type: deviceType,
          name: deviceName
        }
      })
      .then(identity => {
        console.log("Created Identity:");
        console.log("Identity:", identity);
        console.log("Serialized:", {
          addedAt: identity.getAddedAt(),
          id: identity.getId(),
          did: identity.getDid(),
          devices: identity.devices.list(),
          backup: identity.backup.getData(),
          profile: identity.profile.getDetails()
        });
        console.log(" ");
        console.log("End of Created Identity.");
      })
      .catch(err => {
        console.log(`PersonSetup err ${err}`);
      })
      .finally(() => {
        $walletSection = "Identities";
      });
  };
</script>

<div>
  <p>Person Setup</p>

  <div>
    <Textfield
      variant="outlined"
      bind:value={personsName}
      label="Person's Name"
      input$aria-controls="helper-text-outlined-name"
      input$aria-describedby="helper-text-outlined-name" />
    <HelperText id="helper-text-outlined-name">
      First Name Last Name works well
    </HelperText>
  </div>

  <div>
    <Select variant="outlined" bind:value={deviceType} label="Device Type">
      {#each DEVICE_TYPES as device}
        <Option value={device} selected={deviceType === device}>
          {device}
        </Option>
      {/each}
    </Select>
    <HelperText id="helper-text-outlined-name" />
  </div>

  <div>
    <Textfield
      bind:value={deviceName}
      variant="outlined"
      label="Device Nickname"
      input$aria-controls="helper-text-outlined-device"
      input$aria-describedby="helper-text-outlined-device" />
    <HelperText id="helper-text-outlined-device">Device Nickname</HelperText>
  </div>

  <div>
    <Button variant="raised" on:click={handleCreate}>
      <Label>Next</Label>
    </Button>
  </div>

</div>
