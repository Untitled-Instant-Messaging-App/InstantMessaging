import ElectronStore from "electron-store";
import CryptoJS from "crypto-js";

export default class StateManagement {
  private store: ElectronStore;
  private encryptionKey: string;

  constructor(store: ElectronStore) {
    this.store = store;
  }

  public setEncryptionKey(key: string) {
    this.encryptionKey = key;
  }

  public invalidateEncryptionKey() {
    this.encryptionKey = null;
  }

  public set(key: string, obj: any, override?: boolean) {
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

  public setSensitive(key: string, obj: any, override?: boolean) {
    if (override && this.store.get(key)) {
      throw Error(`Object with key \`${key}\` already exists.`);
    }
    let encrypted = this.encrypt(obj, this.encryptionKey);
    this.store.set(key, encrypted);
  }

  public getSensitive<Type>(key: string, thrw?: boolean): Type {
    const encrypted = this.store.get(key);
    if (thrw && !!encrypted) {
      throw Error(`Objcet with key \`${key}\ does not exist.`);
    } else if (!!encrypted) {
      return null;
    }
    const decrypted = this.decrypt(encrypted, this.encryptionKey);
    const obj = JSON.parse(decrypted);
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
