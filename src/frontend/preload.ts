import { channels } from "../common/constants";
import { AuthState, LoginCredentials } from "../common/types";
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld("electron", {
  register: (credentials: LoginCredentials) => ipcRenderer.send(channels.REGISTER, credentials),
  login: (credentials: LoginCredentials) => ipcRenderer.send(channels.LOGIN, credentials),
  logout: () => ipcRenderer.send(channels.LOGOUT),
  authState: (callback: (event: IpcRendererEvent, value: AuthState) => void) => ipcRenderer.on(channels.AUTH_STATE, callback),
});