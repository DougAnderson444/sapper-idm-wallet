import Sessions from "./Sessions";
import Locker from "./Locker";
import Identities from "./Identities";
import WalletMenu from "./WalletMenu";
import PersonSetup from "./PersonSetup";

const compArr = {
  "Identities": { component: Identities },
  "PersonSetup":{ component: PersonSetup }
};

export { compArr, Sessions, Locker, Identities, WalletMenu, PersonSetup };
