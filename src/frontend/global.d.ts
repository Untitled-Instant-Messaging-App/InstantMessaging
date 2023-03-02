import { LoginCredentials, AuthState, Registration } from "../common/types";
import { IpcRendererEvent } from "electron";

declare global {
  interface Window {
    electron: {
      register: (registration: Registration) => void;
      login: (credentials: LoginCredentials) => void;
      logout: () => void;
      isAuthenticated: (callback: (event: IpcRendererEvent, isAuthenticated: boolean) => void) => void;
      isRegistered: (callback: (event: IpcRendererEvent, isRegistered: boolean) => void) => void;
    };
  }
}

export {};
