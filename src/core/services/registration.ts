import { AuthState, LoginCredentials } from "../../common/types";
import bcrypt from "bcrypt";
import ElectronStore from "electron-store";
import StateManagement from "./stateManagement";

export class Registration {
  private stateManager: StateManagement;
  private isAuthenticated: boolean;

  constructor(store: ElectronStore) {
    this.stateManager = new StateManagement(store);
    this.isAuthenticated = false;
  }

  public login(credentials: LoginCredentials): AuthState {
    const salt = this.stateManager.get("salt", true) as string;
    const hash = this.stateManager.get("hash", true) as string;
    const isValid = bcrypt.hashSync(credentials.username + credentials.password, salt) === hash;
    if (isValid) {
      this.isAuthenticated = true;
      this.stateManager.set("last-online", new Date().getTime());
      this.stateManager.setUserEncryptionKey(credentials.password);
    }
    return isValid ? AuthState.SignedIn : AuthState.SignInFailed;
  }

  public isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public register(credentials: LoginCredentials) {
    this.registerToDevice(credentials);
    // generate keys
  }

  private registerToDevice(credentials: LoginCredentials): void {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(credentials.username + credentials.password, salt);
    this.stateManager.set("salt", salt);
    this.stateManager.set("hash", hash);
  }

  public getStateFromAuthedUser(): StateManagement {
    if (this.isAuthenticated) {
      return this.stateManager;
    }
    return null;
  }
}
