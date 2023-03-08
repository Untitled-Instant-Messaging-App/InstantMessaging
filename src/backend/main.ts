import { app, BrowserWindow, ipcMain } from "electron";
import { channels, data } from "../common/constants";
import { Registration, LoginCredentials } from "../common/types";
import { authentication, stateManagement } from "./dataManagement";
import isDev from "electron-is-dev";

require("electron-squirrel-startup") && app.quit();

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

function createWindow() {
  const window = new BrowserWindow({
    height: 600,
    width: 800,
    backgroundColor: "black",
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
  });
  window.removeMenu();
  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  if (isDev) {
    window.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(() => createWindow());

app.on("window-all-closed", () => process.platform !== "darwin" && app.quit());

app.on("activate", () => BrowserWindow.getAllWindows().length === 0 && createWindow());

ipcMain.on(channels.REGISTER, async (event, registration: Registration) => {
  await authentication.register(registration);
  event.sender.send(channels.IS_REGISTERED, authentication.hasRegistered());
  event.sender.send(channels.IS_AUTHED, authentication.isAuthed());
});

ipcMain.on(channels.LOGIN, (event, credentials: LoginCredentials) => {
  authentication.login(credentials);
  event.sender.send(channels.IS_AUTHED, authentication.isAuthed());
});

ipcMain.on(channels.LOGOUT, event => {
  authentication.logout();
  event.sender.send(channels.IS_AUTHED, authentication.isAuthed());
});

ipcMain.handle(channels.IS_REGISTERED, () => {
  return authentication.hasRegistered();
});

ipcMain.handle(channels.IS_AUTHED, () => {
  return authentication.isAuthed();
});

ipcMain.handle(channels.USER_PROFILE, () => {
  return stateManagement.getSensitive(data.USER_PROFILE);
});
