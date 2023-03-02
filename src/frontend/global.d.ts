import { LoginCredentials, AuthState, Registration } from "../common/types";
import { IpcRendererEvent } from "electron";

declare global {
  interface Window {
    electron: {
      register: (registration: Registration) => void;
      login: (credentials: LoginCredentials) => void;
      logout: () => void;
      authState: (callback: (event: IpcRendererEvent, value: AuthState) => void) => void;
    };
  }
}

export {};
