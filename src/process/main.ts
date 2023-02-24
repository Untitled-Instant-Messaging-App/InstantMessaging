import { app, BrowserWindow, ipcMain } from "electron";
import { channels } from "../shared/constants";
import Initializer from "./initialization";

const initializer = new Initializer();

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.whenReady().then(initializer.handleStartup);

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

ipcMain.on(channels.REGISTER, (event, args) => {
  console.log(args);
  // const { password, username } = args;
  // console.log("Username " + username);
  // console.log("Password " + password);
  event.reply(channels.REGISTER, "credentials received");
});
