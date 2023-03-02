import bcrypt from "bcrypt";
import ElectronStore from "electron-store";
import { LoginCredentials, Registration } from "../../common/types";

export class Authentification {
  private store: ElectronStore;
  private isAuthenticated: boolean;
  private isChallengePresent: boolean;

  constructor() {
    this.store = new ElectronStore();
    this.isChallengePresent = !!this.store.get("challenge");
    this.isAuthenticated = false;
  }

  public login(credentials: LoginCredentials): boolean {
    if (!this.isChallengePresent) {
      throw Error("No user registered to this device. Cannot validated user credentials.");
    }
    const isValid = this.validateChallenge(credentials.password);
    this.isAuthenticated = isValid;
    return this.isAuthenticated;
  }

  public logout(): boolean {
    if (!this.isAuthenticated) {
      throw Error("Cannot sign out unauthenticated user.");
    }
    this.isAuthenticated = false;
    return this.isAuthenticated;
  }

  public register(registration: Registration): void {
    if (this.isChallengePresent) {
      throw Error("A user has already been registered to this device.");
    }
    const credentials = { username: registration.username, password: registration.password };
    this.generateChallenge(credentials.password);
  }

  public hasRegistered(): boolean {
    return this.isChallengePresent;
  }

  private generateChallenge(identity: string) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(identity, salt);
    this.store.set("salt", salt);
    this.store.set("challenge", hash);
    this.isChallengePresent = true;
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
