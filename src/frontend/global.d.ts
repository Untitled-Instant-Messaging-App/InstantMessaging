import { LoginCredentials, AuthState, Registration, User } from "../common/types";
import { IpcRendererEvent } from "electron";

declare global {
  interface Window {
    electron: {
      register: (registration: Registration) => void;
      login: (credentials: LoginCredentials) => void;
      logout: () => void;
      authState: (callback: (event: IpcRendererEvent, state: AuthState) => void) => void;
      fetchProfile: () => Promise<User>;
    };
  }
}

export {};
