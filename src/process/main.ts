import { app, BrowserWindow, ipcMain } from "electron";
import { channels } from "../shared/constants";
import Initializer from "./initialization";
import path from "path";

// const initializer = new Initializer();

if (require("electron-squirrel-startup")) {
  app.quit();
}

// app.whenReady().then(initializer.handleStartup);

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

function createWindow(): void {
  const window = new BrowserWindow({
    height: 600,
    width: 800,
    backgroundColor: "black",
    webPreferences: {
      nodeIntegration: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  console.log(__dirname);
  console.log(__filename);

  window.removeMenu();
  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  window.webContents.openDevTools({ mode: "detach" });
}

app.whenReady().then(() => {
  createWindow();
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

ipcMain.on(channels.REGISTER, (event, args) => {
  console.log(args);
  // const { password, username } = args;
  // console.log("Username " + username);
  // console.log("Password " + password);
  event.reply(channels.REGISTER, "credentials received");
});
