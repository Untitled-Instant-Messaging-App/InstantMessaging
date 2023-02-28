import ElectronStore from "electron-store";
import CryptoJS from "crypto-js";

export default class StateManagement {
  private encryptionKey: string;
  private store: ElectronStore;

  constructor(store: ElectronStore) {
    this.store = store;
  }

  public getDataStore(): ElectronStore {
    return this.store;
  }

  public setUserEncryptionKey(key: string): void {
    this.encryptionKey = key;
  }

  public set(key: string, obj: any, override?: boolean): void {
    if (override && this.store.get(key)) {
      throw Error(`Object with key \`${key}\` already exists.`);
    }
    this.store.set(key, obj);
  }

  public get<Type>(key: string, thrw?: boolean): Type {
    const obj = this.store.get(key);
    if (thrw && obj == null) {
      throw Error(`Objcet with key \`${key}\ does not exist.`);
    }
    return obj ? (obj as Type) : null;
  }

  public setUserSensitive(key: string, obj: any, override?: boolean): void {
    if (!this.encryptionKey) {
      throw Error("No encryption key provided.");
    }
    if (override && this.store.get(key)) {
      throw Error(`Object with key \`${key}\` already exists.`);
    }
    let encrypted = this.encrypt(obj, this.encryptionKey);
    this.store.set(key, encrypted);
  }

  public getUserSensitive<Type>(key: string, thrw?: boolean): Type {
    if (!this.encryptionKey) {
      throw Error("No encryption key provided.");
    }
    const encrypted = this.store.get(key);
    const decrypted = this.decrypt(encrypted, this.encryptionKey);
    const obj = JSON.parse(decrypted);
    if (thrw && obj == null) {
      throw Error(`Objcet with key \`${key}\ does not exist.`);
    }
    return obj ? (obj as Type) : null;
  }

  private encrypt(obj: any, encryptionKey: string): string {
    const json = JSON.stringify(obj);
    return CryptoJS.AES.encrypt(json, encryptionKey).toString();
  }

  private decrypt(obj: any, encryptionKey: string) {
    return CryptoJS.AES.decrypt(obj, encryptionKey).toString(CryptoJS.enc.Utf8);
  }
}
