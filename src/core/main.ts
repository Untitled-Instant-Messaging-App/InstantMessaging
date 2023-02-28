import { app, BrowserWindow, ipcMain } from "electron";
import ElectronStore from "electron-store";
import { channels } from "../common/constants";
import { AuthState, LoginCredentials } from "../common/types";
import Initializer from "./services/initialization";
import { Registration } from "./services/registration";

if (require("electron-squirrel-startup")) {
  app.quit();
}

const store = new ElectronStore();
const initializer = new Initializer(store);
const registration = new Registration(store);

app.whenReady().then(() => {
  initializer.init();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    initializer.init();
  }
});

ipcMain.on(channels.REGISTER, async (event, credentials: LoginCredentials) => {
  if (!initializer.isFirstTimeRunningApp()) {
    throw Error("Can only register users if first time running the app.");
  }
  event.sender.send(channels.AUTH_STATE, AuthState.Registering);
  registration.register(credentials);
  await sleep(3000);
  event.sender.send(channels.AUTH_STATE, registration.login(credentials));
});

ipcMain.on(channels.LOGIN, async (event, credentials: LoginCredentials) => {
  if (initializer.isFirstTimeRunningApp()) {
    throw Error("Cannot login if first time running the app.");
  }
  event.sender.send(channels.AUTH_STATE, AuthState.SigningIn);
  await sleep(1000);
  event.sender.send(channels.AUTH_STATE, registration.login(credentials));
});

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
