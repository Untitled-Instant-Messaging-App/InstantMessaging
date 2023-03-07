import Authentification from "./services/authentication";
import StateManagement from "./services/stateManagement";
import ElectronStore from "electron-store";
import { data } from "../common/constants";

const store = new ElectronStore();
const authentication = new Authentification(store);
const stateManagement = new StateManagement(store);

authentication.on("onRegister", (credentials, user) => {
  stateManagement.setEncryptionKey(credentials.password + credentials.username);
  stateManagement.setSensitive(data.USER_PROFILE, user);
});

authentication.on("onLogin", credentials => {
  stateManagement.setEncryptionKey(credentials.password + credentials.username);
  console.log(stateManagement.getSensitive(data.USER_PROFILE));
});

authentication.on("onLogout", () => {
  stateManagement.invalidateEncryptionKey();
});

export { authentication, stateManagement };
