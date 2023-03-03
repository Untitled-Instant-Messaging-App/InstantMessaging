import { channels } from "../common/constants";
import { LoginCredentials, Registration, User } from "../common/types";
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld("electron", {
  register: (registration: Registration) => ipcRenderer.send(channels.REGISTER, registration),
  login: (credentials: LoginCredentials) => ipcRenderer.send(channels.LOGIN, credentials),
  logout: () => ipcRenderer.send(channels.LOGOUT),
  isAuthenticated: (callback: (event: IpcRendererEvent, isAuthenticated: boolean) => void) => ipcRenderer.on(channels.IS_AUTHENTICATED, callback),
  isRegistered: (callback: (event: IpcRendererEvent, isRegistered: boolean) => void) => ipcRenderer.on(channels.IS_REGISTERED, callback),
  fetchProfile: () => ipcRenderer.invoke(channels.HANDLE_USER_PROFILE),
});
