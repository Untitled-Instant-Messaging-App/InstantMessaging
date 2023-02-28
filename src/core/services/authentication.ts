import { AuthState, LoginCredentials } from "../../common/types";
import bcrypt from "bcrypt";
import ElectronStore from "electron-store";
import StateManagement from "./stateManagement";

export class Authentification {
  private store: ElectronStore;
  private isAuthenticated: boolean;
  private identity: string;
  private salt: string;

  constructor(store: ElectronStore) {
    this.store = store;
    this.isAuthenticated = false;
  }

  public login(credentials: LoginCredentials): AuthState {
    const salt = this.store.get("salt", true) as string;
    const hash = this.store.get("hash", true) as string;
    const isValid = bcrypt.hashSync(credentials.username + credentials.password, salt) === hash;
    if (isValid) {
      this.isAuthenticated = true;
      this.store.set("last-online", new Date().getTime());
    }
    return isValid ? AuthState.SignedIn : AuthState.SignInFailed;
  }

  public logout(): AuthState {
    this.store.set("last-online", new Date().getTime());
    this.isAuthenticated = false;
    return AuthState.NotSignedIn;
  }

  public isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public register(credentials: LoginCredentials) {
    this.registerToDevice(credentials);
    // generate keys
  }

  private registerToDevice(credentials: LoginCredentials): void {
    this.salt = bcrypt.genSaltSync();
    this.identity = credentials.username + credentials.password;
    const hash = bcrypt.hashSync(this.identity, this.salt);
    this.store.set("salt", this.salt);
    this.store.set("hash", hash);
  }

  public generateStateManagerFromUser(): StateManagement {
    if (this.isAuthenticated) {
      return new StateManagement(this.store, this.identity, this.salt);
    }
    return null;
  }
}
