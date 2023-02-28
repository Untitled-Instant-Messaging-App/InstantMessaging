import { channels } from "../common/constants";
import { LoginCredentials } from "../common/types";
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld("electron", {
  register: (credentials: LoginCredentials) => ipcRenderer.send(channels.REGISTER, credentials),
  handleFirstTime: (callback: (event: IpcRendererEvent, value: boolean) => void) => ipcRenderer.on(channels.HANDLER_FIRST_TIME, callback),
});
