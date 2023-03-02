import { AuthState, LoginCredentials } from "../../common/types";
import bcrypt from "bcrypt";
import ElectronStore from "electron-store";
import StateManagement from "./stateManagement";

export class Authentification {
  private store: ElectronStore;
  private isAuthenticated: boolean;
  private identity: string;
  private salt: string;
  private hasRegisteredUser: boolean;

  constructor() {
    this.store = new ElectronStore();
    this.isAuthenticated = false;
    this.hasRegisteredUser = !!this.store.get("salt");
  }

  public login(credentials: LoginCredentials): AuthState {
    const salt = this.store.get("salt") as string;
    const hash = this.store.get("hash") as string;
    if (!hash) {
      throw Error("No user registered to this device. Cannot validated user credentials.");
    }
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

  public register(credentials: LoginCredentials) {
    this.registerToDevice(credentials);
    // generate keys
  }

  private registerToDevice(credentials: LoginCredentials): void {
    if (!!this.store.get("hash")) {
      throw Error("A user has already been registered to this device.");
    }
    this.salt = bcrypt.genSaltSync();
    this.identity = credentials.username + credentials.password;
    const hash = bcrypt.hashSync(this.identity, this.salt);
    this.store.set("salt", this.salt);
    this.store.set("hash", hash);
  }

  public getStateManagerFromUser(): StateManagement {
    if (this.isAuthenticated) {
      return new StateManagement(this.store, this.identity, this.salt);
    }
    return null;
  }

  public isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public getInitialAuthState(): AuthState {
    return this.hasRegisteredUser ? AuthState.NotSignedIn : AuthState.NotRegistered;
  }
}
