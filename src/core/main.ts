import { app, BrowserWindow } from "electron";
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
