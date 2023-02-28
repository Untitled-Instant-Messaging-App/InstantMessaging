import ElectronStore from "electron-store";
import CryptoJS from "crypto-js";

export default class StateManagement {
  private store: ElectronStore;
  private encryptionKey: string;
  private salt: string;

  constructor(store: ElectronStore, encryptionKey: string, salt: string) {
    this.store = store;
    this.encryptionKey = encryptionKey;
    this.salt = salt;
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
    if (override && this.store.get(key)) {
      throw Error(`Object with key \`${key}\` already exists.`);
    }
    let encrypted = this.encrypt(obj, this.encryptionKey, this.salt);
    this.store.set(key, encrypted);
  }

  public getUserSensitive<Type>(key: string, thrw?: boolean): Type {
    const encrypted = this.store.get(key);
    const decrypted = this.decrypt(encrypted, this.encryptionKey, this.salt);
    const obj = JSON.parse(decrypted);
    if (thrw && obj == null) {
      throw Error(`Objcet with key \`${key}\ does not exist.`);
    }
    return obj ? (obj as Type) : null;
  }

  private encrypt(obj: any, encryptionKey: string, salt?: string): string {
    const json = JSON.stringify(obj);
    return CryptoJS.AES.encrypt(json, encryptionKey + salt).toString();
  }

  private decrypt(obj: any, encryptionKey: string, salt?: string) {
    return CryptoJS.AES.decrypt(obj, encryptionKey + salt).toString(CryptoJS.enc.Utf8);
  }
}
