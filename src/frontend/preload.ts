import { channels } from "../common/constants";
import { LoginCredentials, Registration } from "../common/types";
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld("electron", {
  register: (registration: Registration) => ipcRenderer.send(channels.REGISTER, registration),
  login: (credentials: LoginCredentials) => ipcRenderer.send(channels.LOGIN, credentials),
  logout: () => ipcRenderer.send(channels.LOGOUT),
  authState: (callback: (event: IpcRendererEvent, state: boolean) => void) => ipcRenderer.on(channels.IS_AUTHED, callback),
  registrationState: (callback: (event: IpcRendererEvent, state: boolean) => void) => ipcRenderer.on(channels.IS_REGISTERED, callback),
  isAuthed: () => ipcRenderer.invoke(channels.IS_AUTHED),
  isRegistered: () => ipcRenderer.invoke(channels.IS_REGISTERED),
  fetchProfile: () => ipcRenderer.invoke(channels.USER_PROFILE),
});
