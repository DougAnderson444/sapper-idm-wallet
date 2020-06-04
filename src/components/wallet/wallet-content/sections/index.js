import Sessions from "./Sessions";
import Locker from "./Locker";
import Identities from "./Identities";
import WalletMenu from "./WalletMenu";
import PersonSetup from "./PersonSetup";
import LockScreen from "../../../lock-screen/LockScreen"

const walletSections = {
  Identities: { component: Identities },
  PersonSetup: { component: PersonSetup },
  LockScreen: { component: LockScreen },
};

export { walletSections, Sessions, Locker, Identities, WalletMenu, PersonSetup };
