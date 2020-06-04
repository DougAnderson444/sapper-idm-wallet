import LogIn from "./LogIn";
import CreateNewUser from "./CreateNewUser";
import ProcessCreateUser from "./ProcessCreateUser";

import SetupIdleTimer from "../../setup-locker/steps/SetupIdleTimer";
import WalletContent from "../../wallet/wallet-content/WalletContent";

const appSections = {
  LogIn: { component: LogIn },
  CreateNewUser: { component: CreateNewUser },
  ProcessCreateUser: { component: ProcessCreateUser },
  WalletContent: { component: WalletContent },
  SetupIdleTimer: { component: SetupIdleTimer },
};

export { appSections };
