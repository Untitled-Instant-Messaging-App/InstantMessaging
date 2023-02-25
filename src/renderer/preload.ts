import { channels } from "../shared/constants";
import { LoginCredentials } from "../shared/types";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  register: (credentials: LoginCredentials) => ipcRenderer.send(channels.REGISTER, credentials),
});
