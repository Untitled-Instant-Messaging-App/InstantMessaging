import { channels } from "../common/constants";
import { LoginCredentials, Registration, User } from "../common/types";
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { AuthState } from "../common/types/AuthState";

contextBridge.exposeInMainWorld("electron", {
  register: (registration: Registration) => ipcRenderer.send(channels.REGISTER, registration),
  login: (credentials: LoginCredentials) => ipcRenderer.send(channels.LOGIN, credentials),
  logout: () => ipcRenderer.send(channels.LOGOUT),
  authState: (callback: (event: IpcRendererEvent, state: AuthState) => void) => ipcRenderer.on(channels.AUTH_STATE, callback),
  fetchProfile: () => ipcRenderer.invoke(channels.HANDLE_USER_PROFILE),
});
