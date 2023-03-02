import { app, BrowserWindow, ipcMain } from "electron";
import { Authentification } from "./services/authentication";
import { channels } from "../common/constants";
import { LoginCredentials, Registration } from "../common/types";
import isDev from "electron-is-dev";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const authentication = new Authentification();

function createWindow(): void {
  const window = new BrowserWindow({
    height: 600,
    width: 800,
    backgroundColor: "black",
    // titleBarStyle: "hidden",
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  window.removeMenu();
  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  if (isDev) {
    window.webContents.openDevTools({ mode: "detach" });
  }
  window.webContents.on("did-finish-load", () => {
    window.webContents.send(channels.IS_REGISTERED, authentication.hasRegistered());
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  process.platform !== "darwin" && app.quit();
});

app.on("activate", () => {
  BrowserWindow.getAllWindows().length === 0 && createWindow();
});

ipcMain.on(channels.REGISTER, async (event, registration: Registration) => {
  authentication.register(registration);
  event.sender.send(channels.IS_REGISTERED, authentication.hasRegistered())
});

ipcMain.on(channels.LOGIN, async (event, credentials: LoginCredentials) => {
  const authResult = authentication.login(credentials);
  event.sender.send(channels.IS_AUTHENTICATED, authResult);
});

ipcMain.on(channels.LOGOUT, async (event, _) => {
  const authResult = authentication.logout();
  event.sender.send(channels.IS_AUTHENTICATED, authResult);
});
