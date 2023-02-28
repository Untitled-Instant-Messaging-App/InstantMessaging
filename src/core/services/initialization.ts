import { BrowserWindow, ipcMain } from "electron";
import ElectronStore from "electron-store";
import { LoginCredentials } from "../../common/types";
import { channels } from "../../common/constants";
import StateManagement from "./stateManagement";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export default class Initializer {
  #stateManager: StateManagement;
  #store: ElectronStore;
  #firstTimeRunning: boolean;

  constructor() {
    this.#store = new ElectronStore();
    this.#firstTimeRunning = !!this.#store.get("lastLogin");
  }

  public handleStartup(): void {
    const window = new BrowserWindow({
      height: 600,
      width: 800,
      backgroundColor: "black",
      webPreferences: {
        nodeIntegration: true,
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });
    window.removeMenu();
    window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    window.webContents.openDevTools({ mode: "detach" });

    window.webContents.on("did-finish-load", () => window.webContents.send(channels.FRIST_TIME_RUNNING, this.#firstTimeRunning));

    if (this.#firstTimeRunning) {
      console.log("Configuring app as first time running...");
    } else {
      console.log("Configuring app as returning user...");
    }
  }
}

ipcMain.on(channels.REGISTER, (_, credentials: LoginCredentials) => {
  console.log(credentials);
});
