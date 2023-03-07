import { channels } from "../common/constants";
import { Error, LoginCredentials, Registration } from "../common/types";
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld("electron", {
  register: (registration: Registration) => ipcRenderer.send(channels.REGISTER, registration),
  login: (credentials: LoginCredentials) => ipcRenderer.send(channels.LOGIN, credentials),
  logout: () => ipcRenderer.send(channels.LOGOUT),
  onAuthChange: (callback: (event: IpcRendererEvent, state: boolean) => void) => ipcRenderer.on(channels.IS_AUTHED, callback),
  onRegistrationChange: (callback: (event: IpcRendererEvent, state: boolean) => void) => ipcRenderer.on(channels.IS_REGISTERED, callback),
  isAuthed: () => ipcRenderer.invoke(channels.IS_AUTHED),
  isRegistered: () => ipcRenderer.invoke(channels.IS_REGISTERED),
  fetchProfile: () => ipcRenderer.invoke(channels.USER_PROFILE),
  onError: (callback: (event: IpcRendererEvent, error: Error) => void) => ipcRenderer.on(channels.ERROR, callback),
});
