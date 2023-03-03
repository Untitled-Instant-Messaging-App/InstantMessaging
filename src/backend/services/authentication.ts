import bcrypt from "bcrypt";
import ElectronStore from "electron-store";
import { BasicUser, LoginCredentials, Registration, User } from "../../common/types";
import EventEmitter from "events";

export class Authentification extends EventEmitter {
  private store: ElectronStore;
  private isAuthenticated: boolean;

  constructor(store: ElectronStore) {
    super();
    this.store = store;
    this.isAuthenticated = false;
    super.emit("onStartup", !this.store.get("challenge"));
  }

  public async register(registration: Registration): Promise<boolean> {
    if (!!this.store.get("challenge")) {
      throw Error("A user has already been registered to this device.");
    }
    const credentials = { username: registration.username, password: registration.password };
    this.generateChallenge(credentials.password + credentials.username);

    // const basicUser: BasicUser = {
    //   displayName: registration.username,
    //   image: registration.image,
    // };
    // const registeredUser = await register(basicUser);

    const registeredUser: User = {
      id: "abc",
      username: registration.username + "#0001",
      displayName: registration.username,
      image: registration?.image,
      joinedAt: new Date(),
    };
    this.login(credentials);
    super.emit("onRegister", this.isAuthenticated, credentials, registeredUser);
    return this.isAuthenticated;
  }

  public login(credentials: LoginCredentials): boolean {
    if (!this.store.get("challenge")) {
      throw Error("No user registered to this device. Cannot validated user credentials.");
    }
    this.isAuthenticated = this.validateChallenge(credentials.password + credentials.username);
    super.emit("onLogin", this.isAuthenticated, credentials);
    return this.isAuthenticated;
  }

  public logout(): boolean {
    if (!this.isAuthenticated) {
      throw Error("Cannot sign out unauthenticated user.");
    }
    this.isAuthenticated = false;
    super.emit("onLogout", this.isAuthenticated);
    return this.isAuthenticated;
  }

  public hasRegistered(): boolean {
    return !!this.store.get("challenge");
  }

  private generateChallenge(identity: string): void {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(identity, salt);
    this.store.set("salt", salt);
    this.store.set("challenge", hash);
  }

  private validateChallenge(identity: string): boolean {
    const salt = this.store.get("salt") as string;
    const challenge = this.store.get("challenge") as string;
    if (!challenge) {
      throw Error("No challenge present to validated.");
    }
    return bcrypt.hashSync(identity, salt) === challenge;
  }
}
