import Authentification from "./services/authentication";
import StateManagement from "./services/stateManagement";
import ElectronStore from "electron-store";

const store = new ElectronStore();
const authentication = new Authentification(store);
const stateManagement = new StateManagement(store);

authentication.on("onRegister", (credentials, user) => {
  stateManagement.setEncryptionKey(credentials.password);
  stateManagement.setSensitive("profile", user);
});

authentication.on("onLogin", credentials => {
  stateManagement.setEncryptionKey(credentials.password + credentials.username);
});

authentication.on("onLogout", () => {
  stateManagement.invalidateEncryptionKey();
});

export { authentication, stateManagement };
