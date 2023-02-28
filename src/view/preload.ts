import { channels } from "../common/constants";
import { AuthenticationState, LoginCredentials } from "../common/types";
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld("electron", {
  register: (credentials: LoginCredentials) => ipcRenderer.send(channels.REGISTER, credentials),
  login: (credentials: LoginCredentials) => ipcRenderer.send(channels.LOGIN, credentials),
  authState: (callback: (event: IpcRendererEvent, value: AuthenticationState) => void) => ipcRenderer.on(channels.AUTH_STATE, callback),
});
