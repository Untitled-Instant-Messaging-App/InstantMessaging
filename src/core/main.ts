import { app, BrowserWindow, ipcMain } from "electron";
import { channels } from "../common/constants";
import Initializer from "./services/initialization";

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.whenReady().then(_ => {
  const initializer = new Initializer();
  initializer.handleStartup();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit(); // OS X behavior
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    // createWindow(); // OS X behavior
  }
});

ipcMain.on(channels.REGISTER, (_, args) => {
  const { password, username } = args;
  console.log(args);
});

ipcMain.on("test", (_, msg) => {
  console.log(msg);
});
