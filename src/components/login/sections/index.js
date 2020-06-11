import LogInOrCreateChoice from "./LogInOrCreateChoice.svelte";
import LogIn from "./LogIn.svelte";
import ProcessLogin from "./ProcessLogin.svelte"

import CreateNewUser from "./CreateNewUser.svelte";
import ProcessCreateUser from "./ProcessCreateUser.svelte";

import SetupDevice from "../../setup-locker/steps/SetupDevice.svelte";
import SetupIdleTimer from "../../setup-locker/steps/SetupIdleTimer.svelte";
import WalletContent from "../../wallet/wallet-content/WalletContent.svelte";

const appSections = {
  LogInOrCreateChoice: { component: LogInOrCreateChoice },
  LogIn: { component: LogIn },
  ProcessLogin: { component: ProcessLogin },
  CreateNewUser: { component: CreateNewUser },
  SetupDevice: { component: SetupDevice },
  ProcessCreateUser: { component: ProcessCreateUser },
  SetupIdleTimer: { component: SetupIdleTimer },
  WalletContent: { component: WalletContent },
};

export { appSections };
