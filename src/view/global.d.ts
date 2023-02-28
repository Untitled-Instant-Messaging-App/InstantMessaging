import { LoginCredentials, AuthState } from "../common/types";
import { IpcRendererEvent } from "electron";

declare global {
  interface Window {
    electron: {
      register: (credentials: LoginCredentials) => void;
      login: (credentials: LoginCredentials) => void;
      authState: (callback: (event: IpcRendererEvent, value: AuthState) => void) => void;
    };
  }
}
export {};
