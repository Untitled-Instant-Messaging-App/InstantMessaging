import { LoginCredentials, Registration, User, Error } from "../common/types";
import { IpcRendererEvent } from "electron";

declare global {
  interface Window {
    electron: {
      register: (registration: Registration) => Promise<void>;
      login: (credentials: LoginCredentials) => Promise<void>;
      logout: () => void;
      onAuthChange: (callback: (event: IpcRendererEvent, isAuthed: boolean) => void) => void;
      onRegistrationChange: (callback: (event: IpcRendererEvent, isRegistered: boolean) => void) => void;
      isAuthed: () => Promise<boolean>;
      isRegistered: () => Promise<boolean>;
      fetchProfile: () => Promise<User>;
      onError: (callback: (event: IpcRendererEvent, error: Error) => void) => void;
    };
  }
}

export {};
