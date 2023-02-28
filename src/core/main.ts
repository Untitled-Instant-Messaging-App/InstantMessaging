import { app, BrowserWindow, ipcMain } from "electron";
import { channels } from "../common/constants";
import { LoginCredentials } from "../common/types";
import Initializer from "./services/initialization";

if (require("electron-squirrel-startup")) {
  app.quit();
}

const initializer = new Initializer();

app.whenReady().then(_ => {
  initializer.init();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit(); // OS X behavior
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    initializer.init(); // OS X behavior
  }
});

ipcMain.on(channels.REGISTER, (event, credentials: LoginCredentials) => {
  if (!initializer.isFirstTimeRunningApp()) {
    const err = "Can only register users it is the first time the app is running.";
    event.sender.send(err); // not implemented right
    throw Error(err);
  }
  console.log(credentials);
});

ipcMain.on(channels.LOGIN, (event, credentials: LoginCredentials) => {
  if (initializer.isFirstTimeRunningApp()) {
    const err = "Cannot login if it is the first time the app is running.";
    event.sender.send(err); // not implemented right
    throw Error(err);
  }
  console.log(credentials);
});
