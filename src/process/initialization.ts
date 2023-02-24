import ElectronStore from "electron-store";
import StateManagement from "../process/stateManagement";
import path from "path";
import { BrowserWindow } from "electron";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

export function createWindow(): void {
  const window = new BrowserWindow({
    height: 600,
    width: 800,
    backgroundColor: "black",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.removeMenu();
  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  window.webContents.openDevTools({ mode: "detach" });
}

export default class Initializer {
  #stateManager: StateManagement;
  #store: ElectronStore;
  #firstTimeRunning: boolean;

  constructor() {
    this.#store = new ElectronStore();
    this.#firstTimeRunning = !!this.#store.get("lastLogin");
  }

  isFirstTimeRunning(): boolean {
    return this.#firstTimeRunning;
  }

  handleStartup(): void {
    if (true) {
      console.log("Configuring app as first time running...");
    } else {
      console.log("Configuring app as returning user...");
    }

    createWindow();
  }
}
