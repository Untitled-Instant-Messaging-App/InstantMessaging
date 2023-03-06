import { LoginCredentials, Registration, User } from "../common/types";
import { IpcRendererEvent } from "electron";

declare global {
  interface Window {
    electron: {
      register: (registration: Registration) => Promise<void>;
      login: (credentials: LoginCredentials) => Promise<void>;
      logout: () => void;
      authState: (callback: (event: IpcRendererEvent, isAuthed: boolean) => void) => void;
      registrationState: (callback: (event: IpcRendererEvent, isRegistered: boolean) => void) => void;
      isAuthed: () => Promise<boolean>;
      isRegistered: () => Promise<boolean>;
      fetchProfile: () => Promise<User>;
    };
  }
}

export {};
