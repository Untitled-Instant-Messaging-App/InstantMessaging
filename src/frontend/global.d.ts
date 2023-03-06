import { LoginCredentials, Registration, User } from "../common/types";
import { IpcRendererEvent } from "electron";

declare global {
  interface Window {
    electron: {
      register: (registration: Registration) => Promise<void>;
      login: (credentials: LoginCredentials) => Promise<void>;
      logout: () => void;
      authState: (callback: (event: IpcRendererEvent, state: boolean) => void) => void;
      isRegistered: () => Promise<boolean>;
      fetchProfile: () => Promise<User>;
    };
  }
}

export {};
