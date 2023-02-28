import ElectronStore from "electron-store";
import CryptoJS from "crypto-js";

export default class StateManagement {
  #userEncryptionKey: string;
  #defaultEncryptionKey: string;
  #store: ElectronStore;

  constructor(userEncryptionKey: string, defaultEncryptionKey: string, store: ElectronStore) {
    this.#userEncryptionKey = userEncryptionKey;
    this.#defaultEncryptionKey = defaultEncryptionKey;
    this.#store = store;
  }

  getStore() {
    return this.#store;
  }

  set(key: string, obj: any, override?: boolean): void {
    if (override && this.#store.get(key)) {
      throw Error(`Object with key \`${key}\` already exists.`);
    }
    let encrypted = this.#encrypt(obj, this.#defaultEncryptionKey);
    this.#store.set(key, encrypted);
  }

  get<Type>(key: string): Type {
    const encrypted = this.#store.get(key) as any;
    const decrypted = this.#decrypt(encrypted, this.#defaultEncryptionKey);
    const obj = JSON.parse(decrypted);
    return obj ? (obj as Type) : null;
  }

  setUserSensitive(key: string, obj: any, override?: boolean): void {
    if (override && this.#store.get(key)) {
      throw Error(`Object with key \`${key}\` already exists.`);
    }
    let encrypted = this.#encrypt(obj, this.#userEncryptionKey);
    this.#store.set(key, encrypted);
  }

  getUserSensitive<Type>(key: string): Type {
    const encrypted = this.#store.get(key);
    const decrypted = this.#decrypt(encrypted, this.#userEncryptionKey);
    const obj = JSON.parse(decrypted);
    return obj ? (obj as Type) : null;
  }

  #encrypt(obj: any, encryptionKey: string): string {
    const json = JSON.stringify(obj);
    return CryptoJS.AES.encrypt(json, encryptionKey).toString();
  }

  #decrypt(obj: any, encryptionKey: string) {
    return CryptoJS.AES.decrypt(obj, encryptionKey).toString(CryptoJS.enc.Utf8);
  }
}
