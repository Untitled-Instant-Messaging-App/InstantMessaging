import { app, BrowserWindow, ipcMain } from "electron";
import { Authentification } from "./services/authentication";
import { channels } from "../common/constants";
import isDev from "electron-is-dev";
import StateManagement from "./services/stateManagement";
import ElectronStore from "electron-store";
import { Registration, LoginCredentials, User } from "../common/types";

require("electron-squirrel-startup") && app.quit();

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

function createWindow() {
  const window = new BrowserWindow({
    height: 600,
    width: 800,
    backgroundColor: "black",
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  window.removeMenu();
  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  if (isDev) {
    window.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  process.platform !== "darwin" && app.quit();
});

app.on("activate", () => {
  BrowserWindow.getAllWindows().length === 0 && createWindow();
});

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
  return stateManagement.getSensitive("profile");
});

const store = new ElectronStore();
const authentication = new Authentification(store);
const stateManagement = new StateManagement(store);

authentication.on("onRegister", (hasSucceeded, credentials, user) => {
  if (hasSucceeded) {
    stateManagement.setEncryptionKey(credentials.password);
    stateManagement.setSensitive("profile", user);
  }
});

authentication.on("onLogin", (hasSucceeded, credentials) => {
  if (hasSucceeded) {
    stateManagement.setEncryptionKey(credentials.password + credentials.username);
  }
});

authentication.on("onLogout", () => {
  stateManagement.invalidateEncryptionKey();
});
