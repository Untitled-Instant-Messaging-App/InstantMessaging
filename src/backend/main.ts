import { app, BrowserWindow, ipcMain } from "electron";
import ElectronStore from "electron-store";
import { Authentification } from "./services/authentication";
import { channels } from "../common/constants";
import { LoginCredentials, AuthState } from "../common/types";
import isDev from "electron-is-dev";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const store = new ElectronStore();
const isFirstTimeRunningApp = !!!store.get("last-online");
const authentication = new Authentification(store);

function createWindow(): void {
  const window = new BrowserWindow({
    height: 600,
    width: 800,
    backgroundColor: "black",
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  window.removeMenu();
  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  if (isDev) {
    window.webContents.openDevTools({ mode: "detach" });
  }
  window.webContents.on("did-finish-load", () => {
    const initialAuthState = isFirstTimeRunningApp ? AuthState.NotRegistered : AuthState.NotSignedIn;
    window.webContents.send(channels.AUTH_STATE, initialAuthState);
  });
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on(channels.REGISTER, async (event, credentials: LoginCredentials) => {
  event.sender.send(channels.AUTH_STATE, AuthState.Registering);
  authentication.register(credentials);
  event.sender.send(channels.AUTH_STATE, authentication.login(credentials));
});

ipcMain.on(channels.LOGIN, async (event, credentials: LoginCredentials) => {
  event.sender.send(channels.AUTH_STATE, AuthState.SigningIn);
  event.sender.send(channels.AUTH_STATE, authentication.login(credentials));
});

ipcMain.on(channels.LOGOUT, async (event, _) => {
  event.sender.send(channels.AUTH_STATE, AuthState.SigningOut);
  event.sender.send(channels.AUTH_STATE, authentication.logout());
});
