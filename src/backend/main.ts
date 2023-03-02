import { app, BrowserWindow, ipcMain } from "electron";
import { Authentification } from "./services/authentication";
import { channels } from "../common/constants";
import { LoginCredentials, AuthState, Registration } from "../common/types";
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
    window.webContents.send(channels.AUTH_STATE, authentication.getInitialAuthState());
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
  event.sender.send(channels.AUTH_STATE, AuthState.Registering); // TODO move to callback

  console.log(registration)
  event.sender.send(channels.AUTH_STATE, authentication.register(registration));
});

ipcMain.on(channels.LOGIN, async (event, credentials: LoginCredentials) => {
  event.sender.send(channels.AUTH_STATE, AuthState.SigningIn); // TODO move to callback
  event.sender.send(channels.AUTH_STATE, authentication.login(credentials));
});

ipcMain.on(channels.LOGOUT, async (event, _) => {
  event.sender.send(channels.AUTH_STATE, AuthState.SigningOut); // TODO move to callback
  event.sender.send(channels.AUTH_STATE, authentication.logout());
});
