import { LoginCredentials } from "../common/types";
import { IpcRendererEvent } from "electron";

declare global {
  interface Window {
    electron: {
      register: (credentials: LoginCredentials) => void;
      handleFirstTime: (callback: (event: IpcRendererEvent, value: boolean) => void) => void;
    };
  }
}
export {};
