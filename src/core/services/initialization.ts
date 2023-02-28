import { BrowserWindow } from "electron";
import ElectronStore from "electron-store";
import { channels } from "../../common/constants";
import isDev from "electron-is-dev";
import { AuthState } from "../../common/types";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export default class Initializer {
  private store: ElectronStore;
  private firstTimeRunning: boolean;
  public window: BrowserWindow;

  constructor(store: ElectronStore) {
    this.store = store;
  }

  public init(): void {
    // this.store.delete("last-online");
    this.firstTimeRunning = !!!this.store.get("last-online");
    this.window = new BrowserWindow({
      height: 600,
      width: 800,
      backgroundColor: "black",
      webPreferences: {
        // nodeIntegration: true,
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });
    this.window.removeMenu();
    this.window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    if (isDev) {
      this.window.webContents.openDevTools({ mode: "detach" });
    }
    this.window.webContents.on("did-finish-load", () => {
      this.window.webContents.send(channels.AUTH_STATE, this.firstTimeRunning ? AuthState.NotRegistered : AuthState.NotSignedIn);
    });
  }

  public isFirstTimeRunningApp(): boolean {
    return this.firstTimeRunning;
  }

  public isRunningDev(): boolean {
    return isDev;
  }
}
